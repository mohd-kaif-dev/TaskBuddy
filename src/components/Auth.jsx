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
    <div className="min-h-screen w-full flex items-stretch pt-16">
      {/* Left Side - Welcome Message and Art */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 bg-[#14213d]/50 relative">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 px-4 py-2 rounded-lg bg-black/20 text-white/80 hover:text-[#fca311] hover:bg-black/30 flex items-center gap-2 transition-all group"
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
          <div className="flex items-center justify-center gap-2 mb-6">
            <FaGamepad className="text-[#fca311] text-4xl" />
            <h1 className="text-3xl font-bold text-white">
              {type === "sign-in" ? "Welcome Back, Player!" : "Join the Game"}
            </h1>
          </div>
          <p className="text-white/60 text-lg mb-12">
            {type === "sign-in"
              ? "Ready to continue your productivity journey?"
              : "Start your productivity adventure today"}
          </p>

          {/* Vector Art / Illustrations */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="achievement-card bg-[#14213d]/80 p-6 rounded-xl border border-[#fca311]/20"
            >
              <FaTrophy className="text-[#fca311] text-4xl mb-3" />
              <h3 className="text-white font-semibold">Earn Rewards</h3>
              <p className="text-white/60 text-sm">
                Complete tasks, gain achievements
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="achievement-card bg-[#14213d]/80 p-6 rounded-xl border border-[#fca311]/20"
            >
              <FaStar className="text-[#fca311] text-4xl mb-3" />
              <h3 className="text-white font-semibold">Level Up</h3>
              <p className="text-white/60 text-sm">Watch your progress grow</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="achievement-card bg-[#14213d]/80 p-6 rounded-xl border border-[#fca311]/20"
            >
              <FaLevelUpAlt className="text-[#fca311] text-4xl mb-3" />
              <h3 className="text-white font-semibold">Track Progress</h3>
              <p className="text-white/60 text-sm">Visualize your journey</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="achievement-card bg-[#14213d]/80 p-6 rounded-xl border border-[#fca311]/20"
            >
              <FaGamepad className="text-[#fca311] text-4xl mb-3" />
              <h3 className="text-white font-semibold">Have Fun</h3>
              <p className="text-white/60 text-sm">
                Make productivity enjoyable
              </p>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 w-full max-w-sm mx-auto"
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        {/* Mobile Back Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/")}
          className="lg:hidden absolute top-8 left-8 px-4 py-2 rounded-lg bg-[#14213d] text-white/80 hover:text-[#fca311] hover:bg-[#14213d]/80 flex items-center gap-2 transition-all group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </motion.button>

        <div className="w-full max-w-md mt-16">
          {type === "sign-in" ? (
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#fca311] hover:bg-[#fca311]/80 text-white",
                  card: "bg-[#14213d] border border-[#fca311]/20",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/60",
                  socialButtonsBlockButton:
                    "border border-[#fca311]/20 hover:border-[#fca311] text-white",
                  formFieldInput: "bg-black/50 border-[#fca311]/20 text-white",
                  formFieldLabel: "text-white/60",
                  footerActionLink: "text-[#fca311] hover:text-[#fca311]/80",
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
                    "bg-[#fca311] hover:bg-[#fca311]/80 text-white",
                  card: "bg-[#14213d] border border-[#fca311]/20",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/60",
                  socialButtonsBlockButton:
                    "border border-[#fca311]/20 hover:border-[#fca311] text-white",
                  formFieldInput: "bg-black/50 border-[#fca311]/20 text-white",
                  formFieldLabel: "text-white/60",
                  footerActionLink: "text-[#fca311] hover:text-[#fca311]/80",
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
