import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { CalendarIcon, Plus, Sparkles, Target, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface TodoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editTodo?: {
    _id: Id<"todos">;
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    dueDate?: number;
  } | null;
}

const priorityConfig = {
  low: { icon: Target, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
  medium: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30" },
  high: { icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/20", border: "border-rose-500/30" },
};

export function TodoForm({ open, onOpenChange, editTodo }: TodoFormProps) {
  const [title, setTitle] = useState(editTodo?.title || "");
  const [description, setDescription] = useState(editTodo?.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(editTodo?.priority || "medium");
  const [dueDate, setDueDate] = useState(
    editTodo?.dueDate ? new Date(editTodo.dueDate).toISOString().split('T')[0] : ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const createTodo = useMutation(api.todos.createTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const todoData = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
      };

      if (editTodo) {
        await updateTodo({
          id: editTodo._id,
          ...todoData,
        });
        toast.success("Todo updated successfully!");
      } else {
        await createTodo(todoData);
        toast.success("Todo created successfully!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      onOpenChange(false);
    } catch (error) {
      toast.error(editTodo ? "Failed to update todo" : "Failed to create todo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setTitle(editTodo?.title || "");
      setDescription(editTodo?.description || "");
      setPriority(editTodo?.priority || "medium");
      setDueDate(editTodo?.dueDate ? new Date(editTodo.dueDate).toISOString().split('T')[0] : "");
    }
    onOpenChange(newOpen);
  };

  const currentPriority = priorityConfig[priority];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white/10 backdrop-blur-xl border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Plus className="h-5 w-5 text-purple-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {editTodo ? "Edit Todo" : "Create New Todo"}
            </span>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="title" className="text-white/90">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 transition-all backdrop-blur-sm"
            />
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="description" className="text-white/90">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 transition-all backdrop-blur-sm resize-none"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="priority" className="text-white/90">Priority</Label>
              <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-white/20">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="dueDate" className="text-white/90">Due Date</Label>
              <div className="relative">
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white focus:bg-white/20 focus:border-white/40 transition-all backdrop-blur-sm"
                />
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              </div>
            </motion.div>
          </div>

          {/* Priority Preview */}
          <motion.div 
            className="p-4 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${currentPriority.bg} ${currentPriority.border}`}>
                <currentPriority.icon className={`h-5 w-5 ${currentPriority.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-white/70">Priority Level</p>
                <p className="text-white capitalize">{priority}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-3 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                editTodo ? "Update Todo" : "Create Todo"
              )}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
