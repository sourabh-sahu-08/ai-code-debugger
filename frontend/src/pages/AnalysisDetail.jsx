import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { analysisService } from "../utils/api";
import { 
  ArrowLeft, 
  Clock, 
  AlertTriangle, 
  Database, 
  Sparkles, 
  Download, 
  Share2, 
  Check, 
  FileJson, 
  Globe, 
  Lock, 
  MessageSquare, 
  Terminal 
} from "lucide-react";
import Layout from "../components/Layout";
import { toast } from "sonner";
import { motion } from "framer-motion";
import CodePreview from "../components/shared/CodePreview";
import ChatInterface from "../components/analysis/ChatInterface";
import CommentsSection from "../components/analysis/CommentsSection";
import { useSound } from "../utils/useSound";

export default function AnalysisDetail() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { playSound } = useSound();

  // Scroll Progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch analysis routine
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        if (!id) return;
        const response = await analysisService.getAnalysisById(id);
        setAnalysis(response.data.data);
        playSound("success");
      } catch (err) {
        playSound("error");
        console.error("Failed to fetch analysis", err);
        setError(err.response?.data?.message || "Something went wrong fetching the analysis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  // Mouse coordinate spotlight
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleShare = () => {
    playSound("click");
    const url = `${window.location.origin}/analysis/public/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Public share link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublic = async () => {
    playSound("click");
    try {
      const response = await analysisService.togglePublic(id);
      setAnalysis(response.data.data);
      playSound("success");
      toast.success(
        response.data.data.isPublic 
          ? "Global review visibility enabled" 
          : "Privacy protocol activated"
      );
    } catch (err) {
      playSound("error");
      toast.error("Network error: Visibility update failed");
    }
  };

  const handleDownloadMarkdown = () => {
    playSound("click");
    if (!analysis) return;
    try {
      const markdown = `# AI Audit Report: ${analysis.language.toUpperCase()}\n\n## Findings\n${
        analysis.findings
      }\n\n## Explanation\n${analysis.explanation}\n\n## Corrected Code\n\`\`\`${
        analysis.language
      }\n${analysis.correctedCode}\n\`\`\``;
      const blob = new Blob([markdown], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit_${id?.substring(0, 8)}.md`;
      a.click();
      URL.revokeObjectURL(url);
      playSound("success");
      toast.success("Report exported as Markdown");
    } catch (err) {
      playSound("error");
      toast.error("Export failed");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500 blur-3xl opacity-20 animate-pulse" />
            <div className="w-20 h-20 border-4 border-sky-500/10 border-t-sky-500 rounded-full animate-spin relative z-10 shadow-2xl"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-black text-xl tracking-[0.2em] uppercase animate-pulse">
              Retrieving Audit Logs
            </p>
            <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">
              INITIALIZING DECRYPTION KEY...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !analysis) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto pt-32 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-[3.5rem] text-center max-w-xl mx-auto border border-red-500/10 shadow-2xl"
          >
            <div className="w-20 h-20 bg-red-500/5 rounded-[2rem] flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-500/10 shadow-inner">
              <AlertTriangle size={36} />
            </div>
            <h2 className="text-2xl text-white font-bold mb-3 tracking-tight">
              Nexus Protocol Failure
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed font-medium text-xs">
              {error || "The requested analysis session was not found in database archives."}
            </p>
            <Link
              to="/dashboard"
              onClick={() => playSound("click")}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all inline-flex items-center gap-3 border border-white/5 shadow-xl active:scale-95"
            >
              <ArrowLeft size={14} />
              Return to History
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Scroll indicator bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <motion.div
          className="h-full bg-sky-400 origin-left shadow-[0_0_15px_rgba(56,189,248,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto pt-24 px-6 pb-24">
        
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/dashboard"
            onClick={() => playSound("click")}
            className="text-slate-500 hover:text-white flex items-center gap-2 mb-10 transition-all font-bold text-xs tracking-widest group w-fit"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            BACK TO DASHBOARD Nexus
          </Link>
        </motion.div>

        {/* Dashboard Header grid */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-400/10 flex items-center justify-center text-sky-300 text-glow border border-sky-400/10">
                <FileJson size={26} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight mb-0.5">
                  Audit Findings Sheet
                </h1>
                <div className="flex items-center gap-3">
                  <span className="bg-sky-400/10 px-3 py-1 rounded-lg text-[10px] text-sky-300 uppercase font-bold tracking-wider border border-sky-400/10">
                    {analysis.language}
                  </span>
                  <span className="text-slate-800">/</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {new Date(analysis.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive controls drawer */}
          <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="spotlight-card glass px-8 py-5 rounded-[2rem] border border-white/5 flex flex-wrap items-center gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">
                Code Confidence
              </p>
              <div className="flex items-center gap-3">
                <div className="h-2 w-36 bg-slate-950 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: analysis.confidenceScore || "90%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-sky-400 to-sky-600 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                  />
                </div>
                <span className="text-sky-300 font-bold text-lg text-glow tracking-tighter">
                  {analysis.confidenceScore}
                </span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-white/5 hidden xl:block" />

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleTogglePublic}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 border shadow-lg ${
                  analysis.isPublic
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-white/5 text-slate-500 border-white/5 hover:text-white"
                }`}
                title={analysis.isPublic ? "Switch to Private session" : "Publish review link"}
              >
                {analysis.isPublic ? <Globe size={16} /> : <Lock size={16} />}
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all active:scale-90 border border-white/5 shadow-lg"
                title="Download Markdown summary"
              >
                <Download size={16} />
              </button>
              <button
                onClick={handleShare}
                disabled={!analysis.isPublic}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 border relative shadow-lg ${
                  !analysis.isPublic
                    ? "opacity-20 cursor-not-allowed bg-white/5 border-white/5 text-slate-700"
                    : "bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white"
                }`}
                title="Copy share link"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Audit findings & complexities blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="spotlight-card lg:col-span-8 glass p-8 rounded-[2rem] border-l-4 border-l-sky-500 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/[0.02] blur-3xl rounded-full translate-x-40 -translate-y-40" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-sky-400/10 rounded-xl flex items-center justify-center text-sky-300 border border-sky-400/10 text-glow">
                <AlertTriangle size={15} />
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Identified Faults Checklist</h3>
            </div>
            <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 shadow-inner">
              <pre className="text-slate-300 leading-relaxed font-mono text-xs whitespace-pre-wrap">
                {analysis.findings}
              </pre>
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="spotlight-card glass p-8 rounded-[2rem] border border-white/5 shadow-2xl flex items-center gap-5 group hover:border-sky-400/20 transition-all"
            >
              <div className="w-14 h-14 bg-sky-400/10 rounded-2xl flex items-center justify-center text-sky-400 text-glow shadow-inner group-hover:scale-105 transition-transform">
                <Clock size={26} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">
                  Time Complexity
                </p>
                <p className="text-2xl font-mono text-white font-bold tracking-tight text-glow">
                  {analysis.timeComplexity}
                </p>
              </div>
            </motion.div>

            <motion.div
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="spotlight-card glass p-8 rounded-[2rem] border border-white/5 shadow-2xl flex items-center gap-5 group hover:border-emerald-500/20 transition-all"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 text-glow shadow-inner group-hover:scale-105 transition-transform">
                <Database size={26} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">
                  Memory Metrics
                </p>
                <p className="text-2xl font-mono text-white font-bold tracking-tight text-glow">
                  {analysis.spaceComplexity}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Narrative description */}
        <motion.div
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="spotlight-card glass p-8 rounded-[2rem] mb-12 border border-white/5 shadow-3xl relative overflow-hidden group"
        >
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-600/[0.02] blur-3xl rounded-full" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-sky-400/10 rounded-xl flex items-center justify-center text-sky-300 border border-sky-400/10 text-glow">
              <Sparkles size={16} />
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Theoretical Reasoning</h3>
          </div>
          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap text-sm font-semibold tracking-wide relative z-10 font-mono">
            {analysis.explanation}
          </p>
        </motion.div>

        {/* Side by side code comparatives with spring card drops */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <CodePreview
            title="Raw Code Input"
            code={analysis.originalCode}
            language={analysis.language}
            height="360px"
          />
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-[2rem] blur-xl opacity-30" />
            <CodePreview
              title="AI Optimized Correction"
              code={analysis.correctedCode}
              language={analysis.language}
              height="360px"
            />
          </div>
        </div>

        {/* Chat assistant and CRUD comments panel grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 px-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/10 shadow-lg text-glow">
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Interactive Chat</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  Debate refactoring constraints in real time
                </p>
              </div>
            </div>
            <ChatInterface analysisId={id} initialMessages={analysis.chatHistory || []} />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 px-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/10 shadow-lg text-glow">
                <Terminal size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Developer Notes Drawer</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  Persist structural custom checklist edits
                </p>
              </div>
            </div>
            <CommentsSection analysisId={id} initialComments={analysis.comments || []} />
          </div>

        </div>

      </div>
    </Layout>
  );
}
