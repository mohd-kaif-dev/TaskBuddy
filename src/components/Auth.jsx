import { SignIn, SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaGamepad,
  FaTrophy,
  FaStar,
  FaLevelUpAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Auth = ({ type }) => {
  const navigate = useNavigate();

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
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
              className="achievement-card bg-gradient-to-br from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaTrophy className="text-[#fca311] text-8xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#fca311] transition-colors">
                  Earn Rewards
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Complete tasks, unlock epic achievements
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
              className="achievement-card bg-gradient-to-bl from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaStar className="text-[#fca311] text-8xl group-hover:rotate-180 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#fca311] transition-colors">
                  Level Up
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Rise through the ranks of mastery
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
              className="achievement-card bg-gradient-to-tr from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaLevelUpAlt className="text-[#fca311] text-8xl group-hover:translate-y-[-10px] group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#fca311] transition-colors">
                  Track Progress
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Watch your journey unfold
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
              className="achievement-card bg-gradient-to-tl from-[#14213d]/90 to-[#14213d]/60 p-6 rounded-2xl border border-[#fca311]/20 relative group backdrop-blur-sm hover:shadow-[0_0_30px_rgba(252,163,17,0.3)] transition-all duration-500"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:drop-shadow-[0_0_8px_rgba(252,163,17,0.8)] transition-all duration-500">
                <FaGamepad className="text-[#fca311] text-8xl group-hover:rotate-[-20deg] group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#fca311] transition-colors">
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
      <div className="w-full lg:w-1/2 flex justify-center p-4 relative">
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

        <div className="w-full max-w-md mt-16 md:mt-8 ml-0 md:ml-16">
          {type === "sign-in" && (
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
          )}
        </div>
        <div className="w-full max-w-md mt-16 md:mt-8 mr-0 md:mr-16">
          {type === "sign-up" && (
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
    </div>
  );
};

export default Auth;
