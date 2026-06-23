"use client";

import { motion, Variants } from "framer-motion";
import { Activity, Zap, BarChart3, TrendingUp, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-charcoal text-foreground overflow-hidden font-sans selection:bg-neon-purple/30">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lime-green/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeIn} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-lime-green p-[2px]">
            <div className="w-full h-full bg-charcoal rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-lime-green" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ViralPulse</span>
        </motion.div>
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeIn} className="flex gap-4">
          <Link href="/login" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 text-sm font-semibold bg-white text-charcoal rounded-full hover:bg-lime-green transition-all shadow-[0_0_20px_rgba(128,255,86,0.2)] hover:shadow-[0_0_30px_rgba(128,255,86,0.4)]">
            Open Dashboard
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        
        <motion.div 
          custom={2} initial="hidden" animate="visible" variants={fadeIn}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-sm font-medium mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
          </span>
          Next-Gen TikTok Analytics AI
        </motion.div>

        <motion.h1 
          custom={3} initial="hidden" animate="visible" variants={fadeIn}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 mb-6 max-w-4xl"
          style={{ lineHeight: 1.1 }}
        >
          Predict Viral Trends <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-lime-green">Before They Happen.</span>
        </motion.h1>

        <motion.p 
          custom={4} initial="hidden" animate="visible" variants={fadeIn}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
        >
          Stop guessing. Use real-time data scraping, historical growth tracking, and predictive AI to discover exploding hashtags and sounds on TikTok.
        </motion.p>

        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/dashboard" className="px-8 py-4 bg-neon-purple hover:bg-[#6e46e5] text-white rounded-full font-bold text-lg transition-all flex items-center gap-2 shadow-[0_0_40px_rgba(127,86,255,0.4)] hover:shadow-[0_0_60px_rgba(127,86,255,0.6)] hover:-translate-y-1">
            Start Analyzing Now <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 bg-charcoal-light border border-border hover:border-white/20 text-white rounded-full font-medium text-lg transition-all flex items-center gap-2 hover:-translate-y-1">
            <PlayCircle className="w-5 h-5 text-lime-green" /> See how it works
          </button>
        </motion.div>

        {/* Dashboard Preview / Mockup */}
        <motion.div 
          custom={6} initial="hidden" animate="visible" variants={fadeIn}
          className="mt-24 w-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />
          <div className="rounded-2xl border border-white/10 bg-charcoal-light/50 backdrop-blur-xl p-4 md:p-6 shadow-2xl relative overflow-hidden group">
            
            {/* Aesthetic UI elements mimicking the dashboard */}
            <div className="flex gap-4 mb-8">
              <div className="h-3 w-3 rounded-full bg-danger"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-lime-green"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div className="h-48 rounded-xl bg-gradient-to-r from-neon-purple/20 to-transparent border border-neon-purple/20 flex items-end p-6 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                   <motion.div 
                     initial={{ width: "0%" }}
                     whileInView={{ width: "100%" }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                     className="absolute bottom-0 left-0 h-1 bg-neon-purple shadow-[0_0_20px_#7F56FF]"
                   />
                   <div>
                     <h3 className="text-2xl font-bold text-white mb-1">#viral2026</h3>
                     <p className="text-lime-green font-medium">+245% Projected Growth</p>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-xl bg-charcoal border border-white/5 p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
                     <Zap className="text-lime-green w-6 h-6" />
                     <div>
                       <p className="text-sm text-muted-foreground">Hype Score</p>
                       <p className="text-2xl font-bold text-white">94/100</p>
                     </div>
                  </div>
                  <div className="h-32 rounded-xl bg-charcoal border border-white/5 p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
                     <TrendingUp className="text-neon-purple w-6 h-6" />
                     <div>
                       <p className="text-sm text-muted-foreground">Velocity</p>
                       <p className="text-2xl font-bold text-white">Extremely High</p>
                     </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-12 rounded-lg bg-charcoal border border-white/5 flex items-center px-4 justify-between group-hover:border-lime-green/30 transition-colors">
                   <span className="text-sm text-white font-medium">Original Sound - User1</span>
                   <span className="text-xs bg-lime-green/20 text-lime-green px-2 py-1 rounded">Rising</span>
                </div>
                <div className="h-12 rounded-lg bg-charcoal border border-white/5 flex items-center px-4 justify-between group-hover:border-lime-green/30 transition-colors delay-75">
                   <span className="text-sm text-white font-medium">Dance Beat 2026</span>
                   <span className="text-xs bg-lime-green/20 text-lime-green px-2 py-1 rounded">Rising</span>
                </div>
                <div className="h-12 rounded-lg bg-charcoal border border-white/5 flex items-center px-4 justify-between group-hover:border-lime-green/30 transition-colors delay-150">
                   <span className="text-sm text-white font-medium">Funny BGM</span>
                   <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">Stable</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Feature Section Bento Box */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to go viral.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our dashboard provides actionable insights rather than just raw numbers.</p>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeIn} className="col-span-1 md:col-span-2 bg-charcoal-light rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl group-hover:bg-neon-purple/20 transition-all duration-500" />
            <BarChart3 className="w-10 h-10 text-neon-purple mb-6" />
            <h3 className="text-2xl font-bold mb-3">Real-time Trend Radar</h3>
            <p className="text-muted-foreground max-w-md">Monitor the exact growth curve of hashtags and sounds. Spot the inflection point where a trend begins to explode before everyone else jumps on it.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-charcoal-light rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-lime-green/10 rounded-full blur-3xl group-hover:bg-lime-green/20 transition-all duration-500" />
            <Zap className="w-10 h-10 text-lime-green mb-6" />
            <h3 className="text-2xl font-bold mb-3">Hype Score Predictor</h3>
            <p className="text-muted-foreground">Our proprietary algorithm calculates a 0-100 score on how likely your draft is to hit the FYP based on current metadata trends.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-charcoal-light rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
            <Activity className="w-10 h-10 text-white mb-6" />
            <h3 className="text-2xl font-bold mb-3">Competitor Benchmarking</h3>
            <p className="text-muted-foreground">Track rival accounts silently. See their posting velocity, average views, and steal their best performing strategies.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="col-span-1 md:col-span-2 bg-gradient-to-r from-neon-purple/20 to-charcoal-light rounded-3xl p-8 border border-neon-purple/30 hover:border-neon-purple/50 transition-colors flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3 text-white">Stop Posting Blindly.</h3>
            <p className="text-neon-purple/80 mb-6 max-w-md font-medium">Join thousands of creators maximizing their reach with data-driven posting schedules.</p>
            <div>
              <Link href="/dashboard" className="px-6 py-3 bg-white text-charcoal rounded-full font-bold text-sm hover:bg-lime-green transition-colors inline-block">
                Enter Dashboard
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-12 text-center text-muted-foreground relative z-10">
        <p className="mb-2">© 2026 ViralPulse. All rights reserved.</p>
        <p className="text-xs max-w-md mx-auto opacity-50">Not affiliated with TikTok or ByteDance. Use responsibly.</p>
      </footer>
    </div>
  );
}
