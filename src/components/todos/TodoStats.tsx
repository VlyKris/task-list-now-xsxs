import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Clock, Target, TrendingUp } from "lucide-react";
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
      value: stats.total,
      icon: Target,
      color: "text-blue-300",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-emerald-300",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30",
      gradient: "from-emerald-500/20 to-green-500/20",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-300",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      label: "High Priority",
      value: stats.highPriority,
      icon: AlertCircle,
      color: "text-rose-300",
      bgColor: "bg-rose-500/20",
      borderColor: "border-rose-500/30",
      gradient: "from-rose-500/20 to-pink-500/20",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
    },
  ];

  return (
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
                  <p className="text-sm font-medium text-white/70 mb-1">
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
  );
}
