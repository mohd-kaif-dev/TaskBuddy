import { SignIn, SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaGamepad,
  FaTrophy,
  FaStar,
  FaLevelUpAlt,
  FaTimes,
  FaRegClipboard,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Auth = ({ type }) => {
  const navigate = useNavigate();
  const [showJudgeModal, setShowJudgeModal] = useState(true);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        toast.success("Text copied to Clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard: ", error);
        toast.error("Error copying text to Clipboard");
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex items-stretch pt-16 md:pt-8">
      {/* Left Side - Welcome Message and Art */}
      <div className="hidden lg:flex flex-col items-center w-1/2 p-8 mt-8 bg-[#14213d]/50 relative">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/")}
          className="absolute top-5 left-5 px-4 py-2 rounded-lg bg-black/20 text-white/80 hover:text-[#fca311] hover:bg-black/30 flex items-center gap-2 transition-all group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <FaGamepad className="text-[#fca311] text-4xl" />
            <h1 className="text-xl font-bold text-white">
              {type === "sign-in" ? "Welcome Back, Player!" : "Join the Game"}
            </h1>
          </div>
          <p className="text-white/60 text-base mb-6">
            {type === "sign-in"
              ? "Ready to continue your productivity journey?"
              : "Start your productivity adventure today"}
          </p>

          {/* Vector Art / Illustrations */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="achievement-card bg-gradient-to-br from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaTrophy className="text-[#fca311] text-8xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1 text-[#fca311] transition-colors">
                  Earn Rewards
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Complete tasks, unlock epic achievements
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="achievement-card bg-gradient-to-bl from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaStar className="text-[#fca311] text-8xl group-hover:rotate-45 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1 text-[#fca311] transition-colors">
                  Level Up
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Rise through the ranks of mastery
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="achievement-card bg-gradient-to-tr from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaLevelUpAlt className="text-[#fca311] text-8xl group-hover:translate-y-[-10px] group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1 text-[#fca311] transition-colors">
                  Track Progress
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Watch your journey unfold
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="achievement-card bg-gradient-to-tl from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaGamepad className="text-[#fca311] text-8xl group-hover:rotate-[-20deg] group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1 text-[#fca311] transition-colors">
                  Have Fun
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Turn productivity into adventure
                </p>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 w-full max-w-sm mx-auto"
          >
            <div className="flex justify-between mb-2">
              <span className="text-white/60">Progress to Next Level</span>
              <span className="text-[#fca311]">80%</span>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#fca311] rounded-full transition-all duration-1000"
                style={{ width: "80%" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Auth Component */}
      <div className="w-full lg:w-1/2 flex items-center lg:justify-center md:mt-16 lg:mt-0 p-4 relative md:flex-col lg:flex-row">
        {/* Mobile Back Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/")}
          className="md:hidden absolute top-4 left-8 px-4 py-2 rounded-lg bg-[#14213d] text-white/80 hover:text-[#fca311] hover:bg-[#14213d]/80 flex items-center gap-2 transition-all group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 hidden md:block lg:hidden"
        >
          {type === "sign-up" ? (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#fca311] to-orange-500 bg-clip-text text-transparent">
                Welcome New Adventurer!
              </h2>
              <p className="text-white/80">
                Ready to begin your productivity quest?
                <span className="block mt-1 text-sm">
                  <span className="text-[#fca311]">⚔️ Level up</span> your
                  tasks,
                  <span className="text-[#fca311]"> 🏆 earn rewards</span>, and
                  <span className="text-[#fca311]">
                    {" "}
                    🌟 unlock achievements
                  </span>
                </span>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#fca311] to-orange-500 bg-clip-text text-transparent">
                Welcome Back Hero!
              </h2>
              <p className="text-white/80">
                Your productivity journey continues...
                <span className="block mt-1 text-sm">
                  <span className="text-[#fca311]">🎯 Daily quests</span> await,
                  <span className="text-[#fca311]"> ⚡ power up</span> your
                  streak, and
                  <span className="text-[#fca311]"> 👑 claim glory</span>
                </span>
              </p>
            </div>
          )}
        </motion.div>

        <div className="w-full max-w-md mt-12 flex items-center justify-center">
          {type === "sign-in" ? (
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#fca311] hover:bg-[#fca311]/80 text-white text-sm",
                  card: "bg-[#14213d] border border-[#fca311]/20",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/60 text-sm",
                  socialButtonsBlockButton:
                    "border border-[#fca311]/20 hover:border-[#fca311] text-white text-xs",
                  formFieldInput:
                    "bg-black/50 border-[#fca311]/20 text-white text-sm",
                  formFieldLabel: "text-white/60 text-sm",
                  footerActionLink:
                    "text-[#fca311] hover:text-[#fca311]/80 text-sm",
                },
              }}
            />
          ) : (
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#fca311] hover:bg-[#fca311]/80 text-white text-sm",
                  card: "bg-[#14213d] border border-[#fca311]/20",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/60 text-sm",
                  socialButtonsBlockButton:
                    "border border-[#fca311]/20 hover:border-[#fca311] text-white text-sm",
                  formFieldInput:
                    "bg-black/50 border-[#fca311]/20 text-white text-sm",
                  formFieldLabel: "text-white/60 text-sm",
                  footerActionLink:
                    "text-[#fca311] hover:text-[#fca311]/80 text-sm",
                },
              }}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showJudgeModal && (
          <div className="absolute inset-0 bg-black/80">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed top-1/3 left-1/5 md:left-1/4 bg-gradient-to-r from-[#132242] to-[#062c77] p-6 rounded-2xl shadow-xl border border-[#fca311]/30 max-w-lg backdrop-blur-sm z-50"
            >
              <button
                onClick={() => setShowJudgeModal(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-[#14213d] rounded-full flex items-center justify-center border border-[#fca311]/30 shadow-lg hover:bg-[#1a2b4d] hover:border-[#fca311] transition-all duration-300 group"
              >
                <FaTimes className="text-[#fca311] group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <motion.h4
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent"
                  >
                    A message for Judges 👨‍⚖️
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80 mt-1 text-sm md:text-base"
                  >
                    Welcome, esteemed judges! Thank you for reviewing my
                    project. Please use the credentials provided to access the
                    TaskBuddy Dashboard.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80 mt-4 text-sm md:text-base group"
                  >
                    <strong>Email : </strong>{" "}
                    <span
                      onClick={() => copyToClipboard("steve@rogers.com")}
                      className="text-[#fca311] cursor-pointer font-bold"
                    >
                      steve@rogers.com{" "}
                      <FaRegClipboard className="w-4 h-4 opacity-0 text-white inline group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                    </span>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80 text-sm md:text-base group"
                  >
                    <strong>Password : </strong>{" "}
                    <span
                      onClick={() => copyToClipboard("Human@5243")}
                      className="text-[#fca311] cursor-pointer font-bold"
                    >
                      Human@5243{" "}
                      <FaRegClipboard className="w-4 h-4 opacity-0 text-white inline group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                    </span>
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
