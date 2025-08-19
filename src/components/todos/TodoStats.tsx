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
      color: "text-yellow-300",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
      gradient: "from-yellow-500/20 to-amber-500/20",
      iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-300",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-orange-300",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      gradient: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      label: "High Priority",
      value: stats.highPriority,
      icon: AlertCircle,
      color: "text-red-300",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      gradient: "from-red-500/20 to-rose-500/20",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
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