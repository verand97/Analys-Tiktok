"use client";

import { Bookmark, Search, Bell, BellOff, Trash2, TrendingUp, Music, UserCircle, Star } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WatchlistPage() {
  const [items, setItems] = useState([
    { id: 1, type: "hashtag", name: "#tech2026", metric: "1.2B views", growth: "+45%", notified: true },
    { id: 2, type: "sound", name: "Original Sound - DJ Viral", metric: "450K videos", growth: "+12%", notified: false },
    { id: 3, type: "account", name: "@tech_guru", metric: "850K followers", growth: "+2.4%", notified: true },
  ]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.05] pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2 flex items-center gap-3">
            <Bookmark className="text-indigo-400 h-8 w-8" /> 
            Priority Watchlist
          </h1>
          <p className="text-sm text-zinc-400">Monitor selected hashtags, sounds, and creators in real-time.</p>
        </div>
        <button className="bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-2">
          <Star className="w-4 h-4" />
          Upgrade to Pro
        </button>
      </div>

      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
          <span className="text-sm text-zinc-300 font-medium">Free Plan Limit: <strong className="text-white">3 of 5</strong> slots used.</span>
        </div>
        <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">View Pro Features &rarr;</button>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-black/20 backdrop-blur-md overflow-hidden">
        <div className="p-4 border-b border-white/[0.05] flex items-center gap-4 bg-white/[0.01]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search your watchlist..." 
              className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>
        
        <div className="divide-y divide-white/[0.05]">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/[0.06] flex items-center justify-center shrink-0">
                    {item.type === 'hashtag' && <TrendingUp className="w-5 h-5 text-indigo-400" />}
                    {item.type === 'sound' && <Music className="w-5 h-5 text-emerald-400" />}
                    {item.type === 'account' && <UserCircle className="w-5 h-5 text-zinc-400" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-white/[0.05] px-1.5 py-0.5 rounded">{item.type}</span>
                      <span className="text-xs text-zinc-400 font-medium">{item.metric}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <div className="text-emerald-400 font-semibold text-sm">{item.growth}</div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-zinc-600">Velocity</div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                      className={`p-2.5 rounded-lg border transition-colors ${item.notified ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20' : 'bg-white/[0.03] border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/[0.2]'}`} 
                      title="Toggle Alerts"
                    >
                      {item.notified ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-zinc-500 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-colors" title="Remove">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <div className="p-12 text-center text-zinc-500 text-sm font-medium">
              Your watchlist is empty. Add items from the Trend Radar.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
