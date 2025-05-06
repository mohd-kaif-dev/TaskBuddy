import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaScroll,
  FaStar,
  FaTrophy,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaGamepad,
  FaClock,
  FaCheck,
  FaTrash,
  FaCheckSquare,
  FaSquare,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const TaskHistory = () => {
  const { user, isSignedOut } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [taskHistory, setTaskHistory] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedOut) {
      navigate("/");
    }
  }, [isSignedOut, navigate]);

  useEffect(() => {
    if (user) {
      const storedHistory = localStorage.getItem(`taskHistory_${user.id}`);
      if (storedHistory) {
        setTaskHistory(JSON.parse(storedHistory));
      }
    }
  }, [user]);

  const filteredTasks = taskHistory.filter((task) => {
    const matchesSearch = task.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || task?.priority === filterType;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      low: "text-green-400",
      medium: "text-yellow-400",
      high: "text-red-400",
    };
    return colors[priority] || colors.medium;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(taskId)) {
        newSelected.delete(taskId);
      } else {
        newSelected.add(taskId);
      }
      return newSelected;
    });
  };

  const toggleSelectAll = () => {
    if (selectedTasks.size === filteredTasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(filteredTasks.map((task) => task.id)));
    }
  };

  const handleDelete = () => {
    const newTaskHistory = taskHistory.filter(
      (task) => !selectedTasks.has(task.id)
    );
    setTaskHistory(newTaskHistory);
    localStorage.setItem(
      `taskHistory_${user.id}`,
      JSON.stringify(newTaskHistory)
    );
    setSelectedTasks(new Set());
    setIsSelectionMode(false);
    setShowDeleteConfirm(false);
  };

  const handleSingleDelete = (taskId) => {
    const newTaskHistory = taskHistory.filter((task) => task.id !== taskId);
    setTaskHistory(newTaskHistory);
    localStorage.setItem(
      `taskHistory_${user.id}`,
      JSON.stringify(newTaskHistory)
    );
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col">
      <div className="flex-grow py-24 px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex md:flex-row flex-col justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <FaScroll className="text-4xl text-[#fca311]" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#fca311] to-yellow-500 bg-clip-text text-transparent">
                Adventure Log
              </h1>
            </div>
            <p className="text-white/60 mb-8 md:mb-0">
              Your heroic journey, one quest at a time
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              className={`${
                isSelectionMode
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#fca311] hover:bg-[#fca311]/80"
              } text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-1 md:gap-2 transition-colors text-sm md:text-base`}
            >
              {isSelectionMode ? <FaTimes /> : <FaCheckSquare />}
              {isSelectionMode ? "Cancel Selection" : "Select Tasks"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="bg-[#fca311] hover:bg-[#fca311]/80 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-1 md:gap-2 transition-colors text-sm md:text-base"
            >
              <FaGamepad />
              Go to Task Board
            </motion.button>
          </div>
        </motion.div>

        {/* Selection Mode Actions */}
        {isSelectionMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between bg-[#14213d] p-4 rounded-lg border border-[#fca311]/20"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                {selectedTasks.size === filteredTasks.length ? (
                  <FaCheckSquare className="text-[#fca311]" />
                ) : (
                  <FaSquare className="text-[#fca311]" />
                )}
                Select All
              </button>
              <span className="text-white/60">
                {selectedTasks.size} tasks selected
              </span>
            </div>
            {selectedTasks.size > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaTrash />
                Delete Selected
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-white/60" />
            <input
              type="text"
              placeholder="Search your completed quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#14213d] rounded-lg border border-[#fca311]/20 focus:ring-2 focus:ring-[#fca311] focus:outline-none"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3 text-white/60" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#14213d] rounded-lg border border-[#fca311]/20 focus:ring-2 focus:ring-[#fca311] focus:outline-none appearance-none"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-[#14213d] rounded-lg py-4 pl-6 border ${
                selectedTasks.has(task.id)
                  ? "border-red-500"
                  : "border-[#fca311]/20"
              } hover:bg-[#14213d]/80 transition-all relative w-full`}
            >
              {isSelectionMode && (
                <div className="absolute top-4 md:left-4 left-2">
                  <button
                    onClick={() => toggleTaskSelection(task.id)}
                    className="text-2xl text-[#fca311] hover:text-[#fca311]/80 transition-colors"
                  >
                    {selectedTasks.has(task.id) ? (
                      <FaCheckSquare />
                    ) : (
                      <FaSquare />
                    )}
                  </button>
                </div>
              )}
              {!task.completed && (
                <div className="absolute bottom-6 -right-6 flex items-center gap-2 bg-red-300 px-2 py-1 rounded-t-lg rounded-l-none rotate-[270deg]">
                  <FaExclamationTriangle className="text-red-500" />
                  <span className="text-red-500 text-xs">Failed</span>
                </div>
              )}
              <div className="flex justify-between items-start mb-4 ml-3 md:ml-6 md:mr-4">
                <div className="w-4/5 pr-4">
                  <h3
                    className={`text-xl font-semibold ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex flex-col md:flex-row items-start md:items-center md:gap-4 gap-2 text-white/60 mt-2">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span className="text-sm md:text-base">
                        {formatDate(task.completed_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span className="text-sm md:text-base">
                        Due: {task.dueTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/5 flex flex-col md:flex-row items-center gap-2 justify-between pr-2">
                  <div className="flex items-center gap-2 whitespace-nowrap mr-4">
                    <FaStar className="text-[#fca311]" />
                    <span className="font-bold text-xs md:text-base">
                      {task.points} XP
                    </span>
                  </div>
                  {!isSelectionMode && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSingleDelete(task.id)}
                      className="text-red-500 hover:text-red-600 transition-colors mr-2"
                    >
                      <FaTrash />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Milestones */}
              {task.milestones && task.milestones.length > 0 && (
                <div className="mt-4 space-y-2 ml-8">
                  {task.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center gap-2 text-white/60"
                    >
                      <FaCheck
                        className={`${
                          milestone.completed
                            ? "text-green-500"
                            : "text-white/20"
                        }`}
                      />
                      <span>{milestone.title}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements */}
              {task.achievements && task.achievements.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {task.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-[#fca311]/10 px-3 py-1 rounded-full"
                    >
                      <FaTrophy className="text-[#fca311]" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60">
              No completed quests found. Time to embark on new adventures!
            </p>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#14213d] p-6 rounded-lg border border-red-500/50 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-red-500 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-white/80 mb-6">
                Are you sure you want to delete {selectedTasks.size} selected
                task{selectedTasks.size > 1 ? "s" : ""}? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <FaTrash />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskHistory;
