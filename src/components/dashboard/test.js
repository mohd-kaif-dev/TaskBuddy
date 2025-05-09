const checkStreak = () => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const lastLoginDate = gameState.lastLoginDate;

  // ✅ If the user logged in yesterday, increment the streak
  if (lastLoginDate === yesterday) {
    console.log("🔥 Consecutive login - incrementing streak");
    setGameState((prev) => {
      const newStreak = prev.streak + 1;
      const newLongestStreak = Math.max(newStreak, prev.longestStreak);
      const newState = {
        ...prev,
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastLoginDate: today,
      };
      localStorage.setItem(`userProgress_${user.id}`, JSON.stringify(newState));
      return newState; // ✅ Critical to update actual state
    });
  }
  // ❌ If last login wasn't yesterday or today, reset streak
  else if (lastLoginDate !== today) {
    console.log("💔 Missed login - resetting streak");
    setGameState((prev) => {
      const newState = {
        ...prev,
        streak: 0,
        lastLoginDate: today,
      };
      localStorage.setItem(`userProgress_${user.id}`, JSON.stringify(newState));
      return newState; // ✅ Critical to update actual state
    });
  } else {
    console.log("✅ Already logged in today - no change to streak");
  }
};
