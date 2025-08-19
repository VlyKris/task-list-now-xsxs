import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Star, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">TodoFlow</span>
        </div>
        <AuthButton 
          trigger={
            <Button size="lg" className="rounded-full">
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
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Organize Your Life
            <br />
            <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            The most intuitive todo app that adapts to your workflow. 
            Capture ideas, set priorities, and achieve your goals with elegant simplicity.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg">
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
          <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Add and organize todos in seconds. Our streamlined interface keeps you focused on what matters.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Priorities</h3>
            <p className="text-muted-foreground leading-relaxed">
              Set priorities and due dates to stay on top of your most important tasks.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-time Sync</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access your todos anywhere, anytime. Changes sync instantly across all your devices.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-32 p-16 rounded-3xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Ready to get organized?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their productivity with TodoFlow.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AuthButton 
              trigger={
                <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                  Get Started - It's Free
                </Button>
              }
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 TodoFlow. Built with ❤️ for productivity enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
}