import { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaQuestionCircle,
  FaBook,
  FaGem,
  FaMedal,
  FaFire,
  FaCrown,
  FaBolt,
  FaGamepad,
  FaStar,
  FaTimes,
  FaBars,
  FaCalendarCheck,
  FaHistory,
  FaScroll,
} from "react-icons/fa";
import { GiLevelThree } from "react-icons/gi";
import { dark } from "@clerk/themes";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showResources, setShowResources] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const features = [
    {
      title: "Task Board",
      description: "Your command center for quests and achievements",

      icon: <FaGamepad className="text-[#fca311]" />,
    },
    {
      title: "Adventure Log",
      description: "Chronicle your completed quests and victories",

      icon: <FaScroll className="text-[#fca311]" />,
    },
    {
      title: "Achievement System",
      description: "Earn badges and rewards as you progress",
      icon: <FaMedal className="text-[#fca311]" />,
    },
    {
      title: "Level Progression",
      description: "Level up and unlock new features",
      icon: <FaCrown className="text-[#fca311]" />,
    },
  ];

  const resources = [
    {
      title: "How to Play",
      description: "Learn the game mechanics and features",
      icon: <FaQuestionCircle className="text-[#fca311]" />,
      onClick: () => setShowHowToPlay(true),
      showAlways: true,
    },
    {
      title: "Documentation",
      description: "Advanced guides and strategies",
      icon: <FaBook className="text-[#fca311]" />,
      onClick: () => navigate("/docs"),
      showAlways: true,
    },
    {
      title: "Task History",
      description: "View all your completed tasks",
      icon: <FaCalendarCheck className="text-[#fca311]" />,
      onClick: () => navigate("/history"),
      signedInOnly: true,
    },
  ];

  // Filter resources based on auth status
  const filteredResources = resources.filter(
    (resource) => resource.showAlways || (resource.signedInOnly && isSignedIn)
  );

  const gameGuide = {
    sections: [
      {
        title: "Getting Started",
        icon: <FaGamepad className="text-[#fca311] text-2xl" />,
        content: [
          "Welcome to TaskBuddy - where productivity meets fun!",
          "Create tasks, complete them, and watch yourself level up.",
          "Break down tasks into milestones for better management.",
        ],
      },
      {
        title: "Level System",
        icon: <GiLevelThree className="text-[#fca311] text-2xl" />,
        content: [
          "Gain XP by completing tasks and milestones",
          "Level requirements increase by 500 XP each level",
          "Higher levels unlock special rewards and features",
        ],
      },
      {
        title: "Points & Streaks",
        icon: <FaTrophy className="text-[#fca311] text-2xl" />,
        content: [
          "Tasks: Low (50pts), Medium (100pts), High (150pts)",
          "Milestones: +30 points each",
          "Daily streaks give bonus points (10% per day)",
        ],
      },
      {
        title: "Badges",
        icon: <FaMedal className="text-[#fca311] text-2xl" />,
        content: [
          "Early Bird: Complete 3 tasks before 10 AM",
          "Streak Master: Maintain a 7-day streak",
          "Milestone Hunter: Complete 50 milestones",
          "Speed Demon: Complete 5 tasks before due time",
          "Perfectionist: Complete all milestones in 10 tasks",
        ],
      },
      {
        title: "Rewards",
        icon: <FaGem className="text-[#fca311] text-2xl" />,
        content: [
          "Level 5: Unlock custom theme colors",
          "Level 10: Access advanced analytics",
          "Level 15: Earn premium badges",
        ],
      },
      {
        title: "Pro Tips",
        icon: <FaBolt className="text-[#fca311] text-2xl" />,
        content: [
          "Complete tasks early for bonus points",
          "Maintain daily streaks for point multipliers",
          "Break down complex tasks into milestones",
          "Check your progress in the dashboard",
        ],
      },
    ],
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-[#14213d]/95 backdrop-blur-sm border-b border-[#fca311]/20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <h1 className="logo-text text-xl font-righteous text-white hover:text-[#fca311] transition-all duration-300 flex items-center gap-2 relative">
                <FaGamepad className="text-[#fca311] group-hover:rotate-12 transition-transform duration-300 text-3xl" />
                <span className="relative">
                  <span className="relative z-10">Task</span>
                  <span className="relative z-10 text-[#fca311]">Buddy</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#fca311]/20 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                </span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center  gap-4">
              {/* Features Dropdown - Only show on homepage when not signed in */}
              {!isSignedIn && isHomePage && (
                <div className="relative">
                  <button
                    className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onMouseEnter={() => setShowFeatures(true)}
                    onMouseLeave={() => setShowFeatures(false)}
                  >
                    Features
                  </button>
                  <AnimatePresence>
                    {showFeatures && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 w-64 mt-2 origin-top-right rounded-md shadow-lg bg-[#14213d] border border-[#fca311]/20"
                        onMouseEnter={() => setShowFeatures(true)}
                        onMouseLeave={() => setShowFeatures(false)}
                      >
                        <div className="py-2">
                          {features.map((feature, index) => (
                            <a
                              key={index}
                              href="#"
                              className="block px-4 py-3 hover:bg-black/20"
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1">{feature.icon}</div>
                                <div>
                                  <div className="font-medium text-sm text-white">
                                    {feature.title}
                                  </div>
                                  <div className="text-xs text-white/60">
                                    {feature.description}
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onMouseEnter={() => setShowResources(true)}
                  onMouseLeave={() => setShowResources(false)}
                >
                  Resources
                </button>
                <AnimatePresence>
                  {showResources && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 w-48 mt-2 origin-top-right rounded-md shadow-lg bg-[#14213d] border border-[#fca311]/20"
                      onMouseEnter={() => setShowResources(true)}
                      onMouseLeave={() => setShowResources(false)}
                    >
                      <div className="py-2">
                        {filteredResources.map((resource, index) => (
                          <button
                            key={index}
                            onClick={resource.onClick}
                            className="block w-full text-left px-4 py-3 hover:bg-black/20"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">{resource.icon}</div>
                              <div>
                                <div className="font-medium text-sm text-white">
                                  {resource.title}
                                </div>
                                <div className="text-xs text-white/60">
                                  {resource.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth Buttons */}
              {!isSignedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/sign-in")}
                    className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/sign-up")}
                    className="bg-[#fca311] hover:bg-[#fca311]/80 px-4 py-2 rounded-md text-sm font-medium text-black flex items-center gap-2 group"
                  >
                    <span>Start Playing</span>
                    <FaBolt className="group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              ) : (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    baseTheme: dark,
                  }}
                />
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/80 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#fca311]/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 relative">
                {resources.map((resource, index) => {
                  // Only show if resource is marked showAlways or if user is signed in and resource is signedInOnly
                  if (
                    resource.showAlways ||
                    (isSignedIn && resource.signedInOnly)
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          resource.onClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-black/20"
                      >
                        <div className="flex items-center gap-3">
                          {resource.icon}
                          {resource.title}
                        </div>
                      </button>
                    );
                  }
                  return null;
                })}
                {!isSignedIn ? (
                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        navigate("/sign-in");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-3 py-2 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-black/20"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        navigate("/sign-up");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#fca311] hover:bg-[#fca311]/80 px-3 py-2 rounded-md text-base font-medium text-black flex items-center justify-center gap-2 group"
                    >
                      <span>Start Playing</span>
                      <FaBolt className="group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="absolute right-4 top-2 z-20 items-center border border-[#fca311]/20 rounded-full">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        baseTheme: dark,
                        elements: {
                          avatarBox: "w-8 h-8", // Increase avatar size
                          userButtonBox: "p-2", // Add padding around button
                          userButtonTrigger: "scale-110", // Scale up the entire button
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* How to Play Modal */}
      <AnimatePresence>
        {showHowToPlay && (
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
              className="bg-[#14213d] rounded-xl shadow-lg border border-[#fca311]/20 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 flex justify-between items-start border-b border-[#fca311]/20">
                <div className="flex items-center gap-3">
                  <FaGamepad className="text-[#fca311] text-2xl" />
                  <h2 className="text-xl font-bold text-white">
                    How to Play TaskBuddy
                  </h2>
                </div>
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="text-white/60 hover:text-white"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <div className="space-y-8">
                  {gameGuide.sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center gap-3">
                        {section.icon}
                        <h3 className="text-lg font-bold text-white">
                          {section.title}
                        </h3>
                      </div>
                      <ul className="space-y-2 ml-8">
                        {section.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="text-white/80 flex items-start gap-2"
                          >
                            <FaStar className="text-[#fca311] text-sm mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-[#fca311]/20">
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="w-full bg-[#fca311] hover:bg-[#fca311]/80 px-4 py-2 rounded-md font-medium text-black"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
