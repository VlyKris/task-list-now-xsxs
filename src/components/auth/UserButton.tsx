"use client";
/**
 * Contains the user profile, dropdown menu, and logout button
 */

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth"; // Assuming you have an auth hook
import { motion } from "framer-motion"; // Import motion from framer-motion
import { LogOut, User, Settings, Crown, Sparkles } from "lucide-react"; // Import icons
import { useState } from "react"; // Import useState for dialog state
import { useNavigate } from "react-router";

interface UserButtonProps {
  className?: string;
  size?: number; // Add size prop for configurable dimensions
}

export function UserButton({ className, size = 8 }: UserButtonProps) {
  const { isLoading, isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  // Convert size prop to pixel value for inline styles
  const sizeInPixels = size * 4; // Tailwind size-8 = 2rem = 32px (4px × 8)

  // Open confirmation dialog
  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  // Handle confirmed sign out and redirect
  const handleConfirmedSignOut = async () => {
    signOut();
    navigate("/"); // Redirect to index page after sign out
    setShowSignOutConfirm(false);
  };

  // Cancel sign out
  const handleCancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  // Show loading state when authentication is being checked
  if (isLoading) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`inline-flex items-center justify-center relative rounded-full ${className}`}
      >
        <Button
          variant="ghost"
          className="p-0 rounded-full shadow-lg border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          style={{ height: `${sizeInPixels}px`, width: `${sizeInPixels}px` }}
        >
          <Avatar
            style={{ height: `${sizeInPixels}px`, width: `${sizeInPixels}px` }}
          >
            <img
              src="/favicon_crack.png"
              alt="Logo"
              style={{
                height: `${sizeInPixels}px`,
                width: `${sizeInPixels}px`,
              }}
            />
          </Avatar>
        </Button>
      </motion.div>
    );
  }

  if (!user || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center justify-center relative rounded-full ${className}`}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <Button
              variant="ghost"
              className="relative p-0 rounded-full shadow-lg border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              style={{
                height: `${sizeInPixels}px`,
                width: `${sizeInPixels}px`,
              }}
            >
              <Avatar
                style={{
                  height: `${sizeInPixels}px`,
                  width: `${sizeInPixels}px`,
                }}
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{
                    height: `${sizeInPixels}px`,
                    width: `${sizeInPixels}px`,
                  }}
                />
              </Avatar>
              
              {/* Status indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-[9999] bg-white/95 backdrop-blur-sm border-white/20">
          {/* User info section */}
          <div className="px-3 py-3 flex flex-col gap-2 border-b border-white/20 mb-2 pb-3">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              <p className="font-semibold text-sm text-gray-900">{user.name}</p>
              <Sparkles className="h-3 w-3 text-purple-500" />
            </div>
            <p className="text-gray-600 text-xs truncate">
              {user.email}
            </p>
          </div>
          
          {/* Menu items */}
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/50 transition-colors">
            <User className="h-4 w-4 text-blue-500" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-white/50 transition-colors">
            <Settings className="h-4 w-4 text-gray-500" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <div className="border-t border-white/20 my-2" />
          
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={handleSignOutClick}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sign Out Confirmation Dialog */}
      <Dialog open={showSignOutConfirm} onOpenChange={setShowSignOutConfirm}>
        <DialogContent className="sm:max-w-[425px] z-[9999] bg-white/95 backdrop-blur-sm border-white/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Sign Out</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancelSignOut}
              className="bg-white/50 border-white/20 hover:bg-white/70 transition-all"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmedSignOut}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Yes, Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
