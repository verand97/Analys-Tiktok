"use client";

import { TrendingUp, Music, LayoutList, Eye, Activity, ArrowUpRight, Flame, BarChart3, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { ElementType } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: ElementType;
  trend: number;
}

const StatCard = ({ title, value, label, icon: Icon, trend }: StatCardProps) => (
  <motion.div variants={item} className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl transition-all hover:bg-white/[0.04]">
    <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
    
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.05]">
          <Icon className="h-4 w-4 text-zinc-300" />
        </div>
        <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
      </div>
      <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md", trend > 0 ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10")}>
        {trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
        {Math.abs(trend)}%
      </div>
    </div>
    
    <div>
      <div className="text-3xl font-semibold tracking-tight text-white mb-1">{value}</div>
      <p className="text-xs text-zinc-500 font-medium">{label}</p>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  return (
    <motion.div 
      initial="hidden" animate="show" variants={container}
      className="space-y-8"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.05] pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-sm text-zinc-400">Real-time performance metrics and emerging trends.</p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
          <span className="text-zinc-300">Live Sync Active</span>
        </div>
      </motion.div>
      
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Hype Score" value="84.2" label="Avg. across tracked content" icon={Flame} trend={12.5} />
        <StatCard title="New Sounds" value="12" label="Exploding this week" icon={Music} trend={8.2} />
        <StatCard title="Categories" value="3" label="Gaming, Comedy, Tech" icon={LayoutList} trend={-2.4} />
        <StatCard title="Predicted Reach" value="1.2M" label="Estimated total views" icon={Eye} trend={24.5} />
      </motion.div>

      <motion.div variants={container} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-black/20 p-6 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              <h2 className="text-lg font-medium text-zinc-100">Trend Radar Preview</h2>
            </div>
            <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">Open Full Chart &rarr;</button>
          </div>
          
          <div className="h-[280px] w-full rounded-xl border border-white/[0.04] bg-zinc-950/50 flex flex-col items-center justify-center relative overflow-hidden">
             {/* Mock chart area */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-50" />
             <div className="flex flex-col items-center gap-3 relative z-10">
               <Activity className="h-8 w-8 text-zinc-600 animate-pulse" />
               <span className="text-sm font-medium text-zinc-500">Aggregating historical data...</span>
             </div>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="rounded-2xl border border-white/[0.06] bg-black/20 p-6 backdrop-blur-md relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <h2 className="text-lg font-medium text-zinc-100 mb-6">Priority Watchlist</h2>
          
          <div className="space-y-3">
             {[1,2,3,4].map((i) => (
                <div key={i} className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.04] text-zinc-400 group-hover:text-emerald-400 transition-colors">
                      <Hash className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">fyp{i}</div>
                      <div className="text-xs text-zinc-500">1.2B views</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold text-emerald-400">+15%</span>
                    <span className="text-[10px] text-zinc-600">Velocity</span>
                  </div>
                </div>
             ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
