import { motion } from "framer-motion";
import {
  FaStar,
  FaTrophy,
  FaFire,
  FaLock,
  FaCheck,
  FaTimes,
  FaChartLine,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export const BadgeCard = ({ badge, isUnlocked, progress, total }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-black/20 rounded-lg p-4 md:p-3 ${
      !isUnlocked ? "opacity-50" : ""
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="text-2xl md:text-xl mt-1">{badge.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium ">{badge.title}</h4>
          {isUnlocked && <FaCheck className="text-green-500 text-sm" />}
        </div>
        <p className=" text-white/60 text-sm md:text-xs">{badge.description}</p>
        {!isUnlocked && progress !== undefined && (
          <>
            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(progress / total) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-[#fca311] rounded-full"
              />
            </div>
            <div className="mt-1 text-right text-sm text-white/60">
              {progress}/{total}
            </div>
          </>
        )}
      </div>
    </div>
  </motion.div>
);

export const RewardCard = ({
  reward,
  isUnlocked,
  currentLevel,
  isClaimed,
  onClaim,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-black/20 rounded-lg p-4 ${!isUnlocked ? "opacity-50" : ""}`}
  >
    <div className="flex items-start gap-3">
      <div className="text-2xl mt-1">{reward.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{reward.title}</h4>
          {isUnlocked ? (
            <FaCheck className="text-green-500 text-sm" />
          ) : (
            <FaLock className="text-white/40 text-sm" />
          )}
        </div>
        <p className="text-sm text-white/60">{reward.description}</p>
        {!isUnlocked && (
          <p className="text-sm text-[#fca311] mt-1">
            Unlocks at level {reward.requiredLevel}
            {currentLevel < reward.requiredLevel &&
              ` (${reward.requiredLevel - currentLevel} levels to go)`}
          </p>
        )}
        {isUnlocked && !isClaimed && (
          <button
            onClick={onClaim}
            className="mt-2 text-sm text-[#fca311] hover:text-[#fca311]/80"
          >
            Claim Reward
          </button>
        )}
        {isClaimed && (
          <div className="mt-2 text-sm text-green-500 flex items-center gap-1">
            <FaCheck />
            <span>Claimed</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export const LevelProgress = ({ level, xp, requiredXP }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-white/60">Level {level}</span>
      <span className="text-[#fca311]">
        {xp}/{requiredXP} XP
      </span>
    </div>
    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(xp / requiredXP) * 100}%` }}
        transition={{ duration: 1 }}
        className="h-full bg-[#fca311] rounded-full"
      />
    </div>
  </div>
);

export const StreakDisplay = ({ streak, longestStreak }) => (
  <div className="flex items-center gap-4 bg-black/20 p-4 md:p-2 rounded-lg">
    <div className="flex items-center gap-2">
      <FaFire className="text-red-500 text-xl" />
      <div>
        <div className="text-xs text-white/60">Current Streak</div>
        <div className="text-xl font-bold">{streak} days</div>
      </div>
    </div>
    <div className="h-8 w-1 bg-white/50 rounded-full" />
    <div>
      <div className="text-xs text-white/60">Longest Streak</div>
      <div className="text-xl font-bold">{longestStreak} days</div>
    </div>
  </div>
);

export const TaskPointsPreview = ({ points, streakBonus }) => (
  <div className="bg-black/30 rounded-xl px-6 md:px-4 pt-4 pb-2 md:pb-4 backdrop-blur-sm border border-[#fca311]/20 hover:border-[#fca311]/40 transition-all duration-300 shadow-lg hover:shadow-[#fca311]/10">
    <div className="flex justify-between items-center w-full mb-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <FaTrophy className="text-[#fca311] text-2xl md:text-xl transform hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#fca311] rounded-full animate-ping" />
        </div>
        <span className="text-lg md:text-base font-bold bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent">
          Total Points
        </span>
      </div>
      <div className="relative">
        <motion.span
          className="text-xl font-bold bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {points}
        </motion.span>
        <span className="ml-1 text-[#fca311]/60">pts</span>
      </div>
    </div>

    <div className="relative min-h-[80px]">
      {streakBonus > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex items-center justify-center"
        >
          <div className="relative group bg-gradient-to-r from-emerald-900/30 to-emerald-600/30 rounded-lg px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-400 animate-pulse">
                    +{streakBonus.toFixed(2)}
                  </span>
                  <div className="relative">
                    <FaFire className="text-2xl text-orange-500" />
                    <div className="absolute inset-0 text-orange-400 animate-ping opacity-75">
                      <FaFire className="text-2xl" />
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent uppercase tracking-wider">
                  Streak Bonus
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="text-center space-y-2 text-white/30">
            <div className="flex justify-center space-x-2">
              <FaFire className="text-xl opacity-50" />
              <FaTrophy className="text-xl opacity-50" />
              <FaStar className="text-xl opacity-50" />
            </div>
            <p className="text-sm">
              Complete daily tasks and build your streak to earn streak bonuses!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

export const AchievementPopup = ({ achievement, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-8 right-8 bg-[#14213d] p-6 rounded-xl shadow-lg border border-[#fca311]/20 max-w-sm"
  >
    <div className="flex items-start gap-4">
      <div className="text-3xl">{achievement.icon}</div>
      <div className="flex-1">
        <h4 className="text-lg font-bold">{achievement.title}</h4>
        <p className="text-white/60">{achievement.description}</p>
      </div>
      <button onClick={onClose} className="text-white/40 hover:text-white/60">
        <FaTimes />
      </button>
    </div>
  </motion.div>
);

export const TaskStatsDisplay = ({
  totalTasks,
  completedTasks,
  pendingTasks,
  failedTasks,
}) => {
  const completionRate = (() => {
    if (totalTasks === 0) return 0;

    // Calculate raw completion rate
    const rawRate = ((completedTasks - failedTasks) / totalTasks) * 100;

    // Apply weighted penalties for failed tasks
    const failureWeight = 0.5; // Failed tasks count 20% more heavily
    const weightedFailures = failedTasks * failureWeight;

    // Calculate adjusted rate with weighted failures
    const adjustedRate =
      ((completedTasks - weightedFailures) / totalTasks) * 100;

    // Ensure rate stays within 0-100 bounds
    const boundedRate = Math.max(0, Math.min(100, adjustedRate));

    // Round to nearest integer
    return Math.round(boundedRate);
  })();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent">
          Task Statistics
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#14213d] flex items-center justify-center">
            <FaChartLine className="text-[#fca311]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold">{totalTasks}</div>
          <div className="text-sm text-white/60">Total Tasks</div>
          <div className="mt-2">
            <FaTasks className="text-blue-400 text-xl mx-auto" />
          </div>
        </div>

        <div className="text-center bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-500">
            {completedTasks}
          </div>
          <div className="text-sm text-white/60">Completed</div>
          <div className="mt-2">
            <FaCheckCircle className="text-green-500 text-xl mx-auto" />
          </div>
        </div>

        <div className="text-center bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-500">
            {pendingTasks}
          </div>
          <div className="text-sm text-white/60">Pending</div>
          <div className="mt-2">
            <FaClock className="text-yellow-500 text-xl mx-auto" />
          </div>
        </div>

        <div className="text-center bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-500">{failedTasks}</div>
          <div className="text-sm text-white/60">Failed</div>
          <div className="mt-2">
            <FaExclamationTriangle className="text-red-500 text-xl mx-auto" />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-black/10 p-4 rounded-lg">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Success Rate</span>
          <span className="text-white/80">{completionRate}%</span>
        </div>
        <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#fca311] to-[#ffd700] shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
