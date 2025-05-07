import React, { useState, useEffect } from "react";
import { FaMedal } from "react-icons/fa";
import { BadgeCard } from "../GameElements";

const BadgeList = ({ gameState, GAME_CONFIG, user }) => {
  const [selectedTab, setSelectedTab] = useState("daily"); // ✅ Track selected tab
  const [showAllDaily, setShowAllDaily] = useState(false); // ✅ Toggle for daily badges
  const [showAllPermanent, setShowAllPermanent] = useState(false); // ✅ Toggle for permanent badges
  const [loadedBadges, setLoadedBadges] = useState([]);
  const [loadedProgress, setLoadedProgress] = useState({});

  useEffect(() => {
    // Load badges from localStorage
    const userProgress = localStorage.getItem(`userProgress_${user.id}`);

    let allBadges = [];

    if (userProgress) {
      const parsedProgress = JSON.parse(userProgress);
      const dailyBadges = parsedProgress.dailyAchievements?.dailyBadges;
      const permanentBadges = parsedProgress.badges || [];
      allBadges = [...dailyBadges, ...permanentBadges];
      setLoadedProgress(parsedProgress.badgeProgress || {});
    }

    setLoadedBadges(allBadges);
  }, [user.id]);

  const getSortedDailyBadges = () => {
    const badges = Object.values(GAME_CONFIG.BADGES.DAILY);

    // First sort by unlocked status, then by progress ratio
    return badges.sort((a, b) => {
      const isUnlockedA = isBadgeUnlocked(a.id);
      const isUnlockedB = isBadgeUnlocked(b.id);

      // Put unlocked badges first
      if (isUnlockedA && !isUnlockedB) return -1;
      if (!isUnlockedA && isUnlockedB) return 1;

      // Then sort by progress ratio
      const progressA = getBadgeProgress(a.id);
      const progressB = getBadgeProgress(b.id);
      const ratioA = progressA / a.requirement;
      const ratioB = progressB / b.requirement;

      return ratioB - ratioA;
    });
  };

  const getSortedPermanentBadges = () => {
    const badges = Object.values(GAME_CONFIG.BADGES.PERMANENT);

    // First sort by unlocked status, then by progress ratio
    return badges.sort((a, b) => {
      const isUnlockedA = isBadgeUnlocked(a.id);
      const isUnlockedB = isBadgeUnlocked(b.id);

      // Put unlocked badges first
      if (isUnlockedA && !isUnlockedB) return -1;
      if (!isUnlockedA && isUnlockedB) return 1;

      // Then sort by progress ratio
      const progressA = getBadgeProgress(a.id);
      const progressB = getBadgeProgress(b.id);
      const ratioA = progressA / a.requirement;
      const ratioB = progressB / b.requirement;

      return ratioB - ratioA;
    });
  };

  const getBadgeProgress = (badgeId) => {
    return gameState.badgeProgress[badgeId] || loadedProgress[badgeId] || 0;
  };

  const isBadgeUnlocked = (badgeId) => {
    return (
      loadedBadges?.includes(badgeId) ||
      gameState.badges?.includes(badgeId) ||
      gameState.dailyAchievements?.dailyBadges?.includes(badgeId) ||
      false
    );
  };

  return (
    <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20">
      <h3 className="text-xl md:text-lg font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent relative group">
        <div className="relative">
          <FaMedal className="text-[#fca311] text-3xl transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#fca311] rounded-full animate-ping" />
        </div>
        <span className="relative text-white">
          Badges
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#fca311] to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </span>
      </h3>

      {/* ✅ Badge Tabs */}
      <div className="flex gap-4 mb-4 text-base md:text-sm">
        <button
          className={`px-4 py-1 rounded-md ${
            selectedTab === "daily"
              ? "bg-[#fca311] text-black"
              : "bg-black/20 text-white"
          }`}
          onClick={() => setSelectedTab("daily")}
        >
          Daily Badges
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            selectedTab === "permanent"
              ? "bg-[#fca311] text-black"
              : "bg-black/20 text-white"
          }`}
          onClick={() => setSelectedTab("permanent")}
        >
          Special Badges
        </button>
      </div>

      {/* ✅ Display badges based on selected tab */}
      <div className="space-y-4">
        {(selectedTab === "daily"
          ? getSortedDailyBadges().slice(0, showAllDaily ? undefined : 3)
          : getSortedPermanentBadges().slice(
              0,
              showAllPermanent ? undefined : 3
            )
        ).map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isUnlocked={isBadgeUnlocked(badge.id)}
            progress={getBadgeProgress(badge.id)}
            total={badge.requirement}
          />
        ))}

        {/* ✅ Show More / Show Less functionality for each tab */}
        {selectedTab === "daily" && getSortedDailyBadges().length > 3 && (
          <button
            onClick={() => setShowAllDaily(!showAllDaily)}
            className="w-full text-center text-[#fca311] hover:text-[#fca311]/80 transition-colors"
          >
            {showAllDaily ? "Show Less" : "Show More"}
          </button>
        )}

        {selectedTab === "permanent" &&
          getSortedPermanentBadges().length > 3 && (
            <button
              onClick={() => setShowAllPermanent(!showAllPermanent)}
              className="w-full text-center text-[#fca311] hover:text-[#fca311]/80 transition-colors"
            >
              {showAllPermanent ? "Show Less" : "Show More"}
            </button>
          )}
      </div>
    </div>
  );
};

export default BadgeList;
