"use client";

import { useState } from "react";
import { Search, Loader2, Sparkles, TrendingUp, Music, LayoutList, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HypeScorePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{score: number, breakdown: {velocity: number, trending_bonus: number, category_avg: number}, detected: {hashtags: string[], sound: string, category: string}} | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult({
        score: 87,
        breakdown: { velocity: 92, trending_bonus: 25, category_avg: 78 },
        detected: { hashtags: ["#fyp", "#tech2026"], sound: "Original Sound - ViralPulse", category: "Technology" }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 pt-8 pb-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)] relative">
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl" />
          <Sparkles className="h-8 w-8 text-indigo-400 relative z-10" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Hype Score Predictor</h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
          Evaluate the viral potential of your content. Paste a TikTok link to analyze metadata against live algorithmic trends.
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200" />
        <form onSubmit={handlePredict} className="relative flex items-center bg-zinc-950/80 border border-white/[0.08] rounded-2xl p-2 backdrop-blur-xl transition-all focus-within:border-indigo-500/50 shadow-2xl">
          <div className="pl-4">
            <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Paste TikTok video URL here..." 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 py-3 px-4 text-sm font-medium"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading || !url}
            className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Target className="w-4 h-4" />}
            {loading ? 'Analyzing...' : 'Predict Reach'}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
          >
            <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
              
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-8 z-10">Algorithmic Viability</h3>
              
              <div className="relative w-56 h-56 flex items-center justify-center mb-6 z-10">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="289" strokeDashoffset={289 - (289 * result.score) / 100} strokeLinecap="round" className="transition-all duration-1500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-6xl font-bold tracking-tighter text-white">{result.score}</motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mt-1">Excellent</motion.span>
                </div>
              </div>
              
              <p className="text-center text-xs text-zinc-400 font-medium max-w-xs z-10">
                Strong viral indicators detected based on hashtag velocity and audio momentum.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-md">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">Score Composition</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                       <span className="text-zinc-300 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-indigo-400"/> Velocity Match</span>
                       <span className="text-white">{result.breakdown.velocity}/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${result.breakdown.velocity}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-indigo-500 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                       <span className="text-zinc-300 flex items-center gap-2"><Music className="w-3.5 h-3.5 text-emerald-400"/> Audio Trend Bonus</span>
                       <span className="text-emerald-400">+{result.breakdown.trending_bonus} pts</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(result.breakdown.trending_bonus / 30) * 100}%` }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                       <span className="text-zinc-300 flex items-center gap-2"><LayoutList className="w-3.5 h-3.5 text-purple-400"/> Category Baseline</span>
                       <span className="text-white">{result.breakdown.category_avg}/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${result.breakdown.category_avg}%` }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Extracted Metadata</h3>
                <div className="flex flex-wrap gap-2">
                  {result.detected.hashtags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] cursor-default transition-colors rounded-lg text-xs font-medium text-zinc-300">{tag}</span>
                  ))}
                  <span className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-xs font-medium flex items-center gap-1.5">
                    <Music className="w-3 h-3" /> {result.detected.sound}
                  </span>
                  <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                    <LayoutList className="w-3 h-3" /> {result.detected.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
