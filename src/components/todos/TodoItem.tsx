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
import { Calendar, Clock, Edit, MoreHorizontal, Trash2, Star } from "lucide-react";
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
  low: "⭐",
  medium: "⭐⭐",
  high: "⭐⭐⭐",
};

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      toast.success(todo.completed ? "Todo marked as pending" : "Todo completed!");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = todo.dueDate && todo.dueDate < Date.now() && !todo.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
        todo.completed 
          ? "bg-white/5 border-white/10 backdrop-blur-sm" 
          : "bg-white/10 border-white/20 hover:border-white/40 hover:bg-white/15 backdrop-blur-sm"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggle}
              className="mt-1 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=checked]:border-0"
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`font-semibold text-white transition-all ${
                todo.completed ? "line-through text-white/50" : ""
              }`}>
                {todo.title}
              </h3>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 text-xs rounded-full font-medium border ${priorityColors[todo.priority]} backdrop-blur-sm`}
              >
                {priorityIcons[todo.priority]} {todo.priority}
              </motion.span>
            </div>
            
            {todo.description && (
              <p className={`text-sm mb-3 transition-all ${
                todo.completed ? "line-through text-white/40" : "text-white/70"
              }`}>
                {todo.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-white/60">
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="h-3 w-3" />
                {formatDate(todo._creationTime)}
              </motion.div>
              {todo.dueDate && (
                <motion.div 
                  className={`flex items-center gap-1 ${isOverdue ? "text-rose-400" : ""}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="h-3 w-3" />
                  Due {formatDate(todo.dueDate)}
                  {isOverdue && (
                    <motion.span 
                      className="text-rose-400 font-medium"
                      animate={{ 
                        color: ["#f87171", "#ef4444", "#f87171"],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      • Overdue
                    </motion.span>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 backdrop-blur-sm"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/20">
              <DropdownMenuItem onClick={() => onEdit(todo)} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
