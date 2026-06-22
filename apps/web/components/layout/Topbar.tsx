"use client";

import { Bell, UserCircle, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();
  
  // Format pathname to a readable title
  const title = pathname === "/dashboard" 
    ? "Dashboard Overview" 
    : pathname.split('/').pop()?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <header className="h-16 border-b border-border bg-charcoal/60 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10 transition-all">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4"
      >
        <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
          {title}
          <Sparkles className="w-4 h-4 text-neon-purple opacity-50" />
        </h2>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="flex items-center gap-4"
      >
        <div className="relative hidden md:block">
           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
           <input 
             type="text" 
             placeholder="Search trends..." 
             className="bg-charcoal-light border border-white/5 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 w-64 transition-all"
           />
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-muted-foreground hover:text-neon-purple transition-colors rounded-full hover:bg-neon-purple/10 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-lime-green rounded-full shadow-[0_0_8px_#80FF56]"></span>
        </motion.button>

        <div className="h-6 w-px bg-white/10 mx-1"></div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-white/5 hover:border-neon-purple/30 transition-all bg-charcoal-light shadow-sm"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-neon-purple to-lime-green flex items-center justify-center">
             <UserCircle className="w-5 h-5 text-charcoal" />
          </div>
          <span className="text-sm font-medium text-white">Pro User</span>
        </motion.button>
      </motion.div>
    </header>
  );
}
