"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LayoutDashboard, Search, Clock, List, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trend Radar", href: "/trend-radar", icon: Activity },
  { name: "Hype Score", href: "/hype-score", icon: Search },
  { name: "Competitor", href: "/competitor", icon: List },
  { name: "Best Time", href: "/best-time", icon: Clock },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-charcoal flex flex-col h-screen fixed top-0 left-0 z-20 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-neon-purple/20 blur-[50px] rounded-full pointer-events-none" />
      
      <div className="h-16 flex items-center px-6 border-b border-border relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-lime-green p-[1.5px]">
            <div className="w-full h-full bg-charcoal rounded-[6.5px] flex items-center justify-center">
              <Activity className="w-4 h-4 text-lime-green" />
            </div>
          </div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">
            ViralPulse
          </span>
        </motion.div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 relative z-10">
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
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 bg-neon-purple/10 border border-neon-purple/30 rounded-lg shadow-[0_0_15px_rgba(127,86,255,0.15)]"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-charcoal-light opacity-0 hover:opacity-100 rounded-lg transition-opacity duration-200 z-[-1]" />
                )}
                <item.icon className={cn("w-5 h-5 relative z-10", isActive ? "text-neon-purple" : "")} />
                <span className="relative z-10">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border relative z-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-charcoal-light hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </motion.button>
      </div>
    </aside>
  );
}
