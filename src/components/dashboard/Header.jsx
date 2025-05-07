import { FaTrophy, FaUser } from "react-icons/fa";
import { GiLevelThree } from "react-icons/gi";
import { motion } from "framer-motion";

const Header = ({ gameState, user, GAME_CONFIG, setShowProfileModal }) => {
  const TITLES = {
    1: "Level 1 Explorer",
    2: "Level 2 Pathfinder",
    3: "Level 3 Adventurer",
    4: "Level 4 Pioneer",
    5: "Level 5 Trailblazer",
    6: "Level 6 Voyager",
    7: "Level 7 Wanderer",
    8: "Level 8 Seeker",
    9: "Level 9 Discoverer",
    10: "Level 10 Wayfarer",
    11: "Level 11 Nomad",
    12: "Level 12 Ranger",
    13: "Level 13 Scout",
    14: "Level 14 Navigator",
    15: "Level 15 Journeyer",
    16: "Level 16 Expeditioner",
    17: "Level 17 Quester",
    18: "Level 18 Pathmaker",
    19: "Level 19 Tracker",
    20: "Level 20 Veteran",
    21: "Level 21 Champion",
    22: "Level 22 Warrior",
    23: "Level 23 Guardian",
    24: "Level 24 Sentinel",
    25: "Level 25 Protector",
    26: "Level 26 Defender",
    27: "Level 27 Knight",
    28: "Level 28 Paladin",
    29: "Level 29 Vanguard",
    30: "Level 30 Master",
    31: "Level 31 Grandmaster",
    32: "Level 32 Sage",
    33: "Level 33 Elder",
    34: "Level 34 Oracle",
    35: "Level 35 Legend",
    36: "Level 36 Mythic",
    37: "Level 37 Celestial",
    38: "Level 38 Divine",
    39: "Level 39 Immortal",
    40: "Level 40 Transcendent",
    41: "Level 41 Ethereal",
    42: "Level 42 Astral",
    43: "Level 43 Cosmic",
    44: "Level 44 Stellar",
    45: "Level 45 Galactic",
    46: "Level 46 Universal",
    47: "Level 47 Infinite",
    48: "Level 48 Eternal",
    49: "Level 49 Supreme",
    50: "Level 50 Sovereign",
  };
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="bg-[#14213d] rounded-xl p-4 shadow-lg border border-[#fca311]/20">
        <div className="flex flex-col lg:flex-row items-center gap-6 ">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowProfileModal(true)}
              className="relative group"
            >
              <img
                src={user?.imageUrl}
                alt={user?.fullName}
                className="w-12 h-12 rounded-full border-2 border-[#fca311] transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaUser className="text-white text-xl" />
              </div>
            </button>
            <div>
              <h2 className="text-lg font-bold">{user?.fullName}</h2>
              <div className="flex items-center gap-2 text-white/60">
                <GiLevelThree className="text-[#fca311]" />
                <span className="text-sm">{TITLES[gameState.level]}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="w-full md:flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">
                Progress to Level {gameState.level + 1}
              </span>
              <span className="text-[#fca311] font-bold">
                {gameState.xp}/{GAME_CONFIG.getRequiredXP(gameState.level)} XP
              </span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (gameState.xp /
                      GAME_CONFIG.getRequiredXP(gameState.level)) *
                    100
                  }%`,
                }}
                transition={{ duration: 1 }}
                className="h-full bg-[#fca311] rounded-full"
              />
            </div>
          </div>

          {/* Total Points */}
          <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-lg">
            <FaTrophy className="text-[#fca311] text-xl" />
            <div className="w-full md:w-auto flex md:flex-row items-center gap-2 justify-center">
              <div className="text-md font-bold">{gameState.totalPoints}</div>
              <div className="text-white/60 text-sm">Total Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
