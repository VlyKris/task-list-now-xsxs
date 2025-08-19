// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { TodoForm } from "@/components/todos/TodoForm";
import { TodoItem } from "@/components/todos/TodoItem";
import { TodoStats } from "@/components/todos/TodoStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@/components/auth/UserButton";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { motion } from "framer-motion";
import { CheckCircle, Filter, Plus, Search, Sparkles, Zap, Star } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";

export default function Dashboard() {
  const { user } = useAuth();
  const todos = useQuery(api.todos.getTodos);
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");

  const filteredTodos = todos?.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         todo.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "completed" && todo.completed) ||
                         (filterStatus === "pending" && !todo.completed);
    const matchesPriority = filterPriority === "all" || todo.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleEdit = (todo: any) => {
    setEditTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditTodo(null);
  };

  return (
    <Protected>
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 -z-10">
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.2),transparent_50%)]"></div>
          
          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  background: `rgba(34,197,94,${Math.random() * 0.3 + 0.1})`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * -200 + 100, 0],
                  opacity: [0.1, 0.8, 0.1],
                  scale: [1, Math.random() * 2 + 0.5, 1],
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`icon-${i}`}
                className="absolute text-green-300/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 8 + 12,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              >
                {i % 3 === 0 ? <Star className="h-8 w-8" /> : 
                 i % 3 === 1 ? <Sparkles className="h-8 w-8" /> : 
                 <Zap className="h-8 w-8" />}
              </motion.div>
            ))}
          </div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34,197,94,0.15) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-green-200/20 bg-green-50/10 backdrop-blur-xl sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="relative"
              >
                <CheckCircle className="h-8 w-8 text-green-400 drop-shadow-lg" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                </motion.div>
              </motion.div>
              <div>
                <motion.h1 
                  className="text-2xl font-bold tracking-tight text-green-gradient"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  TodoFlow
                </motion.h1>
                <motion.p 
                  className="text-sm text-green-200/90 flex items-center gap-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Welcome back, {user?.name || "there"}! ✨
                </motion.p>
              </div>
            </div>
            <UserButton />
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <TodoStats />
          </motion.div>

          {/* Enhanced Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative group">
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                  boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 20px rgba(34, 197, 94, 0.3)", "0 0 0 rgba(34, 197, 94, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-md"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-200/70 group-focus-within:text-green-300 transition-colors z-10" />
              <Input
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-green-900/20 border-green-300/30 text-green-100 placeholder:text-green-200/50 focus:bg-green-800/30 focus:border-green-400/50 transition-all backdrop-blur-sm relative z-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-[140px] bg-green-900/20 border-green-300/30 text-green-100 backdrop-blur-sm hover:bg-green-800/30 transition-all hover:scale-105">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-green-50/95 backdrop-blur-sm border-green-200/30">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
                <SelectTrigger className="w-[140px] bg-green-900/20 border-green-300/30 text-green-100 backdrop-blur-sm hover:bg-green-800/30 transition-all hover:scale-105">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-green-50/95 backdrop-blur-sm border-green-200/30">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setShowForm(true)} 
                  className="shrink-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white border-0 shadow-green hover:shadow-green-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <Plus className="h-4 w-4 mr-2 relative z-10" />
                  <span className="relative z-10">Add Todo</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Todo List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredTodos === undefined ? (
              // Enhanced Loading state
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-green-300/20 bg-green-900/10 backdrop-blur-sm animate-pulse relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-4 h-4 bg-green-300/30 rounded mt-1"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-green-300/30 rounded mb-2"></div>
                        <div className="h-3 bg-green-300/30 rounded w-2/3"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : filteredTodos.length === 0 ? (
              // Enhanced Empty state
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <CheckCircle className="h-16 w-16 text-green-300/70 mx-auto mb-4" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0"
                  >
                    <Sparkles className="h-8 w-8 text-emerald-400 mx-auto" />
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-green-100">
                  {searchQuery || filterStatus !== "all" || filterPriority !== "all" 
                    ? "No todos match your filters" 
                    : "No todos yet"}
                </h3>
                <p className="text-green-200/80 mb-6">
                  {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first todo to get started"}
                </p>
                {(!searchQuery && filterStatus === "all" && filterPriority === "all") && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white border-0 shadow-green hover:shadow-green-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <Plus className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">Create Your First Todo</span>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              // Enhanced Todo items
              filteredTodos.map((todo, index) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, x: -20, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    rotateY: 2,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <TodoItem
                    todo={todo}
                    onEdit={handleEdit}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* Todo Form Dialog */}
        <TodoForm
          open={showForm}
          onOpenChange={handleCloseForm}
          editTodo={editTodo}
        />
      </div>
    </Protected>
  );
}