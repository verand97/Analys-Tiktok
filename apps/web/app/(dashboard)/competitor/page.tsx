"use client";

import { useState } from "react";
import { Search, Users, Activity, Eye, X, UserCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompetitorPage() {
  const [username, setUsername] = useState("");
  const [competitors, setCompetitors] = useState<{username: string, followers: string, avgViews: string, freq: string, topContent: string, growth: string}[]>([
    {
      username: "@creator_pro",
      followers: "1.2M",
      avgViews: "450K",
      freq: "4x / week",
      topContent: "Tech Gadget Review",
      growth: "+12.4%"
    }
  ]);

  const addCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || competitors.length >= 3) return;
    
    setCompetitors([
      ...competitors,
      {
         username: username.startsWith('@') ? username : `@${username}`,
         followers: "850K",
         avgViews: "320K",
         freq: "6x / week",
         topContent: "Coding Setup Tour",
         growth: "+8.2%"
      }
    ]);
    setUsername("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.05] pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2 flex items-center gap-3">
            <Users className="text-indigo-400 h-8 w-8" /> 
            Competitor Analysis
          </h1>
          <p className="text-sm text-zinc-400">Track and benchmark up to 3 creator profiles side-by-side.</p>
        </div>
      </div>

      <div className="relative group max-w-xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200" />
        <form onSubmit={addCompetitor} className="relative flex items-center bg-zinc-950 border border-white/[0.08] rounded-2xl p-1.5 backdrop-blur-xl transition-all focus-within:border-indigo-500/50 shadow-sm">
          <div className="pl-3">
            <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Enter TikTok username (e.g. @tech_guru)" 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 py-2.5 px-3 text-sm font-medium"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={competitors.length >= 3}
          />
          <button 
            type="submit"
            disabled={!username || competitors.length >= 3}
            className="bg-white text-black hover:bg-zinc-200 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Profile
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <AnimatePresence>
          {competitors.map((comp, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              key={comp.username} 
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 relative group hover:bg-white/[0.04] transition-colors backdrop-blur-md"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/[0.08] flex items-center justify-center">
                    <UserCircle className="w-7 h-7 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100">{comp.username}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">{comp.growth} Growth</span>
                  </div>
                </div>
                <button onClick={() => setCompetitors(competitors.filter((_, i) => i !== idx))} className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-md hover:bg-white/[0.05] transition-colors">
                   <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl border border-white/[0.04] bg-black/20">
                  <span className="text-xs text-zinc-400 flex items-center gap-2 font-medium"><Users className="w-3.5 h-3.5"/> Followers</span>
                  <span className="font-semibold text-white text-sm">{comp.followers}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl border border-white/[0.04] bg-black/20">
                  <span className="text-xs text-zinc-400 flex items-center gap-2 font-medium"><Eye className="w-3.5 h-3.5"/> Avg Views</span>
                  <span className="font-semibold text-white text-sm">{comp.avgViews}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl border border-white/[0.04] bg-black/20">
                  <span className="text-xs text-zinc-400 flex items-center gap-2 font-medium"><Activity className="w-3.5 h-3.5"/> Posting Freq</span>
                  <span className="font-semibold text-white text-sm">{comp.freq}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1.5 font-semibold">Top Performing Category</span>
                  <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md text-xs font-medium">{comp.topContent}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {competitors.length < 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.01] p-6 flex flex-col items-center justify-center text-zinc-500 min-h-[350px] hover:bg-white/[0.02] hover:border-white/[0.2] transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-zinc-400" />
            </div>
            <p className="text-sm font-medium text-zinc-400">Add competitor to compare</p>
            <p className="text-xs text-zinc-600 mt-1">{3 - competitors.length} slots remaining</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
