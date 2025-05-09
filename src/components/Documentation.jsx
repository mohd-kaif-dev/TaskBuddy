import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaGamepad,
  FaTrophy,
  FaBolt,
  FaStar,
  FaCalendarAlt,
  FaUsers,
  FaFlag,
  FaMoon,
  FaFire,
  FaGem,
  FaMedal,
  FaCrown,
  FaChevronRight,
  FaChevronDown,
  FaPlus,
  FaCheck,
  FaClock,
  FaTag,
  FaShare,
  FaBell,
  FaChartLine,
  FaPalette,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { GiLevelThree } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Documentation = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("getting-started");
  const [showExample, setShowExample] = useState(null);
  const { isSignedIn } = useUser();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <FaGamepad className="text-[#fca311] text-2xl" />,
      content: [
        {
          title: "Welcome to TaskBuddy",
          description:
            "Transform your productivity into an exciting adventure!",
          points: [
            "Create tasks and break them into milestones",
            "Earn points and level up as you complete tasks",
            "Unlock badges and rewards for your achievements",
            "Track your progress and maintain streaks",
          ],
        },
        {
          title: "Quick Start Guide",
          description: "Get started in minutes",
          steps: [
            {
              title: "Create Your First Task",
              content: "Click the 'Add Task' button to create your first task",
              example: {
                type: "task",
                data: {
                  title: "Complete Project Presentation",
                  points: 100,
                  dueTime: "2:00 PM",
                  milestones: [
                    "Create outline",
                    "Design slides",
                    "Add content",
                  ],
                },
              },
            },
            {
              title: "Add Milestones",
              content: "Break down complex tasks into manageable milestones",
              example: {
                type: "milestone",
                data: {
                  taskTitle: "Study for Math Exam",
                  milestones: [
                    "Review Chapter 1",
                    "Practice problems",
                    "Take practice test",
                  ],
                },
              },
            },
            {
              title: "Track Progress",
              content: "Monitor your achievements and level up",
              example: {
                type: "progress",
                data: {
                  level: 5,
                  xp: 750,
                  badges: ["Early Bird", "Streak Master"],
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: "task-management",
      title: "Task Management",
      icon: <FaCalendarAlt className="text-[#fca311] text-2xl" />,
      content: [
        {
          title: "Creating Tasks",
          description: "Learn different ways to create and manage tasks",
          methods: [
            {
              title: "Basic Task",
              description: "Simple task with title and due time",
              example: {
                type: "task",
                data: {
                  title: "Read Research Paper",
                  points: 80,
                  dueTime: "6:00 PM",
                },
              },
            },
            {
              title: "Task with Milestones",
              description: "Break down complex tasks into milestones",
              example: {
                type: "task",
                data: {
                  title: "Complete Project Presentation",
                  points: 100,
                  dueTime: "2:00 PM",
                  milestones: [
                    "Create outline",
                    "Design slides",
                    "Add content",
                  ],
                },
              },
            },
            {
              title: "Shared Task",
              description: "Collaborate with team members",
              example: {
                type: "task",
                data: {
                  title: "Team Meeting",
                  points: 150,
                  dueTime: "3:00 PM",
                  shared: true,
                  collaborators: ["John", "Sarah", "Mike"],
                },
              },
            },
          ],
        },
        {
          title: "Task Priorities",
          description: "Understand different priority levels and their impact",
          priorities: [
            {
              level: "Low",
              points: 50,
              icon: <FaTag className="text-gray-400" />,
              description: "Basic tasks with minimal impact",
            },
            {
              level: "Medium",
              points: 100,
              icon: <FaTag className="text-blue-400" />,
              description: "Standard tasks with moderate importance",
            },
            {
              level: "High",
              points: 150,
              icon: <FaTag className="text-red-400" />,
              description: "Critical tasks requiring immediate attention",
            },
          ],
        },
      ],
    },
    {
      id: "achievements",
      title: "Achievements & Rewards",
      icon: <FaTrophy className="text-[#fca311] text-2xl" />,
      content: [
        {
          title: "Badges",
          description: "Earn badges for different achievements",
          badges: [
            {
              title: "Early Bird",
              icon: <FaStar className="text-yellow-400" />,
              requirement: "Complete 3 tasks before 10 AM",
            },
            {
              title: "Night Owl",
              icon: <FaMoon className="text-indigo-400" />,
              requirement: "Complete 5 tasks after 8 PM",
            },
            {
              title: "Weekend Warrior",
              icon: <FaCalendarAlt className="text-green-400" />,
              requirement: "Complete 10 tasks on weekends",
            },
            {
              title: "Priority Master",
              icon: <FaFlag className="text-red-400" />,
              requirement: "Complete 20 high-priority tasks",
            },
            {
              title: "Team Player",
              icon: <FaUsers className="text-blue-400" />,
              requirement: "Complete 15 tasks with shared milestones",
            },
            {
              title: "Consistency King",
              icon: <FaCrown className="text-yellow-400" />,
              requirement: "Complete tasks for 30 consecutive days",
            },
          ],
        },
        {
          title: "Level Rewards",
          description: "Unlock special features as you level up",
          rewards: [
            {
              level: 5,
              title: "Custom Theme",
              icon: <FaPalette className="text-purple-400" />,
              description: "Unlock custom theme colors",
            },
            {
              level: 10,
              title: "Advanced Analytics",
              icon: <FaChartLine className="text-blue-400" />,
              description: "Access detailed progress tracking",
            },
            {
              level: 15,
              title: "Premium Badges",
              icon: <FaCrown className="text-yellow-400" />,
              description: "Earn exclusive badges",
            },
          ],
        },
      ],
    },
    {
      id: "pro-tips",
      title: "Pro Tips & Strategies",
      icon: <FaBolt className="text-[#fca311] text-2xl" />,
      content: [
        {
          title: "Maximizing Points",
          description: "Strategies to earn more points and level up faster",
          tips: [
            {
              title: "Complete Tasks Early",
              description:
                "Get bonus points for completing tasks before their due time",
              icon: <FaClock className="text-green-400" />,
            },
            {
              title: "Maintain Streaks",
              description: "Keep your daily streak going for point multipliers",
              icon: <FaFire className="text-red-400" />,
            },
            {
              title: "Break Down Tasks",
              description: "Create milestones for additional points",
              icon: <FaGem className="text-purple-400" />,
            },
          ],
        },
        {
          title: "Advanced Features",
          description: "Make the most of TaskBuddy's features",
          features: [
            {
              title: "Task Templates",
              description:
                "Create reusable task templates for common activities",
              icon: <FaPlus className="text-blue-400" />,
            },
            {
              title: "Shared Milestones",
              description: "Collaborate with team members on complex tasks",
              icon: <FaShare className="text-green-400" />,
            },
            {
              title: "Reminders",
              description: "Set up notifications for important tasks",
              icon: <FaBell className="text-yellow-400" />,
            },
          ],
        },
      ],
    },
  ];

  const renderExample = (example) => {
    if (!example) return null;

    switch (example.type) {
      case "task":
        return (
          <div className="bg-black/20 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{example.data.title}</h4>
              <div className="flex items-center gap-2">
                <FaClock className="text-white/60" />
                <span className="text-sm text-white/60">
                  {example.data.dueTime}
                </span>
                <span className="text-sm text-[#fca311]">
                  +{example.data.points} pts
                </span>
              </div>
            </div>
            {example.data.milestones && (
              <div className="mt-3 pl-4 border-l-2 border-white/10 space-y-2">
                {example.data.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <FaCheck className="text-white/20" />
                    <span>{milestone}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "milestone":
        return (
          <div className="bg-black/20 rounded-lg p-4 mt-4">
            <h4 className="font-medium">{example.data.taskTitle}</h4>
            <div className="mt-3 pl-4 border-l-2 border-white/10 space-y-2">
              {example.data.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <FaCheck className="text-white/20" />
                  <span>{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "progress":
        return (
          <div className="bg-black/20 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl">
                <GiLevelThree className="text-[#fca311]" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  Level {example.data.level}
                </div>
                <div className="text-sm text-white/60">
                  {example.data.xp} XP
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {example.data.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-[#fca311]/10 px-2 py-1 rounded-full"
                >
                  <FaMedal className="text-[#fca311]" />
                  <span className="text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white py-24 px-8 ">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex md:flex-row flex-col justify-between items-start md:items-center"
      >
        <div>
          <div className="flex items-center gap-4 mb-6">
            <FaBook className="text-4xl text-[#fca311]" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#fca311] to-yellow-500 bg-clip-text text-transparent">
              TaskBuddy Documentation
            </h1>
          </div>
          <p className="text-white/60 mb-8 md:mb-0">
            Your comprehensive guide to mastering TaskBuddy
          </p>
        </div>
        {isSignedIn && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="bg-[#fca311] hover:bg-[#fca311]/80 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaGamepad />
            Go to Dashboard
          </motion.button>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20 sticky top-24">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-[#fca311] text-black"
                      : "text-white/60 hover:text-white hover:bg-black/20"
                  }`}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: activeSection === section.id ? 1 : 0,
                x: activeSection === section.id ? 0 : 20,
              }}
              className={`${
                activeSection === section.id ? "block" : "hidden"
              } space-y-8`}
            >
              {section.content.map((content, index) => (
                <div
                  key={index}
                  className="bg-[#14213d] rounded-xl p-6 shadow-lg border border-[#fca311]/20"
                >
                  <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
                  <p className="text-white/60 mb-6">{content.description}</p>

                  {/* Points List */}
                  {content.points && (
                    <ul className="space-y-3">
                      {content.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-white/80"
                        >
                          <FaStar className="text-[#fca311] mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Steps */}
                  {content.steps && (
                    <div className="space-y-6">
                      {content.steps.map((step, idx) => (
                        <div key={idx} className="space-y-3">
                          <h3 className="text-lg font-semibold">
                            {idx + 1}. {step.title}
                          </h3>
                          <p className="text-white/60">{step.content}</p>
                          {step.example && renderExample(step.example)}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Methods */}
                  {content.methods && (
                    <div className="space-y-6">
                      {content.methods.map((method, idx) => (
                        <div key={idx} className="space-y-3">
                          <h3 className="text-lg font-semibold">
                            {method.title}
                          </h3>
                          <p className="text-white/60">{method.description}</p>
                          {method.example && renderExample(method.example)}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Priorities */}
                  {content.priorities && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.priorities.map((priority, idx) => (
                        <div
                          key={idx}
                          className="bg-black/20 rounded-lg p-4 text-center"
                        >
                          <div className="text-2xl mb-2">{priority.icon}</div>
                          <h3 className="font-semibold">{priority.level}</h3>
                          <div className="text-[#fca311] font-bold">
                            {priority.points} pts
                          </div>
                          <p className="text-sm text-white/60 mt-2">
                            {priority.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Badges */}
                  {content.badges && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.badges.map((badge, idx) => (
                        <div
                          key={idx}
                          className="bg-black/20 rounded-lg p-4 flex items-start gap-3"
                        >
                          <div className="text-2xl">{badge.icon}</div>
                          <div>
                            <h3 className="font-semibold">{badge.title}</h3>
                            <p className="text-sm text-white/60">
                              {badge.requirement}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Rewards */}
                  {content.rewards && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.rewards.map((reward, idx) => (
                        <div
                          key={idx}
                          className="bg-black/20 rounded-lg p-4 text-center"
                        >
                          <div className="text-2xl mb-2">{reward.icon}</div>
                          <h3 className="font-semibold">{reward.title}</h3>
                          <div className="text-[#fca311] font-bold">
                            Level {reward.level}
                          </div>
                          <p className="text-sm text-white/60 mt-2">
                            {reward.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tips */}
                  {content.tips && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.tips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="bg-black/20 rounded-lg p-4 flex items-start gap-3"
                        >
                          <div className="text-2xl">{tip.icon}</div>
                          <div>
                            <h3 className="font-semibold">{tip.title}</h3>
                            <p className="text-sm text-white/60">
                              {tip.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  {content.features && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="bg-black/20 rounded-lg p-4 flex items-start gap-3"
                        >
                          <div className="text-2xl">{feature.icon}</div>
                          <div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-sm text-white/60">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
