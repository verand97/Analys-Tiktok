"use client";

import { useState } from "react";
import { Search, Users, Activity, Eye, FileText, ArrowRightLeft, X, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CompetitorPage() {
  const [username, setUsername] = useState("");
  const [competitors, setCompetitors] = useState<any[]>([
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Users className="text-neon-purple" /> 
          Competitor Analysis
        </h1>
        <p className="text-muted-foreground">Track and compare up to 3 competitor accounts side-by-side.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <form onSubmit={addCompetitor} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Enter TikTok username (e.g. @tech_guru)" 
              className="w-full bg-charcoal border border-border rounded-lg pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-neon-purple/50 transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={competitors.length >= 3}
            />
          </div>
          <button 
            type="submit"
            disabled={!username || competitors.length >= 3}
            className="w-full sm:w-auto bg-charcoal hover:bg-neon-purple/20 text-foreground border border-border hover:border-neon-purple hover:text-neon-purple px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 whitespace-nowrap"
          >
            Add Account
          </button>
        </form>
      </div>

      {competitors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((comp, idx) => (
            <div key={idx} className="bg-card border border-border rounded-2xl p-6 relative group hover:border-neon-purple/50 transition-colors animate-in fade-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/5 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-neon-purple/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-charcoal border border-border flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{comp.username}</h3>
                    <span className="text-xs text-lime-green font-medium">{comp.growth} Growth</span>
                  </div>
                </div>
                <button onClick={() => setCompetitors(competitors.filter((_, i) => i !== idx))} className="text-muted-foreground hover:text-danger p-2 transition-colors">
                   <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-charcoal rounded-lg border border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4"/> Followers</span>
                  <span className="font-semibold">{comp.followers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-charcoal rounded-lg border border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Eye className="w-4 h-4"/> Avg Views</span>
                  <span className="font-semibold">{comp.avgViews}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-charcoal rounded-lg border border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><Activity className="w-4 h-4"/> Frequency</span>
                  <span className="font-semibold">{comp.freq}</span>
                </div>
                <div className="p-3 bg-charcoal/50 rounded-lg border border-border border-dashed">
                  <span className="text-xs text-muted-foreground block mb-1">Top Performing Category</span>
                  <span className="font-medium text-sm text-neon-purple">{comp.topContent}</span>
                </div>
              </div>
            </div>
          ))}
          
          {competitors.length < 3 && (
            <div className="bg-charcoal/20 border border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-muted-foreground min-h-[350px]">
              <ArrowRightLeft className="w-8 h-8 mb-4 opacity-50" />
              <p className="text-sm">Add another competitor to compare</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
