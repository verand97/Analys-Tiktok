"use client";

import { Activity, RefreshCw, Filter, LineChart, Music, LayoutList } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TrendRadarPage() {
  const [hashtags, setHashtags] = useState<{tag: string, growth: number, history: {name: string, views: number}[]}[]>([]);
  const [sounds, setSounds] = useState<{title: string, usageCount: number}[]>([]);
  const [categories, setCategories] = useState<{name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hashtags/trending");
      const json = await res.json();
      if (json.data) setHashtags(json.data);
      if (json.sounds) setSounds(json.sounds);
      if (json.categories) setCategories(json.categories);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await fetch("/api/scrape/trigger", { method: "POST" });
      await fetchTrending();
    } catch (e) {
      console.error(e);
    }
    setSyncing(false);
  };

  const selectedHashtag = hashtags.length > 0 ? hashtags[0] : null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.05] pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2 flex items-center gap-3">
            <LineChart className="text-indigo-400 h-8 w-8" /> 
            Trend Radar
          </h1>
          <p className="text-sm text-zinc-400">Discover emerging hashtags, sounds, and categories in real-time.</p>
        </div>
        <button 
          onClick={handleSync} 
          disabled={syncing}
          className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-medium text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-all flex items-center gap-2 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-indigo-400' : ''}`} />
          {syncing ? 'Synchronizing...' : 'Sync Live Data'}
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2 p-1 bg-white/[0.02] border border-white/[0.04] w-max rounded-xl">
        {['All', 'Hashtags', 'Sounds', 'Categories'].map(filter => (
          <button 
            key={filter} 
            onClick={() => setActiveTab(filter)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === filter ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-6 lg:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        
        {loading ? (
          <div className="h-[350px] flex flex-col items-center justify-center text-zinc-500">
             <Activity className="h-6 w-6 animate-pulse mb-3 opacity-50" />
             <span className="text-sm">Fetching historical data...</span>
          </div>
        ) : selectedHashtag ? (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
               <div>
                 <div className="flex items-center gap-3 mb-1">
                   <h2 className="text-2xl font-bold text-white tracking-tight">#{selectedHashtag.tag}</h2>
                   <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${selectedHashtag.growth > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                     {selectedHashtag.growth > 0 ? '+' : ''}{selectedHashtag.growth}%
                   </span>
                 </div>
                 <p className="text-xs text-zinc-500 font-medium">Projected growth trajectory over 30 days</p>
               </div>
               <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all">
                 Track Hashtag
               </button>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedHashtag.history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
            </div>
          </>
        ) : (
          <div className="h-[350px] flex flex-col items-center justify-center text-zinc-500 gap-4">
            <Filter className="h-8 w-8 opacity-20" />
            <p className="text-sm">Database empty. Waiting for sync.</p>
            <button onClick={handleSync} className="px-5 py-2.5 bg-white text-black rounded-xl text-xs font-semibold hover:bg-zinc-200 transition-colors">
               Initialize Sync
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-zinc-300 mb-5 flex items-center gap-2">
            <Music className="h-4 w-4 text-indigo-400" /> Top Sounds
          </h3>
          <div className="space-y-2">
            {sounds.length > 0 ? sounds.map((item: {title: string, usageCount: number}, idx: number) => (
              <div key={idx} className="group flex justify-between items-center p-3 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all cursor-default">
                 <span className="font-medium text-xs text-zinc-200 group-hover:text-white transition-colors">{item.title}</span>
                 <span className="text-[10px] font-semibold text-zinc-500 bg-white/[0.05] px-2 py-1 rounded-md">{(item.usageCount / 1000).toFixed(1)}k uses</span>
              </div>
            )) : <p className="text-xs text-zinc-600 p-2">Pending sync...</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-zinc-300 mb-5 flex items-center gap-2">
            <LayoutList className="h-4 w-4 text-emerald-400" /> Rising Categories
          </h3>
          <div className="space-y-2">
            {categories.length > 0 ? categories.map((item: {name: string}, idx: number) => (
              <div key={idx} className="group flex justify-between items-center p-3 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all cursor-default">
                 <span className="font-medium text-xs text-zinc-200 group-hover:text-white transition-colors">{item.name}</span>
                 <span className="text-[10px] font-semibold text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded-md">Rising</span>
              </div>
            )) : <p className="text-xs text-zinc-600 p-2">Pending sync...</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
