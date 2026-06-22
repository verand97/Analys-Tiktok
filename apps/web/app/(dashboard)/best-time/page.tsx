"use client";

import { Clock, Calendar, BarChart2 } from "lucide-react";

export default function BestTimePage() {
  const categories = ["Technology", "Gaming", "Comedy", "Education", "Beauty"];
  
  const scheduleData = [
    { day: "Monday", times: ["09:00 AM", "02:00 PM", "08:30 PM"], hot: false },
    { day: "Tuesday", times: ["10:30 AM", "04:00 PM"], hot: false },
    { day: "Wednesday", times: ["11:00 AM", "07:00 PM", "10:00 PM"], hot: true },
    { day: "Thursday", times: ["08:00 AM", "03:30 PM"], hot: false },
    { day: "Friday", times: ["12:00 PM", "06:00 PM", "09:00 PM"], hot: true },
    { day: "Saturday", times: ["02:00 PM", "08:00 PM", "11:00 PM"], hot: true },
    { day: "Sunday", times: ["10:00 AM", "05:00 PM"], hot: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Clock className="text-neon-purple" /> 
            Best Time to Post
          </h1>
          <p className="text-muted-foreground">Historical analysis of engagement peaks based on your timezone.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-lg">
          <span className="text-sm text-muted-foreground pl-3 pr-2 border-r border-border">Timezone</span>
          <select className="bg-transparent border-none text-sm font-medium outline-none text-foreground py-2 px-3">
            <option>Asia/Jakarta (UTC+7)</option>
            <option>America/New_York (UTC-5)</option>
            <option>Europe/London (UTC+0)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-neon-purple border-neon-purple text-white shadow-[0_0_10px_rgba(127,86,255,0.3)]' : 'bg-card border-border hover:border-neon-purple/50 text-muted-foreground hover:text-foreground'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2"><Calendar className="w-5 h-5 text-neon-purple"/> Weekly Heatmap</h2>
          </div>
          
          <div className="space-y-4">
            {scheduleData.map((day) => (
              <div key={day.day} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-charcoal rounded-xl border border-border hover:border-border/80 transition-colors">
                <div className="w-28 font-medium flex items-center gap-2">
                  {day.day}
                  {day.hot && <span className="w-2 h-2 rounded-full bg-lime-green shadow-[0_0_8px_rgba(128,255,86,0.6)] animate-pulse"></span>}
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {day.times.map((time, idx) => (
                    <div key={idx} className={`px-3 py-1.5 rounded-md text-sm border transition-all ${idx === 1 && day.hot ? 'bg-lime-green/10 border-lime-green text-lime-green font-semibold shadow-[0_0_10px_rgba(128,255,86,0.1)]' : 'bg-charcoal-light border-border text-muted-foreground hover:border-neon-purple/50 cursor-default'}`}>
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-xl p-6 relative overflow-hidden group hover:bg-neon-purple/15 transition-colors">
            <div className="absolute right-0 top-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart2 className="w-32 h-32 -mt-4 -mr-4" />
            </div>
            <h3 className="text-neon-purple font-bold text-lg mb-2">Prime Window</h3>
            <p className="text-sm text-foreground/90 mb-4">
              Your highest engagement opportunity for <strong className="text-white">Technology</strong> content is typically observed on:
            </p>
            <div className="text-2xl font-black text-white drop-shadow-md">Friday, 06:00 PM</div>
            <div className="text-xs font-bold text-lime-green mt-3 bg-lime-green/10 inline-block px-3 py-1.5 rounded-md border border-lime-green/20">
              +45% Avg Engagement
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">Why this time?</h3>
            <ul className="space-y-4 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-0.5 text-lg leading-none">•</span>
                Users in this category tend to consume content during commuting hours.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-purple mt-0.5 text-lg leading-none">•</span>
                Historical data shows less competition from top creators at this specific hour.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
