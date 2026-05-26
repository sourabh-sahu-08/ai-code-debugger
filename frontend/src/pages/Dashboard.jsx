import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Activity, ArrowRight, Calendar, Code2, Search, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Layout from "../components/Layout";
import ConfirmModal from "../components/ConfirmModal";
import { analysisService } from "../utils/api";
import { useSound } from "../utils/useSound";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [searchParams] = useSearchParams();

  const { playSound } = useSound();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);

    const fetchHistory = async () => {
      try {
        const response = await analysisService.getHistory();
        setHistory(response.data.data);
      } catch (error) {
        toast.error("Failed to load analysis history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [searchParams]);

  // Dynamic HSL Spotlight mouse coords
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleDeleteConfirm = async () => {
    if (!idToDelete) return;

    try {
      await analysisService.deleteAnalysis(idToDelete);
      setHistory((prev) => prev.filter((item) => item._id !== idToDelete));
      playSound("success");
      toast.success("Analysis deleted");
    } catch (error) {
      playSound("error");
      toast.error("Failed to delete analysis");
    } finally {
      setIdToDelete(null);
      setIsModalOpen(false);
    }
  };

  const languageOptions = useMemo(
    () => [...new Set(history.map((item) => item.language))],
    [history]
  );

  const filteredHistory = useMemo(
    () =>
      history.filter((item) => {
        const searchTarget = `${item.originalCode} ${item.findings || ""}`.toLowerCase();
        const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());
        const matchesLanguage = filterLanguage === "all" || item.language === filterLanguage;

        return matchesSearch && matchesLanguage;
      }),
    [filterLanguage, history, searchQuery]
  );

  const stats = useMemo(() => {
    const scores = history
      .map((item) => parseInt(item.confidenceScore, 10) || 0)
      .filter(Boolean);

    return [
      { label: "Total analyses", value: history.length },
      { label: "Languages reviewed", value: languageOptions.length },
      {
        label: "Average confidence",
        value: scores.length
          ? `${Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)}%`
          : "0%"
      }
    ];
  }, [history, languageOptions.length]);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        
        {/* Banner with cursor spotlights */}
        <div 
          onMouseMove={handleMouseMove}
          className="spotlight-card rounded-[2.5rem] bg-white/[0.01] border border-white/5 p-8 md:p-12 mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="eyebrow mb-2 text-sky-400 text-glow">Database Ledger</p>
            <h1 className="section-title text-white">Track every review session.</h1>
            <p className="mt-3 max-w-xl text-xs text-slate-400">
              Revisit optimized functions, examine logical flaws, and manage shared public reports in your personal development nexus.
            </p>
          </div>

          <Link
            to="/"
            onClick={() => playSound("click")}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 text-xs font-bold text-slate-950 shadow-lg shadow-sky-400/10 hover:bg-sky-300 text-glow"
          >
            New Analysis
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.08 }}
              className="spotlight-card card-premium p-6"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-mono font-bold text-white text-glow">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Real-time filters and query selectors */}
        <div className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-4 md:flex-row">
          <label className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search code snippets, logical findings, or audit notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/20 transition-all"
            />
          </label>

          <select
            value={filterLanguage}
            onChange={(e) => {
              playSound("click");
              setFilterLanguage(e.target.value);
            }}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400/20"
          >
            <option value="all">All languages</option>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* History Grid using bounce springs */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="h-52 rounded-[1.75rem] border border-white/10 bg-white/[0.02] animate-pulse"
                />
              ))}
            </div>
          ) : filteredHistory.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 grid gap-4 md:grid-cols-2"
            >
              {filteredHistory.map((item) => (
                <div 
                  key={item._id} 
                  onMouseMove={handleMouseMove}
                  className="spotlight-card card-premium flex flex-col justify-between p-6 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300 text-glow">
                          <Code2 size={17} />
                        </div>
                        <div>
                          <p className="line-clamp-1 text-sm font-semibold text-white font-mono leading-tight">
                            {item.originalCode.substring(0, 80).trim()}
                          </p>
                          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                            <span className="text-sky-300">{item.language}</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={11} />
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          playSound("click");
                          setIdToDelete(item._id);
                          setIsModalOpen(true);
                        }}
                        className="rounded-xl border border-red-500/15 bg-red-500/5 p-2 text-red-300 hover:bg-red-500/15 transition-all"
                        title="Delete analysis"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-slate-400">
                      {item.findings || "No specific logical findings were saved."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="rounded-xl border border-white/5 bg-slate-950/50 px-3 py-1.5 text-[10px] text-slate-400 font-mono">
                      Score: <strong className="text-sky-300 text-glow">{item.confidenceScore || "0%"}</strong>
                    </div>
                    <Link
                      to={`/dashboard/analysis/${item._id}`}
                      onClick={() => playSound("click")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-white"
                    >
                      View Report
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="card-premium mt-8 flex min-h-[18rem] flex-col items-center justify-center px-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-white/[0.03] text-slate-500">
                <Activity size={24} />
              </div>
              <h3 className="mt-5 text-base font-bold text-white">No analyses found</h3>
              <p className="mt-2 max-w-sm text-xs text-slate-500 leading-relaxed">
                Refine your query query parameters, clear language filters, or submit a new script from the primary neural core editor.
              </p>
            </div>
          )}
        </AnimatePresence>

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => {
            playSound("click");
            setIsModalOpen(false);
          }}
          onConfirm={handleDeleteConfirm}
          title="Permanently Purge Log?"
          message="This action will delete the entire analysis findings, optimizations, and chat logs from your secure registry database."
          confirmText="Purge Log"
        />
      </div>
    </Layout>
  );
}
