import { useState } from "react";
import {
  FaCheckCircle,
  FaRegClock,
  FaPlus,
  FaTrash,
  FaCheck,
  FaTimes,
  FaStar,
  FaExclamationTriangle,
  FaMedal,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

const TaskList = ({
  tasks,
  setTasks,
  user,
  gameState,
  setGameState,
  GAME_CONFIG,
  setShowMascot,
  setShowAddTask,
}) => {
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskFailureMascot, setShowTaskFailureMascot] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  // Load completed tasks from localStorage on mount
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`completedTasks_${user.id}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Calculate points for a task
  const calculateTaskPoints = (task) => {
    let points = task.points;

    // Add milestone points
    points +=
      (task.milestones?.filter((m) => m.completed)?.length || 0) *
      GAME_CONFIG.POINTS.MILESTONE;

    // Add streak bonus
    const streakBonus = Math.floor(
      points * (gameState.streak * GAME_CONFIG.POINTS.STREAK_MULTIPLIER)
    );
    points += streakBonus;

    return points;
  };

  // Check and award badges
  const checkAndAwardBadges = (updatedProgress) => {
    const newBadges = [];

    // Check Daily Badges
    Object.entries(GAME_CONFIG.BADGES.DAILY).forEach(([id, badge]) => {
      if (
        updatedProgress.badgeProgress[id] >= badge.requirement &&
        !updatedProgress.badges.includes(id)
      ) {
        newBadges.push(id);
      }
    });

    // Check Permanent Badges
    Object.entries(GAME_CONFIG.BADGES.PERMANENT).forEach(([id, badge]) => {
      if (
        updatedProgress.badgeProgress[id] >= badge.requirement &&
        !updatedProgress.badges.includes(id)
      ) {
        newBadges.push(id);
      }
    });

    if (newBadges.length > 0) {
      updatedProgress.badges = [...updatedProgress.badges, ...newBadges];

      // Save badges to localStorage
      localStorage.setItem(
        `userAchievements_${user.id}`,
        JSON.stringify(updatedProgress.badges)
      );

      // Celebrate new badges
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Show badge notification
      setShowMascot(true);
      setTimeout(() => setShowMascot(false), 3000);
    }

    return updatedProgress;
  };

  // Check and unlock rewards based on level
  const checkAndUnlockRewards = (updatedProgress) => {
    const newRewards = Object.values(GAME_CONFIG.REWARDS)
      .filter(
        (reward) =>
          updatedProgress.level >= reward.requiredLevel &&
          !updatedProgress.unlockedRewards?.includes(reward.id)
      )
      .map((reward) => reward.id);

    if (newRewards.length > 0) {
      updatedProgress.unlockedRewards = [
        ...(updatedProgress.unlockedRewards || []),
        ...newRewards,
      ];

      // Celebrate new rewards
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      });
    }

    return updatedProgress;
  };

  const handleTaskFailure = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    const resilientPoints = task.points * 0.1;
    setGameState((prev) => ({
      ...prev,
      totalFailedTasks: prev.totalFailedTasks + 1,
      todayPoints: prev.todayPoints + resilientPoints,
      weeklyPoints: prev.weeklyPoints + resilientPoints,
      totalPoints: prev.totalPoints + resilientPoints,
    }));

    setTasks(tasks.filter((t) => t.id !== taskId));
    localStorage.setItem(
      `userTasks_${user.id}`,
      JSON.stringify(tasks.filter((t) => t.id !== taskId))
    );

    localStorage.setItem(
      `userProgress_${user.id}`,
      JSON.stringify({
        ...gameState,
        totalFailedTasks: gameState.totalFailedTasks + 1,
        todayPoints: gameState.todayPoints + resilientPoints,
        weeklyPoints: gameState.weeklyPoints + resilientPoints,
        totalPoints: gameState.totalPoints + resilientPoints,
      })
    );

    const taskHistory = JSON.parse(
      localStorage.getItem(`taskHistory_${user.id}`) || "[]"
    );
    taskHistory.unshift({
      ...task,
      points: resilientPoints,
      completed_at: new Date().toISOString(),
      completed: false,
      achievements: [],
    });

    localStorage.setItem(`taskHistory_${user.id}`, JSON.stringify(taskHistory));
    setShowTaskFailureMascot(true);
  };

  // Handle task completion
  const handleTaskComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !completedTasks.includes(taskId)) {
      try {
        // Calculate task timing and conditions
        task.completed = true;
        task.completed_at = new Date().toISOString();
        const now = new Date();
        const isEarlyTask = now.getHours() < 10;
        const isNightTask = now.getHours() >= 20;
        const isEarlyTaskToday =
          isEarlyTask && new Date().toDateString() === gameState.lastLoginDate;
        console.log("isEarlyTaskToday", isEarlyTaskToday);
        const isWeekendTask = [0, 6].includes(now.getDay());
        const isHighPriorityTask = task.priority === "HIGH";
        const hasSharedMilestones = task.milestones?.some((m) => m.shared);

        const completedMilestones =
          task.milestones?.filter((m) => m.completed)?.length || 0;

        const allMilestonesCompleted =
          task.milestones.length > 0
            ? task.milestones?.every((m) => m.completed)
            : false;

        // Focus Master: Complete 3 tasks without any breaks longer than 15 minutes
        const isFocusedMaster = tasks
          .filter((t) => t.completed && t.completed_at)
          .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
          .slice(0, 3)
          .every((task, i, arr) => {
            if (i === 0) return true;
            const timeDiff =
              new Date(arr[i - 1].completed_at) - new Date(task.completed_at);
            return timeDiff <= 900000; // 15 minutes in milliseconds
          });

        // Last Minute Hero: Complete task within 5 minutes of deadline
        const dueTimeStr = task.dueTime;
        // Parse dueTime string to a Date object today
        const [time, modifier] = dueTimeStr.split(" "); // "2:40", "AM"
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        const dueDate = new Date();
        dueDate.setHours(hours, minutes, 0, 0);

        const isLastMinuteHero =
          task.dueTime &&
          dueDate > new Date() &&
          dueDate - new Date() <= 300000; // 5 minutes

        const isSpeedDemon =
          task.dueTime &&
          task.completed &&
          task.completed_at &&
          new Date(task.completed_at) < dueDate;

        // Task Sprinter: Complete 2 tasks within 30 minutes of each other
        // Get all completed tasks including the current one being completed
        const recentCompletedTasks = [...tasks, task]
          .filter((t) => t.completed && t.completed_at)
          .map((t) => ({ ...t, completedTime: new Date(t.completed_at) }))
          .sort((a, b) => b.completedTime - a.completedTime)
          .slice(0, 2);

        const isTaskSprinter =
          recentCompletedTasks.length === 2 &&
          Math.abs(
            recentCompletedTasks[0].completedTime -
              recentCompletedTasks[1].completedTime
          ) <= 1800000;

        const taskPoints = calculateTaskPoints(task);

        // Calculate XP and level
        let updatedProgress = {
          ...gameState,
          xp: gameState.xp + taskPoints,
          totalPoints: gameState.totalPoints + taskPoints,
          todayPoints: gameState.todayPoints + taskPoints,
          weeklyPoints: gameState.weeklyPoints + taskPoints,
          totalCompletedTasks: gameState.totalCompletedTasks + 1,
          // totalMilestones: gameState.totalMilestones + completedMilestones,
          earlyTasksToday: isEarlyTask
            ? gameState.earlyTasksToday + 1
            : gameState.earlyTasksToday,
          badgeProgress: { ...gameState.badgeProgress },
          badges: [],
          dailyAchievements: {},
        };

        // Level up if enough XP
        const requiredXP = GAME_CONFIG.getRequiredXP(updatedProgress.level);
        if (updatedProgress.xp >= requiredXP) {
          updatedProgress.level += 1;
          updatedProgress.xp -= requiredXP;
        }

        // Update badge progress
        updatedProgress.badgeProgress = {
          ...updatedProgress.badgeProgress,
          early_bird: isEarlyTask
            ? (updatedProgress.badgeProgress.early_bird || 0) + 1
            : updatedProgress.badgeProgress.early_bird || 0,
          night_owl: isNightTask
            ? (updatedProgress.badgeProgress.night_owl || 0) + 1
            : updatedProgress.badgeProgress.night_owl || 0,
          weekend_warrior: isWeekendTask
            ? (updatedProgress.badgeProgress.weekend_warrior || 0) + 1
            : updatedProgress.badgeProgress.weekend_warrior || 0,
          priority_master: isHighPriorityTask
            ? (updatedProgress.badgeProgress.priority_master || 0) + 1
            : updatedProgress.badgeProgress.priority_master || 0,
          team_player: hasSharedMilestones
            ? (updatedProgress.badgeProgress.team_player || 0) + 1
            : updatedProgress.badgeProgress.team_player || 0,
          streak_master: updatedProgress.streak,
          consistency_king: updatedProgress.streak,
          speed_demon: isSpeedDemon
            ? (updatedProgress.badgeProgress.speed_demon || 0) + 1
            : updatedProgress.badgeProgress.speed_demon || 0,
          milestone_hunter:
            completedMilestones > 0
              ? (updatedProgress.badgeProgress.milestone_hunter || 0) +
                completedMilestones
              : updatedProgress.badgeProgress.milestone_hunter || 0,
          perfectionist: allMilestonesCompleted
            ? (updatedProgress.badgeProgress.perfectionist || 0) + 1
            : updatedProgress.badgeProgress.perfectionist || 0,
          focus_master: isFocusedMaster
            ? (updatedProgress.badgeProgress.focus_master || 0) + 1
            : updatedProgress.badgeProgress.focus_master || 0,
          task_sprinter: isTaskSprinter
            ? (updatedProgress.badgeProgress.task_sprinter || 0) + 1
            : updatedProgress.badgeProgress.task_sprinter || 0,
          last_minute_hero: isLastMinuteHero
            ? (updatedProgress.badgeProgress.last_minute_hero || 0) + 1
            : updatedProgress.badgeProgress.last_minute_hero || 0,
        };

        // Save daily achievements progress and last update date to localStorage
        updatedProgress.dailyAchievements = {
          dailyBadges: [
            // Add daily badges when requirements are met
            ...(isEarlyTask &&
            gameState.badgeProgress.early_bird + 1 >=
              GAME_CONFIG.BADGES.DAILY.EARLY_BIRD.requirement
              ? ["early_bird"]
              : []),
            ...(new Date() < new Date(task.dueTime) &&
            gameState.badgeProgress.speed_demon + 1 >=
              GAME_CONFIG.BADGES.DAILY.SPEED_DEMON.requirement
              ? ["speed_demon"]
              : []),
            ...(isNightTask &&
            gameState.badgeProgress.night_owl + 1 >=
              GAME_CONFIG.BADGES.DAILY.NIGHT_OWL.requirement
              ? ["night_owl"]
              : []),
            ...(isWeekendTask &&
            gameState.badgeProgress.weekend_warrior + 1 >=
              GAME_CONFIG.BADGES.DAILY.WEEKEND_WARRIOR.requirement
              ? ["weekend_warrior"]
              : []),
            ...(isFocusedMaster &&
            gameState.badgeProgress.focus_master + 1 >=
              GAME_CONFIG.BADGES.DAILY.FOCUS_MASTER.requirement
              ? ["focus_master"]
              : []),
            ...(isTaskSprinter &&
            gameState.badgeProgress.task_sprinter + 1 >=
              GAME_CONFIG.BADGES.DAILY.TASK_SPRINTER.requirement
              ? ["task_sprinter"]
              : []),
            ...(isLastMinuteHero &&
            gameState.badgeProgress.last_minute_hero + 1 >=
              GAME_CONFIG.BADGES.DAILY.LAST_MINUTE_HERO.requirement
              ? ["last_minute_hero"]
              : []),
          ].filter((badge, index, self) => self.indexOf(badge) === index),
        };

        // Permanent badges only
        updatedProgress.badges = [
          // Add permanent badges when requirements are met
          ...(gameState.streak >=
          GAME_CONFIG.BADGES.PERMANENT.STREAK_MASTER.requirement
            ? ["streak_master"]
            : []),
          ...(gameState.badgeProgress.milestone_hunter +
            (task.milestones?.filter((m) => m.completed).length || 0) >=
          GAME_CONFIG.BADGES.PERMANENT.MILESTONE_HUNTER.requirement
            ? ["milestone_hunter"]
            : []),
          ...(task.milestones?.every((m) => m.completed) &&
          gameState.badgeProgress.perfectionist + 1 >=
            GAME_CONFIG.BADGES.PERMANENT.PERFECTIONIST.requirement
            ? ["perfectionist"]
            : []),
          ...(isHighPriorityTask &&
          gameState.badgeProgress.priority_master + 1 >=
            GAME_CONFIG.BADGES.PERMANENT.PRIORITY_MASTER.requirement
            ? ["priority_master"]
            : []),
          ...(hasSharedMilestones &&
          gameState.badgeProgress.team_player + 1 >=
            GAME_CONFIG.BADGES.PERMANENT.TEAM_PLAYER.requirement
            ? ["team_player"]
            : []),
          ...(gameState.streak > 0 &&
          gameState.badgeProgress.consistency_king + 1 >=
            GAME_CONFIG.BADGES.PERMANENT.CONSISTENCY_KING.requirement
            ? ["consistency_king"]
            : []),
        ].filter((badge, index, self) => self.indexOf(badge) === index);

        // Check and award badges
        updatedProgress = checkAndAwardBadges(updatedProgress);

        // Check and unlock rewards
        updatedProgress = checkAndUnlockRewards(updatedProgress);

        // Update state and localStorage
        setGameState(updatedProgress);
        localStorage.setItem(
          `userProgress_${user.id}`,
          JSON.stringify(updatedProgress)
        );

        // Update completed tasks
        const newCompletedTasks = [...completedTasks, task];
        setCompletedTasks(newCompletedTasks);
        localStorage.setItem(
          `completedTasks_${user.id}`,
          JSON.stringify(newCompletedTasks)
        );

        // Save task history
        const taskHistory = JSON.parse(
          localStorage.getItem(`taskHistory_${user.id}`) || "[]"
        );
        taskHistory.unshift({
          ...task,
          completed_at: new Date().toISOString(),
          completed: true,
          points: taskPoints,
          achievements: updatedProgress.badges.filter(
            (badge) => !gameState.badges.includes(badge)
          ),
        });
        localStorage.setItem(
          `taskHistory_${user.id}`,
          JSON.stringify(taskHistory)
        );

        // Update task completion status
        setTasks(
          tasks.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
        );

        // Remove completed task
        const updatedTasks = tasks.filter((t) => t.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem(
          `userTasks_${user.id}`,
          JSON.stringify(updatedTasks)
        );

        // Show completion celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setShowMascot(true);
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem(
        `userTasks_${user.id}`,
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddMilestone = async (taskId) => {
    if (newMilestone.trim()) {
      try {
        const milestone = {
          id: Date.now().toString(),
          task_id: taskId,
          title: newMilestone,
          completed: false,
          created_at: new Date().toISOString(),
        };

        const updatedTasks = tasks.map((task) =>
          task.id === taskId
            ? { ...task, milestones: [...(task.milestones || []), milestone] }
            : task
        );

        setTasks(updatedTasks);
        localStorage.setItem(
          `userTasks_${user.id}`,
          JSON.stringify(updatedTasks)
        );

        setNewMilestone("");
        setShowAddMilestone(false);
        setEditingTask(null);
      } catch (error) {
        console.error("Error creating milestone:", error);
      }
    }
  };

  const handleMilestoneComplete = async (taskId, milestoneId) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          const updatedMilestones = task.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          );
          return { ...task, milestones: updatedMilestones };
        }
        return task;
      });

      setTasks(updatedTasks);
      localStorage.setItem(
        `userTasks_${user.id}`,
        JSON.stringify(updatedTasks)
      );

      const task = updatedTasks.find((t) => t.id === taskId);
      if (task && task.milestones.every((m) => m.completed)) {
        const milestonePoints =
          (task.milestones.length + 1) * GAME_CONFIG.POINTS.MILESTONE;
        const updatedProgress = {
          ...gameState,
          xp: gameState.xp + milestonePoints,
          totalMilestones: gameState.totalMilestones + task.milestones.length,
        };

        setGameState(updatedProgress);
        localStorage.setItem(
          `userProgress_${user.id}`,
          JSON.stringify(updatedProgress)
        );
      }
    } catch (error) {
      console.error("Error updating milestone:", error);
    }
  };

  const isTaskOverdue = (task) => {
    const dueTimeStr = task.dueTime;
    const now = new Date();
    const [time, modifier] = dueTimeStr.split(" "); // "2:40", "AM"
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    // Create date from task.dueDate
    const dueDate = new Date(task.dueDate);

    // Set the hours and minutes from dueTime
    dueDate.setHours(hours, minutes, 0, 0);

    // Compare dueDate with now
    return now > dueDate;
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#14213d] to-[#1a2b4d] rounded-xl p-4 text-center border border-[#fca311]/20 shadow-xl"
        >
          <div className="flex flex-col items-center gap-8">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowAddTask(true)}
              type="button"
            >
              <div className="absolute -top-3 -right-3 animate-ping">
                <div className="w-3 h-3 bg-[#fca311] rounded-full opacity-75"></div>
              </div>
              <div className="w-16 h-16 bg-[#fca311]/10 rounded-full flex items-center justify-center">
                <FaPlus className="text-[#fca311] text-3xl animate-pulse" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl md:text-xl font-bold bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent">
                Start Your Productivity Journey!
              </h3>
              <p className="text-white/60 max-w-md mx-auto">
                Create your tasks and begin earning points, unlocking
                achievements, and reaching new milestones on your path to
                success.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs tracking-tighter md:text-sm text-white/40">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Track Progress</span>
              </div>
              <div className="w-1 h-6 md:h-1 bg-white/20 rounded-full"></div>
              <div className="flex items-center gap-2">
                <FaRegClock className="text-red-600" />
                <span>Set Deadlines</span>
              </div>
              <div className="w-1 h-6 md:h-1 bg-white/20 rounded-full"></div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span>Earn Rewards</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        tasks.map((task) => (
          <motion.div
            key={task.id}
            className={`bg-black/20 rounded-lg ${
              completedTasks.includes(task.id) ? "opacity-60" : ""
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col pb-4 p-4">
              <div className="flex items-start gap-4 w-full">
                <button
                  onClick={() => {
                    if (isTaskOverdue(task)) {
                      handleTaskFailure(task.id);
                    } else {
                      handleTaskComplete(task.id);
                    }
                  }}
                  className={`mt-1 text-2xl transition-all duration-300 transform hover:scale-110 ${
                    completedTasks.includes(task.id)
                      ? "text-green-500 hover:text-green-400"
                      : "text-white/20 hover:text-[#fca311]"
                  }`}
                >
                  <FaCheckCircle className="filter drop-shadow-lg" />
                </button>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row items-start justify-between">
                    <h2 className="font-medium text-lg pr-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {task.title}
                    </h2>
                  </div>

                  {task.milestones.length > 0 && (
                    <div className="mt-3 border-l-2 border-[#fca311]/20 space-y-2">
                      {task.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="flex items-start gap-2 text-sm text-white/60 w-full group hover:bg-black/10 rounded-lg p-2 transition-all duration-300"
                        >
                          <button
                            onClick={() => {
                              if (isTaskOverdue(task)) {
                                handleTaskFailure(task.id);
                              } else {
                                handleMilestoneComplete(task.id, milestone.id);
                              }
                            }}
                            className={`transition-all duration-300 text-lg transform group-hover:scale-105 ${
                              milestone.completed
                                ? "text-green-500 hover:text-green-400"
                                : "text-white/20 hover:text-[#fca311]"
                            }`}
                          >
                            <FaCheckCircle className="filter drop-shadow-md" />
                          </button>
                          <span
                            className={`text-sm items-start transition-all duration-300 ${
                              milestone.completed
                                ? "line-through text-white/40"
                                : "group-hover:text-white"
                            }`}
                          >
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="group relative flex items-center">
                    <button
                      onClick={() => {
                        setEditingTask(task.id);
                        setShowAddMilestone(true);
                      }}
                      className="text-white/40 hover:text-[#fca311] transition-all duration-300 transform hover:scale-110"
                    >
                      <FaPlus className="filter drop-shadow-lg" />
                    </button>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#14213d] text-[#fca311] text-xs rounded-lg shadow-lg border border-[#fca311]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <div className="relative">
                        Add Milestone
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#14213d] border-r border-b border-[#fca311]/20 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowDeleteConfirmation(true);
                      setTaskToDelete(task.id);
                    }}
                    className="text-white/40 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                  >
                    <FaTrash className="filter drop-shadow-lg" />
                  </button>
                </div>
              </div>

              {editingTask === task.id && showAddMilestone && (
                <div className="mt-3 pl-8 flex items-center gap-2">
                  <input
                    type="text"
                    value={newMilestone}
                    onChange={(e) => setNewMilestone(e.target.value)}
                    placeholder="Enter milestone..."
                    required
                    ref={(input) => input && input.focus()}
                    className="w-full bg-black/30 text-white border border-[#fca311]/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fca311]/40 focus:border-transparent transition-all duration-300 placeholder-white/30"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddMilestone(task.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddMilestone(task.id)}
                    className="text-[#fca311] hover:text-[#ffd700] transition-all duration-300 transform hover:scale-110"
                  >
                    <FaCheck className="filter drop-shadow-lg" />
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMilestone(false);
                      setEditingTask(null);
                      setNewMilestone("");
                    }}
                    className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <FaTimes className="filter drop-shadow-lg" />
                  </button>
                </div>
              )}
            </div>
            <div className="relative text-xs border-t-2 border-white/10">
              <div className="flex gap-6 items-center justify-between text-xs">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isTaskOverdue(task)
                      ? "border-red-500/40 "
                      : "border-white/20 "
                  }`}
                >
                  <FaRegClock
                    className={` text-base ${
                      isTaskOverdue(task) ? "text-red-400" : "text-white/70"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      isTaskOverdue(task)
                        ? "text-red-400"
                        : "text-white/70 group-hover:text-white/90"
                    }`}
                  >
                    {task.dueTime} |{" "}
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-5 py-2 rounded-full">
                  <span className="font-bold bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent  transition-transform">
                    +{task.points}
                  </span>
                  <span className="text-[#fca311]/70 text-sm font-medium">
                    pts
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
      {/* Task Mascot failure */}
      <AnimatePresence>
        {showTaskFailureMascot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 left-5 -translate-x-1/2 bg-gradient-to-r from-[#132242] to-[#062c77] p-6 rounded-2xl border border-red-500/50 shadow-lg shadow-red-500/10 max-w-md backdrop-blur-sm z-50"
          >
            <button
              onClick={() => setShowTaskFailureMascot(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
            >
              <FaTimes className="text-white text-sm group-hover:rotate-90 transition-transform duration-200" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <FaExclamationTriangle className="text-red-500 text-2xl animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              </div>
              <span className="text-red-500 font-bold text-lg">
                Task Failed
              </span>
            </div>

            <p className="text-white/70 text-sm ml-8 leading-relaxed">
              This task was not completed before the due time. Don't worry -
              you'll receive:
            </p>

            <div className="ml-8 mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full">
                <FaStar className="animate-spin-slow" />
                <span>Resilience Points</span>
              </div>
            </div>

            <div className="mt-4 ml-8 text-xs text-white/40">
              Keep pushing forward! Every setback is a setup for a comeback.
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <p className="text-white/50 text-xs md:text-sm ">
                You can find all your tasks in the{" "}
                <Link
                  to="/history"
                  className="text-[#fca311] font-medium hover:text-[#fca311]/80 transition-colors"
                >
                  Task History
                </Link>
              </p>
            </div>

            <div className="absolute bottom-0 right-2 w-full h-1 overflow-hidden rounded-b-3xl">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-400"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: 0,
                }}
                onAnimationComplete={() => setShowTaskFailureMascot(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Delete Task Confirmation */}
      <AnimatePresence>
        {showDeleteConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              className="bg-[#14213d] rounded-3xl p-6 max-w-md w-full mx-4 relative"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaTrash className="text-red-500 text-xl" />
                <span className="text-red-500 font-bold text-lg">
                  Delete Task?
                </span>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Are you sure you want to delete this task? This action cannot be
                undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteTask(taskToDelete);
                    setShowDeleteConfirmation(false);
                  }}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
