import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaMedal,
  FaCalendarCheck,
  FaUsers,
  FaCrown,
  FaRegLightbulb,
  FaMoon,
  FaFire,
  FaGem,
  FaBolt,
  FaFlag,
  FaPlus,
  FaChevronRight,
  FaGift,
  FaRegClock,
  FaRegCalendarAlt,
  FaTrash,
  FaTimes,
  FaCheck,
  FaUpload,
  FaSpinner,
  FaBrain,
  FaRunning,
  FaClock,
  FaTrophy,
  FaChartBar,
  FaChevronDown,
} from "react-icons/fa";

import {
  LevelProgress,
  StreakDisplay,
  AchievementPopup,
  TaskStatsDisplay,
} from "./GameElements";

import Header from "./dashboard/Header";
import TaskList from "./dashboard/TaskList";
import PointsSummary from "./dashboard/PointsSummary";
import BadgeList from "./dashboard/BadgeList";
import RewardList from "./dashboard/RewardList";
import DashboardSkeleton from "./dashboard/DashboardSkeleton";

// Preset avatar URLs using DiceBear API
const PRESET_AVATARS = [
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix",
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Aneka",
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Sassy",
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jasper",
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Luna",
  "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Nova",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Sassy",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Jasper",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Nova",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Zephyr",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Atlas",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Phoenix",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Sassy",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Jasper",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Luna",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Nova",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Zephyr",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Atlas",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Phoenix",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Felix",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Aneka",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Sassy",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Jasper",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Luna",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Nova",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Zephyr",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Atlas",
  "https://api.dicebear.com/9.x/bottts/svg?seed=Phoenix",
];

const GAME_CONFIG = {
  // XP required for each level (scales dynamically)
  getRequiredXP: (level) => 1000 + (level - 1) * 500,

  // Points system for tasks and milestones
  POINTS: {
    LOW: 50,
    MEDIUM: 100,
    HIGH: 150,
    MILESTONE: 30, // Additional milestone points
    STREAK_MULTIPLIER: 0.1, // 10% bonus per day in streak
  },

  // Organizing badges into two separate objects for clarity
  BADGES: {
    DAILY: {
      EARLY_BIRD: {
        id: "early_bird",
        title: "Early Bird",
        description: "Complete 3 tasks before 10 AM",
        icon: <FaStar className="text-yellow-400" />,
        requirement: 3,
      },
      NIGHT_OWL: {
        id: "night_owl",
        title: "Night Owl",
        description: "Complete 5 tasks after 8 PM",
        icon: <FaMoon className="text-indigo-400" />,
        requirement: 5,
      },
      SPEED_DEMON: {
        id: "speed_demon",
        title: "Speed Demon",
        description: "Complete 5 tasks before their due time",
        icon: <FaBolt className="text-yellow-500" />,
        requirement: 5,
      },
      WEEKEND_WARRIOR: {
        id: "weekend_warrior",
        title: "Weekend Warrior",
        description: "Complete 10 tasks on weekends",
        icon: <FaCalendarCheck className="text-green-400" />,
        requirement: 10,
      },
      FOCUS_MASTER: {
        id: "focus_master",
        title: "Focus Master",
        description:
          "Complete 3 tasks without any breaks longer than 15 minutes",
        icon: <FaBrain className="text-blue-400" />,
        requirement: 3,
      },
      TASK_SPRINTER: {
        id: "task_sprinter",
        title: "Task Sprinter",
        description: "Complete 2 tasks within 30 minutes of each other",
        icon: <FaRunning className="text-green-500" />,
        requirement: 2,
      },
      LAST_MINUTE_HERO: {
        id: "last_minute_hero",
        title: "Last-Minute Hero",
        description: "Complete 1 task within 5 minutes of its deadline",
        icon: <FaClock className="text-red-400" />,
        requirement: 1,
      },
    },

    PERMANENT: {
      STREAK_MASTER: {
        id: "streak_master",
        title: "Streak Master",
        description: "Maintain a 7-day streak",
        icon: <FaFire className="text-red-500" />,
        requirement: 7,
      },
      MILESTONE_HUNTER: {
        id: "milestone_hunter",
        title: "Milestone Hunter",
        description: "Complete 50 milestones",
        icon: <FaGem className="text-purple-400" />,
        requirement: 50,
      },
      PERFECTIONIST: {
        id: "perfectionist",
        title: "Perfectionist",
        description: "Complete all milestones in 10 tasks",
        icon: <FaMedal className="text-[#fca311]" />,
        requirement: 10,
      },
      PRIORITY_MASTER: {
        id: "priority_master",
        title: "Priority Master",
        description: "Complete 20 high-priority tasks",
        icon: <FaFlag className="text-red-400" />,
        requirement: 20,
      },
      TEAM_PLAYER: {
        id: "team_player",
        title: "Team Player",
        description: "Complete 15 tasks with shared milestones",
        icon: <FaUsers className="text-blue-400" />,
        requirement: 15,
      },
      CONSISTENCY_KING: {
        id: "consistency_king",
        title: "Consistency King",
        description: "Complete tasks for 30 consecutive days",
        icon: <FaCrown className="text-yellow-400" />,
        requirement: 30,
      },
    },
  },

  // Rewards and their unlock conditions
  REWARDS: {
    THEME_UNLOCK: {
      id: "theme_unlock",
      title: "Custom Theme",
      description: "Unlock custom theme colors",
      icon: <FaGem className="text-purple-400" />,
      requiredLevel: 5,
    },
    ADVANCED_ANALYTICS: {
      id: "advanced_analytics",
      title: "Advanced Analytics",
      description: "Unlock detailed progress tracking",
      icon: <FaRegLightbulb className="text-blue-400" />,
      requiredLevel: 10,
    },
    PREMIUM_BADGES: {
      id: "premium_badges",
      title: "Premium Badges",
      description: "Unlock exclusive badges",
      icon: <FaCrown className="text-yellow-400" />,
      requiredLevel: 15,
    },
  },
};

