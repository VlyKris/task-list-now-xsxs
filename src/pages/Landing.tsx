import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, ArrowRight, Zap, Palette, BrainCircuit, Rocket, Coffee, Pizza, Trophy, Brain } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-fuchsia-400/30 transition-all duration-300 group"
    >
      <motion.div
        whileHover={{ rotate: 5 }}
        className="mb-4 inline-block"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-fuchsia-300 transition-colors">
        {title}
      </h3>
      <p className="text-fuchsia-200/80 group-hover:text-fuchsia-200 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_60%)]"></div>
          <motion.div
            className="absolute inset-0"
            animate={{
              transform: [
                "translateX(0%) translateY(0%)",
                "translateX(10%) translateY(-10%)",
                "translateX(-10%) translateY(10%)",
                "translateX(0%) translateY(0%)",
              ],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <div className="absolute h-[50rem] w-[50rem] bg-[radial-gradient(circle,rgba(34,197,94,0.3)_0%,transparent_70%)] -top-1/4 left-1/4"></div>
            <div className="absolute h-[40rem] w-[40rem] bg-[radial-gradient(circle,rgba(16,185,129,0.3)_0%,transparent_70%)] bottom-1/4 right-1/4"></div>
          </motion.div>
        </div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between bg-black/20 backdrop-blur-md rounded-b-2xl border-b border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-7 w-7 text-green-400" />
              <h1 className="text-xl font-bold tracking-tight text-green-gradient">
                TodoFlow
              </h1>
            </div>
            <AuthButton 
              trigger={<Button variant="ghost" className="text-white hover:bg-green-400/10">Sign In</Button>}
              dashboardTrigger={<Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:scale-105 transition-transform">Dashboard</Button>}
            />
          </div>
        </motion.header>

        <main className="container mx-auto px-4 pt-32 pb-16 rounded-lg shadow-[0_0_40px_rgba(255,0,0,0.2)]">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="text-center relative"
          >
            <motion.div
              className="absolute -top-16 -left-16 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
            ></motion.div>
            <motion.div
              className="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, delay: 5 }}
            ></motion.div>
            
            <div className="relative z-10 bg-card/90 backdrop-blur-md p-10 rounded-xl border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                <Sparkles className="h-16 w-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300">
                Flow Through Your Tasks
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-green-200/80 mb-8">
                The ultimate todo app designed for fluidity, focus, and a little bit of fun. Stop managing, start flowing. 
                Because life's too short to have boring to-do lists! 🚀
              </p>
              <AuthButton
                trigger={
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:scale-105 transition-transform px-8 py-6 text-lg">
                    Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
                dashboardTrigger={
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:scale-105 transition-transform px-8 py-6 text-lg">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            className="mt-24"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-fuchsia-400" />}
                title="Blazing Fast"
                description="Engineered for speed, so you never lose your train of thought. Faster than your motivation disappearing on Monday morning! ⚡"
              />
              <FeatureCard
                icon={<Palette className="h-8 w-8 text-fuchsia-400" />}
                title="Fully Customizable"
                description="Make it yours with themes, custom priorities, and flexible views. Because everyone's procrastination style is unique! 🎨"
              />
              <FeatureCard
                icon={<BrainCircuit className="h-8 w-8 text-fuchsia-400" />}
                title="AI-Powered"
                description="Smart suggestions and organization to keep you ahead of your tasks. Even when your brain wants to do anything but work! 🤖"
              />
            </div>
          </motion.section>

          {/* Fun Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            className="mt-24"
          >
            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg"
              >
                <Coffee className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-300">∞</div>
                <div className="text-sm text-green-200/80">Cups of Coffee</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg"
              >
                <Brain className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-300">99%</div>
                <div className="text-sm text-blue-200/80">Brain Power Used</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg"
              >
                <Pizza className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-300">24/7</div>
                <div className="text-sm text-orange-200/80">Pizza Time</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-lg"
              >
                <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-300">100%</div>
                <div className="text-sm text-yellow-200/80">Procrastination Rate</div>
              </motion.div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
            className="mt-24 text-center p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 text-white">Ready to find your flow?</h3>
              <p className="text-fuchsia-200/80 mb-6">
                Join thousands of users who are already more productive and less stressed. 
                Or at least better at pretending to be productive! 😉
              </p>
              <AuthButton
                trigger={
                  <Button size="lg" className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform px-8 py-6 text-lg">
                    Start Your Journey <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                }
                dashboardTrigger={
                  <Button size="lg" className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform px-8 py-6 text-lg">
                    Back to Your Tasks <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}