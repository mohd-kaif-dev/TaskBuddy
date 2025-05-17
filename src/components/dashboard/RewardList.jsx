import { useState } from "react";
import { FaGift } from "react-icons/fa";
import { RewardCard } from "../GameElements";
import confetti from "canvas-confetti";

const RewardList = ({
  gameState,
  setGameState,
  GAME_CONFIG,
  user,
  setShowMascot,
}) => {
  const [showAllRewards, setShowAllRewards] = useState(false);

  const handleClaimReward = (rewardId) => {
    const reward = GAME_CONFIG.REWARDS[rewardId];
    if (
      gameState.level >= reward.requiredLevel &&
      !gameState.unlockedRewards?.includes(rewardId)
    ) {
      const updatedRewards = [...(gameState.unlockedRewards || []), rewardId];
      const updatedGameState = {
        ...gameState,
        unlockedRewards: updatedRewards,
      };

      // Update state
      setGameState(updatedGameState);

      // Save to localStorage
      localStorage.setItem(
        `userProgress_${user.id}`,
        JSON.stringify(updatedGameState)
      );

      // Show celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setShowMascot(true);
      setTimeout(() => setShowMascot(false), 3000);
    }
  };

  return (
    <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FaGift className="text-[#fca311]" />
        Rewards (Coming Soon)
      </h3>
      <div className="space-y-4">
        {Object.values(GAME_CONFIG.REWARDS)
          .slice(0, showAllRewards ? undefined : 3)
          .map((reward) => {
            const isUnlocked = gameState.level >= reward.requiredLevel;
            const isClaimed = gameState.unlockedRewards?.includes(reward.id);
            return (
              <RewardCard
                key={reward.id}
                reward={reward}
                isUnlocked={isUnlocked}
                currentLevel={gameState.level}
                isClaimed={isClaimed}
                onClaim={() => handleClaimReward(reward.id)}
              />
            );
          })}
        {Object.values(GAME_CONFIG.REWARDS).length > 3 && (
          <button
            onClick={() => setShowAllRewards(!showAllRewards)}
            className="w-full text-center text-[#fca311] hover:text-[#fca311]/80 transition-colors"
          >
            {showAllRewards ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default RewardList;
