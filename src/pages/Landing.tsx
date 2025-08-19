import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, ArrowRight, Zap, Palette, BrainCircuit, Rocket } from "lucide-react";

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
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900 via-pink-900 to-purple-900 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.2),transparent_60%)]"></div>
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
            <div className="absolute h-[50rem] w-[50rem] bg-[radial-gradient(circle,rgba(236,72,153,0.3)_0%,transparent_70%)] -top-1/4 left-1/4"></div>
            <div className="absolute h-[40rem] w-[40rem] bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,transparent_70%)] bottom-1/4 right-1/4"></div>
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
              <CheckCircle className="h-7 w-7 text-fuchsia-400" />
              <h1 className="text-xl font-bold tracking-tight text-fuchsia-gradient">
                TodoFlow
              </h1>
            </div>
            <AuthButton 
              trigger={<Button variant="ghost" className="text-white hover:bg-fuchsia-400/10">Sign In</Button>}
              dashboardTrigger={<Button className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform">Dashboard</Button>}
            />
          </div>
        </motion.header>

        <main className="container mx-auto px-4 pt-32 pb-16">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            className="text-center relative"
          >
            <motion.div
              className="absolute -top-16 -left-16 w-64 h-64 bg-fuchsia-400/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
            ></motion.div>
            <motion.div
              className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, delay: 5 }}
            ></motion.div>
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                <Sparkles className="h-16 w-16 text-fuchsia-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-300 to-purple-300">
                Flow Through Your Tasks
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-fuchsia-200/80 mb-8">
                The ultimate todo app designed for fluidity, focus, and a little bit of fun. Stop managing, start flowing.
              </p>
              <AuthButton
                trigger={
                  <Button size="lg" className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform px-8 py-6 text-lg">
                    Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
                dashboardTrigger={
                  <Button size="lg" className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform px-8 py-6 text-lg">
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
                description="Engineered for speed, so you never lose your train of thought."
              />
              <FeatureCard
                icon={<Palette className="h-8 w-8 text-fuchsia-400" />}
                title="Fully Customizable"
                description="Make it yours with themes, custom priorities, and flexible views."
              />
              <FeatureCard
                icon={<BrainCircuit className="h-8 w-8 text-fuchsia-400" />}
                title="AI-Powered"
                description="Smart suggestions and organization to keep you ahead of your tasks."
              />
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