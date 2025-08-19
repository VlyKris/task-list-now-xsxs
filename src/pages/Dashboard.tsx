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
import { CheckCircle, Filter, Plus, Search } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">TodoFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name || "there"}!
                </p>
              </div>
            </div>
            <UserButton />
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <TodoStats />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => setShowForm(true)} className="shrink-0">
                <Plus className="h-4 w-4 mr-2" />
                Add Todo
              </Button>
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
              // Loading state
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-xl border animate-pulse">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-muted rounded mt-1"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTodos.length === 0 ? (
              // Empty state
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery || filterStatus !== "all" || filterPriority !== "all" 
                    ? "No todos match your filters" 
                    : "No todos yet"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first todo to get started"}
                </p>
                {(!searchQuery && filterStatus === "all" && filterPriority === "all") && (
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Todo
                  </Button>
                )}
              </div>
            ) : (
              // Todo items
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onEdit={handleEdit}
                />
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