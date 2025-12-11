import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c10]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <img
              src="/logo.png"
              alt="Memori Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-purple-400 transition-colors font-sans">
            Memori
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/docs"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Documentation
          </Link>
          <Link
            to="/community"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Community
          </Link>
          <a
            href="https://github.com/shambhav15/memori-js"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0b0c10] border-b border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              <Link
                to="/docs"
                className="text-lg font-medium text-zinc-300"
                onClick={() => setIsOpen(false)}
              >
                Documentation
              </Link>
              <Link
                to="/community"
                className="text-lg font-medium text-zinc-300"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <a
                href="https://github.com/shambhav15/memori-js"
                className="text-lg font-medium text-zinc-300"
              >
                GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