const Dashboard = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showMascot, setShowMascot] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [statsExpanded, setStatsExpanded] = useState(false);

  const { user } = useUser();

  const [gameState, setGameState] = useState({
    // User progression
    level: 1,
    xp: 0,
    totalTasks: 0,
    totalCompletedTasks: 0,
    totalFailedTasks: 0,
    totalMilestones: 0,
    streak: 0,
    longestStreak: 0,

    // Task tracking
    earlyTasks: 0,
    perfectTasks: 0,
    earlyTasksToday: 0,
    lastLoginDate: new Date().toDateString(), // ✅ Tracks when daily achievements were last reset

    // Points tracking
    todayPoints: 0,
    weeklyPoints: 0,
    totalPoints: 0,

    // Badge tracking
    badges: [], // ✅ Permanent badges that don't reset
    dailyAchievements: {
      dailyBadges: [],
    }, // ✅ Daily badges earned today
    dailyAchievementHistory: {}, // ✅ Stores past daily badge records

    // Badge progress tracking
    badgeProgress: {
      early_bird: 0,
      night_owl: 0,
      speed_demon: 0,
      weekend_warrior: 0,
      focus_master: 0,
      task_sprinter: 0,
      last_minute_hero: 0,
      streak_master: 0,
      milestone_hunter: 0,
      perfectionist: 0,
      priority_master: 0,
      team_player: 0,
      consistency_king: 0,
    },

    // Rewards tracking
    unlockedRewards: [], // ✅ Track unlocked rewards

    // Daily tracking mechanism

    lastWeeklyResetDate: new Date().toDateString(), // ✅ Tracks when weekly achievements were last reset
  });

  console.log("gameState initial", gameState);

  // Convert file to data URL
  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload for profile picture
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setUpdateError("File size should be less than 5MB");
        return;
      }

      try {
        const dataUrl = await fileToDataURL(file);

        setUploadedImage(dataUrl);
        setSelectedAvatar(null);
        setUpdateError(null);
      } catch (error) {
        setUpdateError("Failed to process image");
      }
    }
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setUploadedImage(null);
    setUpdateError(null);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!user || (!selectedAvatar && !uploadedImage)) return;
    setIsUpdatingProfile(true);
    setUpdateError(null);

    try {
      let file;

      if (uploadedImage) {
        // Convert uploaded data URL to file
        const response = await fetch(uploadedImage);
        const blob = await response.blob();
        file = new File([blob], "profile.jpg", { type: "image/jpeg" });
      } else if (selectedAvatar) {
        // Convert selected avatar URL to file
        const response = await fetch(selectedAvatar);
        const blob = await response.blob();
        file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
      }

      if (file) {
        // Set profile image using Clerk API
        await user.setProfileImage({ file });
      }

      await user.reload(); // Refresh Clerk session with new image

      // Reset states and close modal
      setShowProfileModal(false);
      setSelectedAvatar(null);
      setUploadedImage(null);

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setUpdateError("Failed to update profile. Please try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handle task creation
  const handleAddTask = (newTask) => {
    const task = {
      id: Date.now().toString(),
      ...newTask,
      created_at: new Date().toDateString(),
      completed: false,
      milestones: [],
    };

    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
    setGameState((prev) => ({
      ...prev,
      totalTasks: prev.totalTasks + 1,
    }));

    localStorage.setItem(
      `userProgress_${user.id}`,
      JSON.stringify({
        ...gameState,
        totalTasks: gameState.totalTasks + 1,
      })
    );

    localStorage.setItem(`userTasks_${user.id}`, JSON.stringify(updatedTasks));
    setShowAddTask(false);
  };

  const changeTimeto12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const amPm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${amPm}`;
  };

  const checkResets = () => {
    console.log("Checking resets");
    const today = new Date().toDateString();
    const lastLoginDate = gameState.lastLoginDate;

    // Only proceed if it's a new day
    if (lastLoginDate !== today) {
      console.log("Performing Daily Reset");
      setGameState((prevState) => {
        // Create a new state object with only the necessary resets
        const updatedState = {
          ...prevState,
          // Reset daily points
          todayPoints: 0,
          // Reset early tasks counter
          earlyTasksToday: 0,
          // Archive yesterday's achievements
          dailyAchievementHistory: {
            ...prevState.dailyAchievementHistory,
            [lastLoginDate]: prevState.dailyAchievements,
          },
          // Reset daily achievements
          dailyAchievements: {
            dailyBadges: [],
          },
          // Reset only daily badge progress
          badgeProgress: {
            ...prevState.badgeProgress,
            early_bird: 0,
            night_owl: 0,
            speed_demon: 0,
            weekend_warrior: 0,
            focus_master: 0,
            task_sprinter: 0,
            last_minute_hero: 0,
          },
          // Update last login date
          lastLoginDate: today,
        };

        // Update localStorage
        localStorage.setItem(
          `userProgress_${user.id}`,
          JSON.stringify(updatedState)
        );

        console.log("Updated State after Daily Reset:", updatedState);

        return updatedState;
      });
    }
  };

  const checkStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastLoginDate = gameState.lastLoginDate;
    console.log("lastLoginDate", lastLoginDate);
    console.log("yesterday", yesterday);
    console.log("today", today);

    // ✅ If the user logged in yesterday, increment the streak
    if (lastLoginDate === yesterday) {
      console.log("🔥 Consecutive login - incrementing streak");
      setGameState((prev) => {
        const newStreak = prev.streak + 1;
        const newLongestStreak = Math.max(newStreak, prev.longestStreak);
        return {
          ...prev,
          streak: newStreak,
          longestStreak: newLongestStreak,
        };
      });
    }
    // ❌ If last login wasn't yesterday or today, reset streak
    else if (lastLoginDate !== today) {
      console.log("💔 Missed login - resetting streak");
      setGameState((prev) => {
        return {
          ...prev,
          streak: 0,
        };
      });
    } else {
      console.log("✅ Already logged in today - no change to streak");
    }
  };

  //   const simulateYesterdayLogin = () => {
  //     setGameState((prev) => {
  //       const fakeYesterday = new Date(Date.now() - 86400000).toDateString();
  //       const newState = {
  //         ...prev,
  //         lastLoginDate: fakeYesterday,
  //       };
  //       console.log("newState", newState);
  //       localStorage.setItem(
  //         `userProgress_${user.id}`,
  //         JSON.stringify(newState)
  //       );
  //       return newState;
  //     });
  //   };

  //   simulateYesterdayLogin(); // Run this once when component mounts
  // }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        console.log("Loading data");

        // Load user progress
        const storedProgress = localStorage.getItem(`userProgress_${user.id}`);
        if (storedProgress) {
          setGameState(JSON.parse(storedProgress));
        }

        // Load tasks
        const storedTasks = localStorage.getItem(`userTasks_${user.id}`);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }

        // Load profile
        const storedProfile = localStorage.getItem(`userProfile_${user.id}`);
        if (storedProfile) {
          const { imageUrl } = JSON.parse(storedProfile);
          if (imageUrl) {
            await user.update({ imageUrl });
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Check for daily and weekly resets
  useEffect(() => {
    checkStreak();
    checkResets();
    const interval = setInterval(checkResets, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [gameState.lastLoginDate, gameState.lastWeeklyResetDate]);

  return isLoading ? (
    <DashboardSkeleton />
  ) : (
    <div className="relative min-h-screen bg-[#000000] text-white pt-20 pb-8 px-4 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14213d] to-[#000000] opacity-80">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, #fca31122 1px, transparent 1px),
            linear-gradient(to bottom, #fca31122 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
            animation: "grid 15s linear infinite",
          }}
        />

        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#fca311] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <style jsx="true">{`
        @keyframes grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
      `}</style>

      {/* Your existing content */}
      <div className="relative z-10">
        <Header
          gameState={gameState}
          user={user}
          GAME_CONFIG={GAME_CONFIG}
          setShowProfileModal={setShowProfileModal}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-8 space-y-8">
            {/* Level and Streak Section */}
            <div className="space-y-4">
              <div className="bg-[#14213d] rounded-xl p-4 shadow-lg border border-[#fca311]/20">
                <button
                  onClick={() => setStatsExpanded(!statsExpanded)}
                  className="w-full flex items-center justify-between text-xl font-bold text-white/90 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <FaChartBar className="text-[#fca311] text-xl" />
                      <div className="absolute -top-1 -right-1 w-1 h-1 bg-[#fca311] rounded-full animate-ping" />
                    </div>
                    <span className="bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent text-md">
                      {user.firstName}&apos;s Statistics
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: statsExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-[#fca311] group-hover:scale-110 transition-transform text-md" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {statsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-4 px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#1a2b4d] rounded-xl p-4 shadow-lg border border-[#fca311]/20 hover:border-[#fca311]/40 transition-colors">
                            <LevelProgress
                              level={gameState.level}
                              xp={gameState.xp}
                              requiredXP={GAME_CONFIG.getRequiredXP(
                                gameState.level
                              )}
                            />
                          </div>
                          <div className="bg-[#1a2b4d] rounded-xl p-4 shadow-lg border border-[#fca311]/20 hover:border-[#fca311]/40 transition-colors">
                            <StreakDisplay
                              streak={gameState.streak || 0}
                              longestStreak={gameState.longestStreak || 0}
                            />
                          </div>
                        </div>
                        <div className="bg-[#1a2b4d] rounded-xl p-6 shadow-lg border border-[#fca311]/20 hover:border-[#fca311]/40 transition-colors">
                          <TaskStatsDisplay
                            pendingTasks={tasks.length || 0}
                            totalTasks={gameState.totalTasks || 0}
                            completedTasks={gameState.totalCompletedTasks || 0}
                            failedTasks={gameState.totalFailedTasks || 0}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {/* Today's Tasks */}
            <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FaRegCalendarAlt className="text-[#fca311]" />
                  My Tasks
                </h3>
                <button
                  onClick={() => setShowAddTask(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaPlus />
                  <span>Add Task</span>
                </button>
              </div>

              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                user={user}
                gameState={gameState}
                setGameState={setGameState}
                GAME_CONFIG={GAME_CONFIG}
                setShowMascot={setShowMascot}
                setShowAddTask={setShowAddTask}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-4 space-y-8">
            {/* Points Summary */}
            <PointsSummary
              gameState={gameState}
              GAME_CONFIG={GAME_CONFIG}
              user={user}
            />

            {/* Badges Section */}
            <BadgeList
              gameState={gameState}
              GAME_CONFIG={GAME_CONFIG}
              user={user}
            />

            {/* Rewards Section */}
            <RewardList
              gameState={gameState}
              setGameState={setGameState}
              GAME_CONFIG={GAME_CONFIG}
              user={user}
              setShowMascot={setShowMascot}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      {/* <div className="max-w-7xl mx-auto mt-8 z-10">
        <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <FaGift className="text-[#fca311] text-2xl" />
              <div>
                <h3 className="text-lg font-bold">Ready to Claim Rewards?</h3>
                <p className="text-white/60">
                  You have {gameState.unlockedRewards?.length || 0} rewards
                  available to claim!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  // Only allow claiming if there are rewards
                  if (!gameState.unlockedRewards?.length) return;

                  // Trigger confetti
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                  });

                  // Mark rewards as claimed
                  const updatedGameState = {
                    ...gameState,
                    claimedRewards: [
                      ...(gameState.claimedRewards || []),
                      ...gameState.unlockedRewards,
                    ],
                    unlockedRewards: [],
                  };

                  // Update state and localStorage
                  setGameState(updatedGameState);
                  localStorage.setItem(
                    `userProgress_${user.id}`,
                    JSON.stringify(updatedGameState)
                  );

                  // Show success mascot
                  setShowMascot(true);
                }}
                disabled={!gameState.unlockedRewards?.length}
                className={`btn-primary flex items-center gap-2 group ${
                  !gameState.unlockedRewards?.length
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <span>Claim Rewards</span>
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowRewardsModal(true)}
                className="text-white/60 hover:text-white transition-colors"
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Rewards Modal */}
      {/* <AnimatePresence>
        {showRewardsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Available Rewards</h3>
                <button
                  onClick={() => setShowRewardsModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                {gameState.unlockedRewards?.map((reward, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img
                      src={reward.imageUrl}
                      alt={reward.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium">{reward.name}</h4>
                      <p className="text-xs text-white/60">
                        {reward.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Profile Image Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20 w-full max-w-md overflow-y-scroll"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Change Profile Picture</h3>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setSelectedAvatar(null);
                    setUploadedImage(null);
                    setUpdateError(null);
                  }}
                  className="text-white/60 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-2">
                {/* Preview */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-[#fca311] overflow-hidden">
                    <img
                      src={uploadedImage || selectedAvatar || user?.imageUrl}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {updateError && (
                  <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
                    {updateError}
                  </div>
                )}

                {/* Upload from Device */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Upload from Device
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-dashed border-[#fca311]/40 rounded-lg cursor-pointer hover:bg-[#fca311]/10 transition-colors">
                    <FaUpload className="text-[#fca311]" />
                    <span className="text-sm text-white/60">
                      {uploadedImage ? "Image selected" : "Choose a file..."}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                {/* Preset Avatars */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Choose an Avatar
                  </label>
                  <div className="grid grid-cols-6 gap-2 overflow-y-scroll max-h-32 p-2">
                    {PRESET_AVATARS.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => handleAvatarSelect(avatar)}
                        disabled={isUpdatingProfile}
                        className={`relative rounded-full overflow-hidden border-2 transition-all ${
                          selectedAvatar === avatar
                            ? "border-[#fca311] scale-110"
                            : "border-transparent hover:border-[#fca311]/50"
                        } ${
                          isUpdatingProfile
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      setSelectedAvatar(null);
                      setUploadedImage(null);
                      setUpdateError(null);
                    }}
                    className="px-4 py-2 text-white/60 hover:text-white"
                    disabled={isUpdatingProfile}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={
                      (!selectedAvatar && !uploadedImage) || isUpdatingProfile
                    }
                    className={`btn-primary flex items-center gap-2 ${
                      isUpdatingProfile ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUpdatingProfile ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <AchievementPopup
            achievement={showAchievement}
            onClose={() => setShowAchievement(null)}
          />
        )}
      </AnimatePresence>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Add New Task</h3>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="text-white/60 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const title = e.target.elements.title.value;
                  const priority = e.target.elements.priority.value;
                  const points = parseInt(e.target.elements.points.value);
                  const dueDate = e.target.elements.dueDate.value;
                  let dueTime = e.target.elements.dueTime.value;
                  dueTime = changeTimeto12HourFormat(dueTime);

                  handleAddTask({
                    title,
                    priority,
                    points,
                    dueDate,
                    dueTime,
                  });
                }}
                className="space-y-2"
              >
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    autoFocus
                    ref={(input) => input && input.focus()}
                    className="w-full bg-black/50 border border-[#fca311]/20 rounded-lg px-4 py-2 text-white focus:border-[#fca311] focus:outline-none"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Priority & Points
                  </label>
                  <div className="flex gap-4 mb-2">
                    <input
                      type="hidden"
                      name="priority"
                      id="priority-input"
                      defaultValue="MEDIUM"
                    />
                    <input
                      type="hidden"
                      name="points"
                      id="points-input"
                      defaultValue="100"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("priority-input").value = "LOW";
                        document.getElementById("points-input").value = "50";
                        document.getElementById("points-display").value = "50";
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("priority-input").value =
                            "LOW";
                          document.getElementById("points-input").value = "50";
                          document.getElementById("points-display").value =
                            "50";
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Low priority - 50 points"
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("priority-input").value =
                          "MEDIUM";
                        document.getElementById("points-input").value = "100";
                        document.getElementById("points-display").value = "100";
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("priority-input").value =
                            "MEDIUM";
                          document.getElementById("points-input").value = "100";
                          document.getElementById("points-display").value =
                            "100";
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Medium priority - 100 points"
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("priority-input").value =
                          "HIGH";
                        document.getElementById("points-input").value = "150";
                        document.getElementById("points-display").value = "150";
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("priority-input").value =
                            "HIGH";
                          document.getElementById("points-input").value = "150";
                          document.getElementById("points-display").value =
                            "150";
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="High priority - 150 points"
                    >
                      High
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-white/60 text-sm mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      required
                      defaultValue={(() => {
                        const today = new Date();
                        const year = today.getFullYear();
                        const month = String(today.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const day = String(today.getDate()).padStart(2, "0");
                        return `${year}-${month}-${day}`;
                      })()}
                      onClick={(e) => e.target.showPicker()}
                      className="w-full bg-white border text-sm border-[#fca311]/20 rounded-lg px-4 py-2 text-black focus:border-[#fca311] focus:outline-none appearance-none cursor-pointer font-bold"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-white/60 text-sm mb-2">
                      Due Time
                    </label>
                    <input
                      type="time"
                      name="dueTime"
                      required
                      defaultValue={(() => {
                        const date = new Date();
                        date.setMinutes(date.getMinutes() + 10);
                        return date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                      })()}
                      onClick={(e) => e.target.showPicker()}
                      className="w-full text-sm bg-white border border-[#fca311]/20 rounded-lg px-4 py-2 text-black focus:border-[#fca311] focus:outline-none appearance-none cursor-pointer font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Points
                  </label>
                  <input
                    type="text"
                    id="points-display"
                    readOnly
                    defaultValue="100"
                    placeholder="Select priority to set points"
                    className="w-full bg-black/50 border border-[#fca311]/20 rounded-lg px-4 py-2 text-white focus:border-[#fca311] focus:outline-none"
                    aria-label="Points display"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddTask(false)}
                    className="px-4 py-2 text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaPlus />
                    <span>Add Task</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Completion Mascot */}
      <AnimatePresence>
        {showMascot && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-6 right-8 -translate-x-1/2 bg-gradient-to-r from-[#132242] to-[#062c77] p-6 rounded-2xl shadow-xl border border-[#fca311]/30 max-w-md backdrop-blur-sm z-50"
          >
            <button
              onClick={() => setShowMascot(false)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-[#14213d] rounded-full flex items-center justify-center border border-[#fca311]/30 shadow-lg hover:bg-[#1a2b4d] hover:border-[#fca311] transition-all duration-300 group"
            >
              <FaTimes className="text-[#fca311] group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#fca311] rounded-full flex items-center justify-center animate-bounce">
                  <FaTrophy className="text-3xl text-white" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <FaCheck className="text-white" />
                </motion.div>
              </div>

              <div className="flex-1">
                <motion.h4
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent"
                >
                  Awesome job! 🎉
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80 mt-1 text-sm md:text-base"
                >
                  You're making great progress! Keep up the momentum and tackle
                  your next challenge.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-2 text-xs md:text-sm"
                >
                  View your completed task in{" "}
                  <a
                    href="/history"
                    className="text-[#fca311] hover:text-[#ffd700] font-semibold underline decoration-2 decoration-[#fca311]/50 hover:decoration-[#ffd700] transition-all inline-block"
                  >
                    Task History
                  </a>
                  <span className="inline"> ✨</span>
                </motion.p>
              </div>
            </div>
            <div className="absolute bottom-0 right-2 w-full h-1 overflow-hidden rounded-b-3xl">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-400"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: 0,
                }}
                onAnimationComplete={() => setShowMascot(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
