import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Clock, Target, TrendingUp, Coffee, Pizza, Trophy, Brain } from "lucide-react";
import { useQuery } from "convex/react";

export function TodoStats() {
  const stats = useQuery(api.todos.getTodoStats);

  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="animate-pulse bg-white/5 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-8 bg-white/20 rounded"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      label: "Total Tasks",
      description: "All the things you promised to do",
      value: stats.total,
      icon: Target,
      color: "text-purple-300",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      gradient: "from-purple-500/20 to-violet-500/20",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
      funnyLabel: stats.total === 0 ? "Zero Tasks (Living the dream!)" : 
                  stats.total === 1 ? "1 Task (You can do this!)" :
                  stats.total < 5 ? `${stats.total} Tasks (Manageable!)` :
                  stats.total < 10 ? `${stats.total} Tasks (Getting busy!)` :
                  `${stats.total} Tasks (You're ambitious!)`,
    },
    {
      label: "Completed",
      description: "Tasks you actually finished",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-300",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
      funnyLabel: stats.completed === 0 ? "0 Done (Starting fresh!)" :
                  stats.completed === 1 ? "1 Done (Baby steps!)" :
                  stats.completed < stats.total * 0.3 ? `${stats.completed} Done (Getting there!)` :
                  stats.completed < stats.total * 0.7 ? `${stats.completed} Done (Halfway hero!)` :
                  `${stats.completed} Done (Crushing it!)`,
    },
    {
      label: "Pending",
      description: "Tasks you're avoiding",
      value: stats.pending,
      icon: Clock,
      color: "text-orange-300",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      gradient: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      funnyLabel: stats.pending === 0 ? "0 Pending (All caught up!)" :
                  stats.pending === 1 ? "1 Pending (Almost there!)" :
                  stats.pending < 5 ? `${stats.pending} Pending (Keep going!)` :
                  `${stats.pending} Pending (Procrastination level: Expert!)`,
    },
    {
      label: "High Priority",
      description: "Tasks that stress you out",
      value: stats.highPriority,
      icon: AlertCircle,
      color: "text-red-300",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      gradient: "from-red-500/20 to-rose-500/20",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
      funnyLabel: stats.highPriority === 0 ? "0 High Priority (Chill vibes!)" :
                  stats.highPriority === 1 ? "1 High Priority (One fire to put out!)" :
                  stats.highPriority < 3 ? `${stats.highPriority} High Priority (Manageable chaos!)` :
                  `${stats.highPriority} High Priority (Panic mode activated!)`,
    },
  ];

  // Get overall productivity message
  const getProductivityMessage = () => {
    if (stats.total === 0) return "No tasks, no stress! 🎉";
    const completionRate = (stats.completed / stats.total) * 100;
    if (completionRate === 100) return "100% Complete! You're unstoppable! 🚀";
    if (completionRate >= 80) return "80%+ Done! You're on fire! 🔥";
    if (completionRate >= 50) return "Halfway there! Keep pushing! 💪";
    if (completionRate >= 20) return "Making progress! Every step counts! 🐌";
    return "Getting started is the hardest part! 🌱";
  };

  return (
    <div className="space-y-4">
      {/* Productivity Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-yellow-200/80 text-sm italic">
          {getProductivityMessage()}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="relative overflow-hidden border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl`} />
              
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70 mb-1" title={item.description}>
                      {item.label}
                    </p>
                    <motion.p 
                      className="text-3xl font-bold text-white"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    >
                      {item.value}
                    </motion.p>
                    <p className="text-xs text-white/60 mt-1 italic">
                      {item.funnyLabel}
                    </p>
                  </div>
                  <motion.div 
                    className={`p-3 rounded-xl ${item.iconBg} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
                
                {/* Progress bar for completed tasks */}
                {item.label === "Completed" && stats.total > 0 && (
                  <motion.div 
                    className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.completed / stats.total) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.8, duration: 1 }}
                    />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}