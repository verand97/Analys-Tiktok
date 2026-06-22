"use client";

import { useState } from "react";
import { Search, Loader2, Sparkles, TrendingUp, Music, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HypeScorePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    // Simulasi fetch dari Next.js API route yang akan menghitung metrik historis
    setTimeout(() => {
      setResult({
        score: 87,
        breakdown: {
          velocity: 92,
          trending_bonus: 25,
          category_avg: 78
        },
        detected: {
          hashtags: ["#fyp", "#tech2026"],
          sound: "Original Sound - ViralPulse",
          category: "Technology"
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-neon-purple/10 border border-neon-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-neon-purple" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Hype Score Predictor</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Paste a TikTok draft link or video URL to analyze its viral potential based on real-time hashtag velocity and sound trends.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-2 max-w-2xl mx-auto shadow-sm focus-within:border-neon-purple/50 transition-colors">
        <form onSubmit={handlePredict} className="flex items-center gap-2">
          <div className="pl-4">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input 
            type="text" 
            placeholder="https://www.tiktok.com/@user/video/..." 
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 py-3"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading || !url}
            className="bg-neon-purple hover:bg-neon-purple/90 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Predict Hype
          </button>
        </form>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime-green/5 rounded-full blur-3xl"></div>
            
            <h3 className="text-lg font-medium text-muted-foreground mb-8">Overall Hype Score</h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2B30" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#80FF56" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * result.score) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold tracking-tighter text-foreground">{result.score}</span>
                <span className="text-sm text-lime-green font-medium">Very High</span>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              This content has strong viral indicators based on current hashtag velocity.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-medium mb-4">Score Breakdown</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Velocity Score</span>
                     <span className="font-medium">{result.breakdown.velocity}/100</span>
                  </div>
                  <div className="h-2 w-full bg-charcoal rounded-full overflow-hidden">
                    <div className="h-full bg-neon-purple rounded-full transition-all duration-1000 delay-100" style={{ width: `${result.breakdown.velocity}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground flex items-center gap-2"><Music className="w-4 h-4"/> Trending Bonus</span>
                     <span className="font-medium">+{result.breakdown.trending_bonus} pts</span>
                  </div>
                  <div className="h-2 w-full bg-charcoal rounded-full overflow-hidden">
                    <div className="h-full bg-lime-green rounded-full transition-all duration-1000 delay-200" style={{ width: `${(result.breakdown.trending_bonus / 30) * 100}%` }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground flex items-center gap-2"><LayoutList className="w-4 h-4"/> Category Average</span>
                     <span className="font-medium">{result.breakdown.category_avg}/100</span>
                  </div>
                  <div className="h-2 w-full bg-charcoal rounded-full overflow-hidden">
                    <div className="h-full bg-neon-purple/50 rounded-full transition-all duration-1000 delay-300" style={{ width: `${result.breakdown.category_avg}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Detected Elements</h3>
              <div className="flex flex-wrap gap-2">
                {result.detected.hashtags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-charcoal border border-border rounded-full text-sm">{tag}</span>
                ))}
                <span className="px-3 py-1 bg-neon-purple/10 text-neon-purple border border-neon-purple/20 rounded-full text-sm">
                  🎵 {result.detected.sound}
                </span>
                <span className="px-3 py-1 bg-charcoal border border-border rounded-full text-sm">
                  📂 {result.detected.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
