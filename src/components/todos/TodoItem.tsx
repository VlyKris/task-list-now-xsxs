import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { Calendar, Clock, Edit, MoreHorizontal, Trash2, Star, Zap, Target, Coffee, Pizza, Rocket } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: {
    _id: Id<"todos">;
    title: string;
    description?: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    dueDate?: number;
    _creationTime: number;
  };
  onEdit: (todo: any) => void;
}

const priorityColors = {
  low: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  high: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const priorityIcons = {
  low: Target,
  medium: Clock,
  high: Zap,
};

const priorityEmojis = {
  low: "🐌",
  medium: "🤷‍♂️",
  high: "🚨",
};

const priorityDescriptions = {
  low: "Chill vibes only",
  medium: "Meh, whenever",
  high: "PANIC MODE!",
};

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      if (todo.completed) {
        toast.success("Todo uncompleted! Back to the procrastination pile! 😅");
      } else {
        toast.success("Todo completed! You're on fire! 🔥");
          // Add some fun completion messages
          const completionMessages = [
            "Task conquered! 🎯",
            "You did the thing! 🎉",
            "Productivity level: Expert! 🧠",
            "Another one bites the dust! 💪",
            "You're unstoppable! 🚀"
          ];
          const randomMessage = completionMessages[Math.floor(Math.random() * completionMessages.length)];
          setTimeout(() => toast.success(randomMessage), 1000);
      }
    } catch (error) {
      toast.error("Failed to update todo. Maybe try again after coffee? ☕");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
      toast.success("Todo deleted! Out of sight, out of mind! 🗑️");
    } catch (error) {
      toast.error("Failed to delete todo. It's stubborn! 😤");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = todo.dueDate && todo.dueDate < Date.now() && !todo.completed;
  const PriorityIcon = priorityIcons[todo.priority];

  // Get funny overdue message
  const getOverdueMessage = () => {
    const overdueMessages = [
      "• Overdue (Time travel needed!) ⏰",
      "• Overdue (Your future self is disappointed) 😅",
      "• Overdue (Maybe next year?) 📅",
      "• Overdue (Procrastination champion!) 🏆",
      "• Overdue (Better late than never?) 🤷‍♂️"
    ];
    return overdueMessages[Math.floor(Math.random() * overdueMessages.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        scale: 1.02,
        y: -3,
        rotateY: 2,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-500 perspective-1000 ${
        todo.completed 
          ? "bg-white/5 border-white/10 backdrop-blur-sm" 
          : "bg-white/10 border-white/20 hover:border-white/40 hover:bg-white/15 backdrop-blur-sm"
      }`}
    >
      {/* Enhanced animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
      />
      
      {/* Priority indicator line */}
      <motion.div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          todo.priority === 'high' ? 'bg-gradient-to-b from-rose-500 to-pink-500' :
          todo.priority === 'medium' ? 'bg-gradient-to-b from-amber-500 to-orange-500' :
          'bg-gradient-to-b from-emerald-500 to-green-500'
        }`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggle}
              className="mt-1 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=checked]:border-0 relative z-10"
            />
            {todo.completed && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded animate-pulse"
              />
            )}
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <motion.h3 
                className={`font-semibold text-white transition-all ${
                  todo.completed ? "line-through text-white/50" : ""
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {todo.title}
              </motion.h3>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex items-center gap-1"
              >
                <motion.span 
                  className={`px-3 py-1 text-xs rounded-full font-medium border ${priorityColors[todo.priority]} backdrop-blur-sm flex items-center gap-1`}
                  whileHover={{ scale: 1.05 }}
                  title={priorityDescriptions[todo.priority]}
                >
                  <PriorityIcon className="h-3 w-3" />
                  {priorityEmojis[todo.priority]} {todo.priority}
                </motion.span>
              </motion.div>
            </div>
            
            {todo.description && (
              <motion.p 
                className={`text-sm mb-3 transition-all ${
                  todo.completed ? "line-through text-white/40" : "text-white/70"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {todo.description}
              </motion.p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-white/60">
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.8)" }}
                transition={{ duration: 0.2 }}
                title="When you created this task (probably while procrastinating on something else)"
              >
                <Clock className="h-3 w-3" />
                {formatDate(todo._creationTime)}
              </motion.div>
              {todo.dueDate && (
                <motion.div 
                  className={`flex items-center gap-1 ${isOverdue ? "text-rose-400" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="h-3 w-3" />
                  Due {formatDate(todo.dueDate)}
                  {isOverdue && (
                    <motion.span 
                      className="text-rose-400 font-medium flex items-center gap-1"
                      animate={{ 
                        color: ["#f87171", "#ef4444", "#f87171"],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {getOverdueMessage()}
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="h-3 w-3" />
                      </motion.div>
                    </motion.span>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 backdrop-blur-sm relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <MoreHorizontal className="h-4 w-4 relative z-10" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/20">
              <DropdownMenuItem onClick={() => onEdit(todo)} className="cursor-pointer hover:bg-purple-50">
                <Edit className="h-4 w-4 mr-2 text-purple-500" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Completion celebration */}
        {todo.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-2 right-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="h-4 w-4 text-yellow-400" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
