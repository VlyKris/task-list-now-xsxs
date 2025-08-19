import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Star, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-blue-gradient blue-wave-bg">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <CheckCircle className="h-8 w-8 text-blue-600 drop-shadow-lg" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight text-blue-gradient">TodoFlow</span>
        </div>
        <AuthButton 
          trigger={
            <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-blue hover:shadow-blue-lg">
              Get Started Free
            </Button>
          }
        />
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 text-blue-gradient neon-text">
            Organize Your Life
            <br />
            <span className="text-blue-600">Effortlessly</span>
          </h1>
          <p className="text-xl text-blue-800 mb-12 max-w-2xl mx-auto leading-relaxed">
            The most intuitive todo app that adapts to your workflow. 
            Capture ideas, set priorities, and achieve your goals with elegant simplicity.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-blue-lg hover:shadow-blue bg-blue-600 hover:bg-blue-700 text-white">
                  Start Organizing Today
                </Button>
              }
            />
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto"
        >
          <motion.div 
            whileHover={{ y: -10 }}
            className="text-center p-8 rounded-2xl glass-blue border-blue-glow hover:border-blue-400 transition-all duration-300 shadow-blue hover:shadow-blue-lg"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Lightning Fast</h3>
            <p className="text-blue-700 leading-relaxed">
              Add and organize todos in seconds. Our streamlined interface keeps you focused on what matters.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="text-center p-8 rounded-2xl glass-cyan border-blue-glow hover:border-blue-400 transition-all duration-300 shadow-blue hover:shadow-blue-lg"
          >
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{ animationDelay: '1s' }}>
              <Star className="h-8 w-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-cyan-800">Smart Priorities</h3>
            <p className="text-cyan-700 leading-relaxed">
              Set priorities and due dates to stay on top of your most important tasks.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="text-center p-8 rounded-2xl glass-indigo border-blue-glow hover:border-blue-400 transition-all duration-300 shadow-blue hover:shadow-blue-lg"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{ animationDelay: '2s' }}>
              <Clock className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">Real-time Sync</h3>
            <p className="text-indigo-700 leading-relaxed">
              Access your todos anywhere, anytime. Changes sync instantly across all your devices.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-32 p-16 rounded-3xl glass-blue border-blue-glow shadow-blue-lg"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-6 text-blue-gradient">
            Ready to get organized?
          </h2>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their productivity with TodoFlow.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-blue-600 hover:bg-blue-700 shadow-blue hover:shadow-blue-lg">
                  Get Started - It's Free
                </Button>
              }
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-200 mt-20 bg-blue-50/50">
        <div className="container mx-auto px-4 py-8 text-center text-blue-600">
          <p>&copy; 2024 TodoFlow. Built with ❤️ for productivity enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
}