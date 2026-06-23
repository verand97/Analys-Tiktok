"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LayoutDashboard, Search, Clock, List, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trend Radar", href: "/trend-radar", icon: Activity },
  { name: "Hype Predictor", href: "/hype-score", icon: Search },
  { name: "Competitors", href: "/competitor", icon: List },
  { name: "Best Posting Time", href: "/best-time", icon: Clock },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/[0.08] bg-[#09090b] flex flex-col h-screen fixed top-0 left-0 z-20 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent opacity-50" />
      
      <div className="h-16 flex items-center px-6 border-b border-white/[0.05] relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
             <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-lg font-semibold text-zinc-100 tracking-tight">
            ViralPulse
          </span>
        </motion.div>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1 relative z-10">
        <div className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-4">Analytics</div>
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="block relative">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative z-10",
                  isActive
                    ? "text-indigo-400"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 bg-indigo-500/10 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("w-4 h-4 relative z-10")} />
                <span className="relative z-10">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/[0.05] relative z-10">
        <button 
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-100 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}
