import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sun, Zap, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-yellow-gradient yellow-wave-bg text-black">
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
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <Sun className="h-8 w-8 text-yellow-500 drop-shadow-lg" />
          </motion.div>
          <span className="text-2xl font-bold tracking-tight text-yellow-gradient">TodoFlow</span>
        </div>
        <AuthButton 
          trigger={
            <Button size="lg" className="rounded-full bg-yellow-500 hover:bg-yellow-600 shadow-yellow hover:shadow-yellow-lg text-black">
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
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 text-yellow-gradient neon-text-yellow">
            Brighten Your Day
            <br />
            <span className="text-yellow-600">Organize with Sunshine</span>
          </h1>
          <p className="text-xl text-yellow-800 mb-12 max-w-2xl mx-auto leading-relaxed">
            A cheerful and simple todo app to bring a little sunshine to your productivity.
            Plan your day and achieve your goals with a smile.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-yellow-lg hover:shadow-yellow bg-yellow-500 hover:bg-yellow-600 text-black">
                  Start Shining
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
            className="text-center p-8 rounded-2xl glass-yellow border-yellow-glow hover:border-yellow-400 transition-all duration-300 shadow-yellow hover:shadow-yellow-lg"
          >
            <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-800">Quick & Easy</h3>
            <p className="text-yellow-700 leading-relaxed">
              Quickly add and organize your tasks so you can focus on getting things done.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="text-center p-8 rounded-2xl glass-amber border-yellow-glow hover:border-yellow-400 transition-all duration-300 shadow-yellow hover:shadow-yellow-lg"
          >
            <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{ animationDelay: '1s' }}>
              <Star className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-amber-800">Prioritize Your Day</h3>
            <p className="text-amber-700 leading-relaxed">
              Set priorities to focus on what's most important and stay on track.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="text-center p-8 rounded-2xl glass-orange border-yellow-glow hover:border-yellow-400 transition-all duration-300 shadow-yellow hover:shadow-yellow-lg"
          >
            <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float" style={{ animationDelay: '2s' }}>
              <Sun className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-orange-800">Sync Everywhere</h3>
            <p className="text-orange-700 leading-relaxed">
              Access your tasks from any device, anytime. Everything is always in sync.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-32 p-16 rounded-3xl glass-yellow border-yellow-glow shadow-yellow-lg"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-6 text-yellow-gradient">
            Ready to Brighten Your Productivity?
          </h2>
          <p className="text-xl text-yellow-800 mb-8 max-w-2xl mx-auto">
            Join others in using TodoFlow to bring a little sunshine to their daily tasks.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-yellow-500 hover:bg-yellow-600 shadow-yellow hover:shadow-yellow-lg text-black">
                  Start for Free
                </Button>
              }
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-yellow-200 mt-20 bg-yellow-100/50">
        <div className="container mx-auto px-4 py-8 text-center text-yellow-700">
          <p>&copy; 2024 TodoFlow. Made with ☀️ to brighten your day.</p>
        </div>
      </footer>
    </div>
  );
}