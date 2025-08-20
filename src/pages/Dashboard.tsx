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
import { CheckCircle, Filter, Plus, Search, Sparkles, Zap, Star, Coffee, Pizza, Rocket, Brain, Trophy } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";

// Fun loading messages that cycle through
const LOADING_MESSAGES = [
  "Loading your procrastination... I mean, productivity! 🚀",
  "Summoning the task spirits... ✨",
  "Brewing coffee while we wait... ☕",
  "Convincing your brain to focus... 🧠",
  "Loading faster than your motivation... 💨",
  "Almost there, just like your deadlines... ⏰",
  "Loading... but not as slowly as you complete tasks... 🐌",
  "Gathering your scattered thoughts... 🧩",
  "Preparing your daily dose of overwhelm... 📋",
  "Loading your to-do list (the one you'll ignore)... 📝"
];

// Fun empty state messages
const EMPTY_MESSAGES = [
  "Wow, look at you! Either you're super productive or you're avoiding everything... 🤔",
  "Your to-do list is as empty as your motivation on Monday morning... 😴",
  "No todos? That's either impressive or concerning... 🎯",
  "An empty list means you're either done or in denial... 🫣",
  "Zero todos! Are you a productivity wizard or just really good at procrastination? 🧙‍♂️",
  "Nothing to do? Time to invent some problems! 🎭",
  "Empty list detected! Either you're winning at life or avoiding it entirely... 🏆",
  "No tasks here! Are you living the dream or just dreaming? 💭"
];

// Fun filter messages
const getFilterMessage = (status: string, priority: string, search: string) => {
  if (search && status !== "all" && priority !== "all") {
    return "Looking for something specific? You're picky! 🕵️‍♂️";
  }
  if (search) {
    return `Searching for "${search}"... hope it's not your motivation! 🔍`;
  }
  if (status !== "all") {
    return `Filtering by ${status} tasks... because life needs categories! 📊`;
  }
  if (priority !== "all") {
    return `Priority ${priority} only! You're getting fancy! ✨`;
  }
  return "All tasks visible! No hiding from your responsibilities! 👀";
};

export default function Dashboard() {
  const { user } = useAuth();
  const todos = useQuery(api.todos.getTodos);
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Cycle through loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  // Get random empty message
  const getRandomEmptyMessage = () => {
    return EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)];
  };

  return (
    <Protected>
      <div className="min-h-screen relative overflow-hidden">
        {/* Multi-layer gradient background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.2),transparent_50%)]"></div>
          
          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  background: `rgba(250,204,21,${Math.random() * 0.3 + 0.1})`,
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
                className="absolute text-yellow-300/20"
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
                {i % 4 === 0 ? <Star className="h-8 w-8" /> : 
                 i % 4 === 1 ? <Sparkles className="h-8 w-8" /> : 
                 i % 4 === 2 ? <Zap className="h-8 w-8" /> :
                 <Coffee className="h-8 w-8" />}
              </motion.div>
            ))}
          </div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(250,204,21,0.15) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-yellow-200/20 bg-yellow-50/10 backdrop-blur-xl sticky top-0 z-10"
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
                <CheckCircle className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </motion.div>
              </motion.div>
              <div>
                <motion.h1 
                  className="text-2xl font-bold tracking-tight text-yellow-gradient"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  TodoFlow
                </motion.h1>
                <motion.p 
                  className="text-sm text-yellow-200/90 flex items-center gap-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Welcome back, {user?.name || "there"}! ✨
                  {todos && todos.length > 0 && (
                    <span className="ml-2 text-xs">
                      {todos.filter(t => !t.completed).length} tasks waiting to stress you out! 😅
                    </span>
                  )}
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
                  boxShadow: ["0 0 0 rgba(250, 204, 21, 0)", "0 0 20px rgba(250, 204, 21, 0.3)", "0 0 0 rgba(250, 204, 21, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-md"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-yellow-200/70 group-focus-within:text-yellow-300 transition-colors z-10" />
              <Input
                placeholder={searchQuery ? "Still searching..." : "Search todos... (or search for your motivation) 🕵️‍♂️"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-yellow-900/20 border-yellow-300/30 text-yellow-100 placeholder:text-yellow-200/50 focus:bg-yellow-800/30 focus:border-yellow-400/50 transition-all backdrop-blur-sm relative z-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-[140px] bg-yellow-900/20 border-yellow-300/30 text-yellow-100 backdrop-blur-sm hover:bg-yellow-800/30 transition-all hover:scale-105">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-yellow-50/95 backdrop-blur-sm border-yellow-200/30">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending (The Fun Zone) 😅</SelectItem>
                  <SelectItem value="completed">Completed (Victory!) 🎉</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
                <SelectTrigger className="w-[140px] bg-yellow-900/20 border-yellow-300/30 text-yellow-100 backdrop-blur-sm hover:bg-yellow-800/30 transition-all hover:scale-105">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-yellow-50/95 backdrop-blur-sm border-yellow-200/30">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High (Panic Mode) 🚨</SelectItem>
                  <SelectItem value="medium">Medium (Meh) 🤷‍♂️</SelectItem>
                  <SelectItem value="low">Low (Someday Maybe) 🐌</SelectItem>
                </SelectContent>
              </Select>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setShowForm(true)} 
                  className="shrink-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 hover:from-fuchsia-600 hover:via-pink-600 hover:to-purple-600 text-white border-0 shadow-fuchsia hover:shadow-fuchsia-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
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

          {/* Filter Message */}
          {(searchQuery || filterStatus !== "all" || filterPriority !== "all") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-center"
            >
              <p className="text-yellow-200/80 text-sm italic">
                {getFilterMessage(filterStatus, filterPriority, searchQuery)}
              </p>
            </motion.div>
          )}

          {/* Todo List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredTodos === undefined ? (
              // Enhanced Loading state with humor
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-4"
                  >
                    <Coffee className="h-12 w-12 text-yellow-400" />
                  </motion.div>
                  <p className="text-yellow-200/80 text-lg font-medium">
                    {LOADING_MESSAGES[loadingMessageIndex]}
                  </p>
                </motion.div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-yellow-300/20 bg-yellow-900/10 backdrop-blur-sm animate-pulse relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-4 h-4 bg-yellow-300/30 rounded mt-1"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-yellow-300/30 rounded mb-2"></div>
                        <div className="h-3 bg-yellow-300/30 rounded w-2/3"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : filteredTodos.length === 0 ? (
              // Enhanced Empty state with humor
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
                  <CheckCircle className="h-16 w-16 text-yellow-300/70 mx-auto mb-4" />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0"
                  >
                    <Trophy className="h-8 w-8 text-amber-400 mx-auto" />
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-100">
                  {searchQuery || filterStatus !== "all" || filterPriority !== "all" 
                    ? "No todos match your filters" 
                    : getRandomEmptyMessage()}
                </h3>
                <p className="text-yellow-200/80 mb-6">
                  {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                    ? "Try adjusting your search or filters (or lower your standards) 😏"
                    : "Time to create some problems... I mean, tasks! 🎯"}
                </p>
                {(!searchQuery && filterStatus === "all" && filterPriority === "all") && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 text-white border-0 shadow-yellow hover:shadow-yellow-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
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
              // Enhanced Todo items with success message
              <>
                {filteredTodos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                  >
                    <p className="text-yellow-200/80 text-sm">
                      {filteredTodos.length === 1 
                        ? "1 task found! You can do this! 💪" 
                        : `${filteredTodos.length} tasks found! Time to adult! 🎯`}
                    </p>
                  </motion.div>
                )}
                {filteredTodos.map((todo, index) => (
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
                ))}
              </>
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