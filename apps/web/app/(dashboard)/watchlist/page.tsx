"use client";

import { Bookmark, Search, Bell, BellOff, Trash2, TrendingUp, Music, UserCircle } from "lucide-react";
import { useState } from "react";

export default function WatchlistPage() {
  const [items, setItems] = useState([
    { id: 1, type: "hashtag", name: "#tech2026", metric: "1.2B views", growth: "+45%", notified: true },
    { id: 2, type: "sound", name: "Original Sound - DJ Viral", metric: "450K videos", growth: "+12%", notified: false },
    { id: 3, type: "account", name: "@tech_guru", metric: "850K followers", growth: "+2.4%", notified: true },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Bookmark className="text-neon-purple" /> 
            Your Watchlist
          </h1>
          <p className="text-muted-foreground">Monitor specific hashtags, sounds, or competitors and get alerts.</p>
        </div>
        <button className="bg-neon-purple hover:bg-neon-purple/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(127,86,255,0.4)] whitespace-nowrap">
          Upgrade to Pro
        </button>
      </div>

      <div className="bg-charcoal/40 border border-neon-purple/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-neon-purple">
        <span className="font-semibold px-2 py-1 bg-neon-purple/20 rounded whitespace-nowrap">Free Plan Limit</span>
        <span>You have used 3 of 5 watchlist slots. Upgrade to Pro for unlimited tracking and instant alerts.</span>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search your watchlist..." 
              className="w-full bg-charcoal border border-border rounded-md pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-neon-purple/50 transition-colors"
            />
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-charcoal-light transition-colors group gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-charcoal border border-border flex items-center justify-center shrink-0">
                  {item.type === 'hashtag' && <TrendingUp className="w-5 h-5 text-neon-purple" />}
                  {item.type === 'sound' && <Music className="w-5 h-5 text-lime-green" />}
                  {item.type === 'account' && <UserCircle className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{item.type} • {item.metric}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <div className="text-lime-green font-medium text-sm">{item.growth}</div>
                  <div className="text-xs text-muted-foreground">Last 7 days</div>
                </div>
                
                <div className="flex items-center gap-2 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
                  <button className={`p-2 rounded-md border ${item.notified ? 'bg-neon-purple/10 border-neon-purple text-neon-purple' : 'bg-charcoal border-border text-muted-foreground'} hover:border-neon-purple transition-colors`} title="Toggle Alerts">
                    {item.notified ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  </button>
                  <button className="p-2 rounded-md bg-charcoal border border-border text-muted-foreground hover:text-danger hover:border-danger transition-colors" title="Remove">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
