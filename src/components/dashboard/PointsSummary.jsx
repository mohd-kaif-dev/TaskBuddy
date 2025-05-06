import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { TaskPointsPreview } from "../GameElements";

const PointsSummary = ({ gameState, GAME_CONFIG, user }) => {
  return (
    <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <div className="relative">
          <FaTrophy className="text-[#fca311] text-2xl animate-bounce" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#fca311] rounded-full animate-ping" />
        </div>
        <span className="bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent">
          Points Summary
        </span>
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/60">Today's Points</span>
          <span className="text-lg font-bold">{gameState.todayPoints}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60">Weekly Points</span>
          <span className="text-lg font-bold">{gameState.weeklyPoints}</span>
        </div>
        <div className="h-px bg-white/10 my-4" />
        <div>
          <TaskPointsPreview
            points={gameState.totalPoints}
            streakBonus={
              gameState.streak * GAME_CONFIG.POINTS.STREAK_MULTIPLIER
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PointsSummary;
