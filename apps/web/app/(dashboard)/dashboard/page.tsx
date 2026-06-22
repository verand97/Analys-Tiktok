"use client";

import { TrendingUp, Music, LayoutList, Eye, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ElementType } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: ElementType;
  trend: number;
}

const StatCard = ({ title, value, label, icon: Icon, trend }: StatCardProps) => (
  <motion.div variants={item} className="bg-charcoal-light border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-neon-purple/50 transition-colors shadow-lg">
    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-neon-purple/15 transition-colors duration-500" />
    
    <div className="flex items-start justify-between mb-4 relative z-10">
      <div className="p-3 bg-charcoal rounded-lg border border-white/5 shadow-inner">
        <Icon className="w-5 h-5 text-neon-purple" />
      </div>
      <div className={cn("px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm", trend > 0 ? "bg-lime-green/10 text-lime-green border border-lime-green/20" : "bg-danger/10 text-danger border border-danger/20")}>
        {trend > 0 ? "+" : ""}{trend}%
      </div>
    </div>
    
    <div className="relative z-10">
      <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold tracking-tight text-white mb-1">{value}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  return (
    <motion.div 
      initial="hidden" animate="show" variants={container}
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Welcome back, Creator</h1>
        <p className="text-muted-foreground">Here&apos;s your TikTok performance and current trends.</p>
      </motion.div>
      
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Avg Hype Score" value="84" label="Your tracked content" icon={TrendingUp} trend={12.5} />
        <StatCard title="Trending Sounds" value="12" label="New sounds this week" icon={Music} trend={8.2} />
        <StatCard title="Hot Categories" value="3" label="Gaming, Comedy, Tech" icon={LayoutList} trend={-2.4} />
        <StatCard title="Total Views Predicted" value="1.2M" label="Based on current trends" icon={Eye} trend={24.5} />
      </motion.div>

      <motion.div variants={container} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 bg-charcoal-light border border-white/5 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-xl font-semibold text-white">Trend Radar Preview</h2>
            <button className="text-sm text-neon-purple font-medium hover:text-white transition-colors">View Full Radar</button>
          </div>
          <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-charcoal/30 relative z-10">
             <Activity className="w-8 h-8 text-muted-foreground mb-3 opacity-50 animate-pulse" />
             <span className="text-muted-foreground font-medium">Chart Loading...</span>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="bg-charcoal-light border border-white/5 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-green/5 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-xl font-semibold mb-6 text-white relative z-10">Your Watchlist</h2>
          <div className="space-y-4 relative z-10">
             {[1,2,3,4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-charcoal/50 hover:bg-charcoal hover:border-neon-purple/30 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center text-neon-purple font-bold group-hover:scale-110 transition-transform">#</div>
                  <div>
                    <div className="font-medium text-white">#fyp{i}</div>
                    <div className="text-xs text-muted-foreground">1.2B views</div>
                  </div>
                  <div className="ml-auto text-lime-green text-sm font-bold bg-lime-green/10 px-2 py-1 rounded-md">+15%</div>
                </div>
             ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
