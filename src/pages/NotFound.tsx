// TODO: THIS IS THE LANDING PAGE THAT THE USER WILL ALWAYS FIRST SEE.
// Make sure that the marketing text always reflects the app marketing. create an aesthetic properly-designed landing page that fits the theme of the app
// start completely from scratch to make this landing page using aesthetic design principles and tailwind styling to create a unique and thematic landing page.

import { motion } from "framer-motion";
import { Loader, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-gradient green-wave-bg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative mb-8"
        >
          <div className="text-9xl font-bold text-green-600/20 mb-4">404</div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Loader className="h-16 w-16 text-green-400 animate-spin" />
          </motion.div>
        </motion.div>

        <h1 className="text-4xl font-bold mb-6 text-green-gradient">
          Oops! Page Not Found
        </h1>
        
        <p className="text-xl text-green-700 mb-8 leading-relaxed">
          The page you're looking for seems to have wandered off into the digital void. 
          Don't worry, let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-700 shadow-green hover:shadow-green-lg px-8 py-3"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 px-8 py-3"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 p-6 rounded-2xl glass-green border-green-glow"
        >
          <p className="text-green-600 text-sm">
            While you're here, why not check out our amazing todo app? 
            It's the perfect way to stay organized and productive! ✨
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
