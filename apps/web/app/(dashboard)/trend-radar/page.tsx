"use client";

import { Activity, RefreshCw } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

export default function TrendRadarPage() {
  const [hashtags, setHashtags] = useState<any[]>([]);
  const [sounds, setSounds] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hashtags/trending");
      const json = await res.json();
      if (json.data) {
        setHashtags(json.data);
      }
      if (json.sounds) {
        setSounds(json.sounds);
      }
      if (json.categories) {
        setCategories(json.categories);
      }
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
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Activity className="text-neon-purple" /> 
            Trend Radar
          </h1>
          <p className="text-muted-foreground">Discover emerging hashtags, sounds, and categories.</p>
        </div>
        <button 
          onClick={handleSync} 
          disabled={syncing}
          className="px-4 py-2 bg-charcoal border border-border rounded-lg text-sm font-medium hover:text-neon-purple hover:border-neon-purple transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Scraping TikTok...' : 'Sync Latest Data'}
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {['All', 'Hashtags', 'Sounds', 'Categories'].map(filter => (
          <button key={filter} className="px-4 py-2 rounded-full border border-border hover:border-neon-purple text-sm font-medium transition-colors bg-card hover:bg-charcoal">
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        {loading ? (
          <div className="h-80 flex items-center justify-center text-muted-foreground">Loading real data from database...</div>
        ) : selectedHashtag ? (
          <>
            <div className="flex items-center justify-between mb-8">
               <div>
                 <h2 className="text-xl font-bold text-foreground">#{selectedHashtag.tag}</h2>
                 <p className="text-sm text-lime-green font-medium mt-1">
                   {selectedHashtag.growth > 0 ? '+' : ''}{selectedHashtag.growth}% Growth
                 </p>
               </div>
               <button className="px-4 py-2 bg-charcoal border border-border rounded-lg text-sm font-medium hover:text-neon-purple hover:border-neon-purple transition-colors">
                 Add to Watchlist
               </button>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedHashtag.history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7F56FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7F56FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#A0A0AB" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A0A0AB" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2A2B30', borderColor: '#34353B', borderRadius: '8px' }}
                    itemStyle={{ color: '#F5F5F7' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#7F56FF" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="h-80 flex flex-col items-center justify-center text-muted-foreground gap-4">
            <p>Database is empty. No fake data allowed by specification.</p>
            <button onClick={handleSync} className="px-4 py-2 bg-neon-purple text-white rounded-lg font-medium">
               Click "Sync Latest Data" to Scrape Real TikTok Data
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">Trending Sounds</h3>
          <div className="space-y-3">
            {sounds.length > 0 ? sounds.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-charcoal rounded-lg border border-border hover:border-neon-purple/50 transition-colors">
                 <span className="font-medium text-sm">{item.title}</span>
                 <span className="text-xs text-lime-green px-2 py-1 bg-lime-green/10 rounded-full">{(item.usageCount / 1000).toFixed(1)}k uses</span>
              </div>
            )) : <p className="text-sm text-muted-foreground">No real data available yet. Click Sync Latest Data to fetch.</p>}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">Rising Categories</h3>
          <div className="space-y-3">
            {categories.length > 0 ? categories.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-charcoal rounded-lg border border-border hover:border-neon-purple/50 transition-colors">
                 <span className="font-medium text-sm">{item.name}</span>
                 <span className="text-xs text-lime-green px-2 py-1 bg-lime-green/10 rounded-full">Rising</span>
              </div>
            )) : <p className="text-sm text-muted-foreground">No real data available yet. Scraper will populate this soon.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
