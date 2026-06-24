"use client";

import { TrendingUp, Music, LayoutList, Eye, Activity, ArrowUpRight, Flame, BarChart3, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { ElementType, useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TrendingHashtag {
  id: string;
  tag: string;
  latestViews: number;
  growth: string | number;
  history: { name: string; views: number }[];
}

interface TrendingSound {
  id: string;
  title: string;
  usageCount: number;
}

interface TrendingCategory {
  id: number | string;
  name: string;
}

interface DashboardData {
  data: TrendingHashtag[];
  sounds: TrendingSound[];
  categories: TrendingCategory[];
}

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
  trend: number | string;
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
      <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md", Number(trend) >= 0 ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10")}>
        {Number(trend) >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
        {Math.abs(Number(trend))}%
      </div>
    </div>
    
    <div>
      <div className="text-3xl font-semibold tracking-tight text-white mb-1">{value}</div>
      <p className="text-xs text-zinc-500 font-medium">{label}</p>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/hashtags/trending');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const hashtags = data?.data || [];
  const sounds = data?.sounds || [];
  const categories = data?.categories || [];

  // Hitung stats berdasarkan data asli
  const totalViews = hashtags.reduce((acc: number, curr: TrendingHashtag) => acc + curr.latestViews, 0);
  const avgGrowth = hashtags.length > 0 ? hashtags.reduce((acc: number, curr: TrendingHashtag) => acc + Number(curr.growth), 0) / hashtags.length : 0;
  
  // Ambil hashtag paling viral
  const topHashtag = [...hashtags].sort((a: TrendingHashtag, b: TrendingHashtag) => b.latestViews - a.latestViews)[0];

  return (
    <motion.div 
      initial="hidden" animate="show" variants={container}
      className="space-y-8"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.05] pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-sm text-zinc-400">Algoritma TikTok terpopuler secara real-time berdasarkan data nyata.</p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className={cn("flex h-2 w-2 rounded-full shadow-[0_0_12px_currentColor]", loading ? "bg-amber-500 text-amber-500 animate-pulse" : "bg-emerald-500 text-emerald-500")} />
          <span className="text-zinc-300">{loading ? 'Syncing Real Data...' : 'Live Data Synchronized'}</span>
        </div>
      </motion.div>
      
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Hype Velocity" value={loading ? "..." : (avgGrowth > 0 ? `+${avgGrowth.toFixed(1)}%` : `${avgGrowth.toFixed(1)}%`)} label="Avg. growth all tags" icon={Flame} trend={avgGrowth.toFixed(1)} />
        <StatCard title="Trending Sounds" value={loading ? "..." : sounds.length} label="Tracked audio" icon={Music} trend={15} />
        <StatCard title="Viral Categories" value={loading ? "..." : categories.length} label="Dominant niches" icon={LayoutList} trend={5} />
        <StatCard title="Total Audience" value={loading ? "..." : `${(totalViews / 1000000).toFixed(1)}M`} label="Aggregated views" icon={Eye} trend={12.4} />
      </motion.div>

      <motion.div variants={container} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-black/20 p-6 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-400" />
              <h2 className="text-lg font-medium text-zinc-100">Top Algorithm Trajectory</h2>
            </div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{topHashtag ? `#${topHashtag.tag}` : 'No Data'}</span>
          </div>
          
          <div className="h-[280px] w-full rounded-xl bg-transparent flex flex-col items-center justify-center relative overflow-hidden">
             {loading ? (
               <div className="flex flex-col items-center gap-3 relative z-10">
                 <Activity className="h-8 w-8 text-zinc-600 animate-pulse" />
                 <span className="text-sm font-medium text-zinc-500">Aggregating real historical data...</span>
               </div>
             ) : topHashtag && topHashtag.history && topHashtag.history.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={topHashtag.history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                   <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} dx={-10} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
                     itemStyle={{ color: '#f4f4f5', fontSize: '13px', fontWeight: 600 }}
                     labelStyle={{ color: '#a1a1aa', fontSize: '11px', marginBottom: '4px' }}
                   />
                   <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                 </AreaChart>
               </ResponsiveContainer>
             ) : (
               <div className="flex flex-col items-center gap-3 text-zinc-600">
                 <Activity className="h-8 w-8 opacity-50" />
                 <span className="text-sm">Database empty. Run scraper to populate.</span>
               </div>
             )}
          </div>
        </motion.div>
        
        <motion.div variants={item} className="rounded-2xl border border-white/[0.06] bg-black/20 p-6 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <h2 className="text-lg font-medium text-zinc-100 mb-6 flex items-center gap-2"><Flame className="h-5 w-5 text-emerald-400" /> Viral Hashtags</h2>
          
          <div className="space-y-3 relative z-10 overflow-y-auto max-h-[280px] pr-2 custom-scrollbar">
             {loading ? (
               <div className="animate-pulse space-y-4">
                 {[1,2,3,4].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl" />)}
               </div>
             ) : hashtags.length > 0 ? (
               hashtags.slice(0, 8).sort((a: TrendingHashtag, b: TrendingHashtag) => b.latestViews - a.latestViews).map((tag: TrendingHashtag, i: number) => (
                <div key={i} className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.04] text-zinc-400 group-hover:text-emerald-400 transition-colors">
                      <Hash className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{tag.tag}</div>
                      <div className="text-xs text-zinc-500">{(tag.latestViews / 1000000).toFixed(1)}M views</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={cn("text-xs font-semibold", Number(tag.growth) >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      {Number(tag.growth) > 0 ? '+' : ''}{tag.growth}%
                    </span>
                    <span className="text-[10px] text-zinc-600">Velocity</span>
                  </div>
                </div>
               ))
             ) : (
               <div className="text-sm text-zinc-500 py-4 text-center">No trending hashtags found.</div>
             )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
