"use client";

import { Bell, UserCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Topbar() {
  const pathname = usePathname();
  
  // Format pathname to a readable title
  const title = pathname === "/dashboard" 
    ? "Dashboard Overview" 
    : pathname.split('/').pop()?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 transition-all">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4"
      >
        <h2 className="text-lg font-medium text-zinc-100 tracking-tight flex items-center gap-2">
          {title}
        </h2>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
        className="flex items-center gap-4"
      >
        <div className="relative hidden md:block">
           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
           <input 
             type="text" 
             placeholder="Search..." 
             className="bg-white/[0.03] border border-white/[0.08] rounded-full pl-9 pr-4 py-1.5 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500/50 w-64 transition-all"
           />
        </div>

        <button className="p-2 text-zinc-400 hover:text-indigo-400 transition-colors rounded-full hover:bg-white/[0.03] relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-white/[0.08] mx-1"></div>

        <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-white/[0.08] hover:border-white/[0.15] transition-all bg-white/[0.02]">
          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
             <UserCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-300">Creator Pro</span>
        </button>
      </motion.div>
    </header>
  );
}
