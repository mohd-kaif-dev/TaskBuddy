import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaShieldAlt, FaCalendarAlt } from "react-icons/fa";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#14213d] border-t border-[#fca311]/20 py-4 px-8 z-20"
    >
      <div className="max-w-7xl mx-auto text-sm">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 ">
          {/* Left Section - Date Time */}
          <div className="flex items-center justify-center md:justify-start md:hidden lg:flex">
            <div className="text-white/80 font-mono flex items-center">
              <FaCalendarAlt className="mr-2 text-[#fca311]" />
              {formatDate(currentDateTime)}
            </div>
          </div>

          {/* Center Section - Copyright */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-white/80">
              <FaShieldAlt className="text-[#fca311]" />
              <span>
                © {currentDateTime.getFullYear()} TaskBuddy. All rights
                reserved.
              </span>
            </div>
          </div>

          {/* Right Section - Developer Credit */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="flex items-center gap-2 text-white/80">
              <span>Developed with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>
                by{" "}
                <a
                  href="https://github.com/mohd-kaif-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fca311] hover:text-[#fca311]/80 hover:underline"
                >
                  Mohd Kaif
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
