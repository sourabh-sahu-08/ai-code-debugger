import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { History, LogOut, Search, ShieldCheck, Terminal, User, Volume2, VolumeX, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../utils/useSound";

const themes = [
  { name: "Nebula Cyber", h: 199, s: "89%", l: "60%" },
  { name: "Deep Aurora", h: 142, s: "70%", l: "45%" },
  { name: "Cosmic Flare", h: 24, s: "95%", l: "53%" },
  { name: "Polar Ice", h: 180, s: "85%", l: "48%" }
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentThemeIdx, setCurrentThemeIdx] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound, muted, toggleMute } = useSound();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  // Load and apply theme on mount
  useEffect(() => {
    const savedIdx = localStorage.getItem("app_theme_idx");
    if (savedIdx !== null) {
      const idx = parseInt(savedIdx, 10);
      if (idx >= 0 && idx < themes.length) {
        setCurrentThemeIdx(idx);
        applyTheme(themes[idx]);
      }
    }
  }, []);

  const applyTheme = (theme) => {
    document.documentElement.style.setProperty("--primary-h", String(theme.h));
    document.documentElement.style.setProperty("--primary-s", theme.s);
    document.documentElement.style.setProperty("--primary-l", theme.l);
  };

  const handleCycleTheme = () => {
    playSound("click");
    const nextIdx = (currentThemeIdx + 1) % themes.length;
    setCurrentThemeIdx(nextIdx);
    localStorage.setItem("app_theme_idx", String(nextIdx));
    applyTheme(themes[nextIdx]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    playSound("click");
    navigate(`/dashboard?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
  };

  const handleSignOut = () => {
    playSound("error");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={() => playSound("click")}
          >
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.05 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300 shadow-lg shadow-sky-500/10 text-glow"
            >
              <Terminal size={18} strokeWidth={2.2} />
            </motion.div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-slate-500">
                AI Code Review
              </p>
              <p className="text-lg font-bold tracking-[-0.04em] text-white">
                khudsekrle
              </p>
            </div>
          </Link>

          {isLoggedIn && (
            <form onSubmit={handleSearch} className="hidden lg:block">
              <label className="relative block">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={16}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search analyses, findings, or code snippets"
                  className="w-[26rem] rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/20 transition-all"
                />
              </label>
            </form>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {/* Aesthetic Theme Swapper Control */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCycleTheme}
            className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:border-sky-400/20 hover:text-white"
            title={`Active Theme: ${themes[currentThemeIdx].name}. Click to change.`}
          >
            <Palette size={15} className="text-sky-300" />
            <span className="hidden md:inline">{themes[currentThemeIdx].name}</span>
          </motion.button>

          {/* Micro-Sound Synth Mute Controller */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              toggleMute();
              if (muted) {
                // Synthesize quick chirp just to show it is unmuted
                setTimeout(() => {
                  const ctx = new (window.AudioContext || window.webkitAudioContext)();
                  const osc = ctx.createOscillator();
                  const gain = ctx.createGain();
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  osc.frequency.setValueAtTime(800, ctx.currentTime);
                  gain.gain.setValueAtTime(0.02, ctx.currentTime);
                  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                  osc.start();
                  osc.stop(ctx.currentTime + 0.05);
                }, 50);
              }
            }}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${
              muted 
                ? "border-red-400/10 bg-red-500/5 text-red-400 hover:bg-red-500/10" 
                : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/20 hover:text-white"
            }`}
            title={muted ? "Sound effects muted. Click to unmute." : "Sound effects active. Click to mute."}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </motion.button>

          {isLoggedIn ? (
            <>
              <div className="hidden xl:flex items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-300">
                <ShieldCheck size={14} />
                Secure Workspace
              </div>

              <Link
                to="/dashboard"
                onClick={() => playSound("click")}
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-300 hover:border-sky-400/20 hover:text-white"
              >
                <History size={16} />
                <span className="hidden sm:inline">History</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => playSound("click")}
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-300 hover:border-sky-400/20 hover:text-white"
              >
                <User size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex h-11 items-center gap-2 rounded-2xl border border-red-400/15 bg-red-500/10 px-4 text-sm font-medium text-red-200 hover:bg-red-500/15"
                title="Sign out"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                onClick={() => playSound("click")}
                className="flex h-11 items-center px-4 text-sm font-medium text-slate-300 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                onClick={() => playSound("click")}
                className="flex h-11 items-center rounded-2xl bg-sky-400 px-6 text-sm font-bold text-slate-950 shadow-xl shadow-sky-400/20 hover:bg-sky-300 active:scale-95 transition-all text-glow"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

