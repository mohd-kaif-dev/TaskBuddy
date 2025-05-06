import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaLevelUpAlt,
  FaRegLightbulb,
  FaArrowRight,
  FaStar,
  FaGamepad,
} from "react-icons/fa";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  const features = [
    {
      icon: <FaGamepad className="feature-icon" />,
      title: "Turn Tasks into Games",
      description:
        "Transform your boring to-do list into an exciting adventure. Complete tasks, earn points, and level up!",
    },
    {
      icon: <FaTrophy className="feature-icon" />,
      title: "Earn Achievements",
      description:
        "Get rewarded for your progress with badges, trophies, and special achievements that showcase your growth.",
    },
    {
      icon: <FaRegLightbulb className="feature-icon" />,
      title: "Stay Motivated",
      description:
        "Engaging rewards, progress tracking, and motivational nudges keep you moving forward.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated SVG Background */}
        <div className="absolute inset-0">
          <svg
            className="w-full h-full opacity-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
              stroke="#fca311"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{
                pathLength: 1,
                opacity: 0.8,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              stroke="#fca311"
              strokeWidth="0.2"
              fill="none"
              initial={{ scale: 0.8, opacity: 0.2 }}
              animate={{
                scale: 1.2,
                opacity: 0.8,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M20,20 Q35,35 50,20 T80,20"
              stroke="#fca311"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.5,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-[#14213d]/70 to-[#14213d]/30" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000000] to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 ">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <div className="level-badge flex items-center gap-2">
                <FaStar /> Level Up Your Life
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="section-title"
            >
              Make Task Management
              <br />
              Actually Fun
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="section-subtitle"
            >
              Stop procrastinating, start achieving. Transform your tasks into
              an exciting game where every completion levels you up and earns
              rewards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isSignedIn ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-primary flex items-center gap-2"
                >
                  Continue Your Journey <FaArrowRight />
                </button>
              ) : (
                <button
                  onClick={() => navigate("/sign-up")}
                  className="btn-primary flex items-center gap-2"
                >
                  Start Your Adventure <FaArrowRight />
                </button>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="achievement-card">
                <FaTrophy className="text-[#4CAF50] text-4xl mb-2" />
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-[#e5e5e5]">Tasks Completed</div>
              </div>
              <div className="achievement-card">
                <FaLevelUpAlt className="text-[#4CAF50] text-4xl mb-2" />
                <div className="text-2xl font-bold">1M+</div>
                <div className="text-[#e5e5e5]">Points Earned</div>
              </div>
              <div className="achievement-card">
                <FaStar className="text-[#4CAF50] text-4xl mb-2" />
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-[#e5e5e5]">Active Players</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">
            Level Up Your Productivity
          </h2>
          <p className="section-subtitle text-center max-w-3xl mx-auto">
            Experience a new way of getting things done. Turn your daily tasks
            into rewarding achievements and watch your productivity soar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card group"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-[#e5e5e5]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14213d] to-[#000000]">
          <svg
            className="absolute w-full h-full opacity-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="#fca311"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M0,70 Q25,50 50,70 T100,70"
              stroke="#fca311"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
          </svg>
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fca311] to-[#f8c537] bg-clip-text text-transparent">
              Your Adventure Awaits!
            </h2>
            <p className="text-xl text-[#e5e5e5]/90 mb-12 leading-relaxed">
              Join <span className="text-[#fca311] font-semibold">10,000+</span>{" "}
              heroes who've transformed their daily quests into epic adventures.
              Level up your life, one task at a time!
            </p>

            <motion.button
              onClick={() => navigate("/sign-up")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-[#fca311] text-black rounded-xl font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(252,163,17,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#fca311] to-[#f8c537] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3">
                <FaGamepad className="text-2xl group-hover:rotate-12 transition-transform" />
                Start Your Journey
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>

            {/* Floating Achievement Cards */}
            <div className="mt-16 grid grid-cols-3 md:gap-6 gap-4 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="achievement-preview p-6 bg-black/30 rounded-xl border border-[#fca311]/20 backdrop-blur-sm"
              >
                <FaStar className="text-[#fca311] text-3xl mb-3 mx-auto" />
                <div className="text-md md:text-lg font-bold text-white">
                  Early Bird
                </div>
                <div className="text-xs md:text-sm text-[#e5e5e5]/60">
                  Complete 3 tasks before 10 AM
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="achievement-preview p-6 bg-black/30 rounded-xl border border-[#fca311]/20 backdrop-blur-sm"
              >
                <FaTrophy className="text-[#fca311] text-3xl mb-3 mx-auto" />
                <div className="text-md md:text-lg font-bold text-white">
                  Streak Master
                </div>
                <div className="text-xs md:text-sm text-[#e5e5e5]/60">
                  Maintain a 7-day streak
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="achievement-preview p-6 bg-black/30 rounded-xl border border-[#fca311]/20 backdrop-blur-sm"
              >
                <FaLevelUpAlt className="text-[#fca311] text-3xl mb-3 mx-auto" />
                <div className="text-md md:text-lg font-bold text-white">
                  Level 10
                </div>
                <div className="text-xs md:text-sm text-[#e5e5e5]/60">
                  Unlock special rewards
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
