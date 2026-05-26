import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Cpu,
  Layers3,
  ShieldCheck,
  Sparkles,
  Terminal,
  Keyboard,
  FileCode
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CodeEditor from "../components/CodeEditor";
import AnalysisResults from "../components/AnalysisResults";
import Layout from "../components/Layout";
import { analysisService } from "../utils/api";
import { useSound } from "../utils/useSound";

export default function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`function sumVisiblePrices(items) {
  // Filter only visible active inventory items
  return items
    .filter((item) => item.visible)
    .reduce((total, item) => total + item.price, 0);
}`);
  const [language, setLanguage] = useState("javascript");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Real-time keycap visual simulator state
  const [keysPressed, setKeysPressed] = useState({ ctrl: false, enter: false });

  const { playSound } = useSound();

  const steps = [
    "Compiling system context...",
    "Scanning logical constraints...",
    "Analyzing security vulnerabilities...",
    "Structuring corrective models..."
  ];

  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" }
  ];

  // Dynamic Cursor Spotlight
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleAnalyze = async () => {
    if (!isLoggedIn) {
      playSound("error");
      toast.error("Authentication Required", {
        description: "Please register or sign in to run standard AI code reviews."
      });
      navigate("/auth/register");
      return;
    }

    playSound("swoosh");
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const response = await analysisService.analyze({ code, language });
      setResult(response.data.data);
      playSound("success");
      toast.success("Analysis complete!");
    } catch (err) {
      playSound("error");
      const errorMsg = err.response?.data?.message || "Could not analyze the snippet. Check API key.";
      setError(errorMsg);
      toast.error("Analysis failed", { description: errorMsg });
    } finally {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
    }
  };

  // Keyboard shortcut simulator effect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Control") {
        setKeysPressed((prev) => ({ ...prev, ctrl: true }));
      }
      if (e.key === "Enter") {
        setKeysPressed((prev) => ({ ...prev, enter: true }));
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (!isAnalyzing && code.trim()) {
          handleAnalyze();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Control") {
        setKeysPressed((prev) => ({ ...prev, ctrl: false }));
      }
      if (e.key === "Enter") {
        setKeysPressed((prev) => ({ ...prev, enter: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [code, isAnalyzing, isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // Pre-analysis instant metrics compiler
  const getMetrics = () => {
    const lines = code.split("\n");
    const chars = code.length;
    const commentLines = lines.filter(
      (line) =>
        line.trim().startsWith("//") ||
        line.trim().startsWith("/*") ||
        line.trim().startsWith("*")
    ).length;
    const commentRatio = lines.length ? Math.round((commentLines / lines.length) * 100) : 0;

    let complexity = "O(1)";
    const lowercaseCode = code.toLowerCase();
    if (
      (lowercaseCode.match(/for/g) || []).length > 1 ||
      (lowercaseCode.includes("for") && lowercaseCode.includes("nested"))
    ) {
      complexity = "O(N²)";
    } else if (
      lowercaseCode.includes("for") ||
      lowercaseCode.includes("while") ||
      lowercaseCode.includes("map") ||
      lowercaseCode.includes("reduce") ||
      lowercaseCode.includes("filter")
    ) {
      complexity = "O(N)";
    } else if (
      lowercaseCode.includes("binary") ||
      lowercaseCode.includes("split") ||
      lowercaseCode.includes("search")
    ) {
      complexity = "O(log N)";
    }

    return { linesCount: lines.length, chars, commentRatio, complexity };
  };

  const metrics = getMetrics();

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden xl:flex-row pt-16">
        {/* Left main workspace */}
        <main className="flex min-w-0 flex-1 flex-col border-b border-white/10 xl:border-b-0 xl:border-r">
          
          {/* Header section with HSL spotlights */}
          <section 
            onMouseMove={handleMouseMove}
            className="spotlight-card border-b border-white/10 px-6 py-6 transition-all"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="eyebrow mb-2 text-sky-400 text-glow">Secure AI Neural Core</p>
                  <h1 className="section-title text-balance text-white">
                    Audit code at compilation speed.
                  </h1>
                  <p className="mt-3 text-sm text-slate-400">
                    Submit code snippets below to run deep logic verification, security compliance scans, and algorithmic structure tuning.
                  </p>
                </div>

                {/* Dashboard micro metrics grids */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {[
                    { icon: BrainCircuit, label: "Reasoning", value: "Step-by-step" },
                    { icon: ShieldCheck, label: "Security", value: "OWASP-vetted" },
                    { icon: Layers3, label: "Response", value: "Structured" },
                    { icon: Cpu, label: "Processor", value: "Groq LLaMA" }
                  ].map((item) => (
                    <motion.div
                      whileHover={{ scale: 1.03, y: -2 }}
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 backdrop-blur-md"
                    >
                      <item.icon size={15} className="text-sky-300 text-glow" />
                      <p className="mt-2 text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-white">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Actionbar controls */}
          <section className="flex min-h-0 flex-1 flex-col px-6 py-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300 text-glow">
                  <Terminal size={17} />
                </div>
                <div>
                  <p className="eyebrow text-sky-400/70 text-[9px]">Developer Workspace</p>
                  <p className="text-xs text-slate-400">
                    Paste raw routines inside standard transparent container.
                  </p>
                </div>
              </div>

              {/* Selector & buttons container */}
              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => {
                    playSound("click");
                    setLanguage(e.target.value);
                  }}
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs font-medium text-white outline-none focus:ring-1 focus:ring-sky-400/30"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !code.trim()}
                  className={`flex h-11 items-center gap-2 rounded-2xl px-5 text-xs font-bold transition-all ${
                    isAnalyzing || !code.trim()
                      ? "cursor-not-allowed border border-white/10 bg-white/5 text-slate-500"
                      : "bg-sky-400 text-slate-950 hover:bg-sky-300 text-glow"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-slate-900/20 border-t-slate-900 animate-spin" />
                      {steps[analysisStep]}
                    </>
                  ) : isLoggedIn ? (
                    <>
                      Run Analysis
                      <ArrowRight size={14} />
                    </>
                  ) : (
                    <>
                      Sign Up to Run
                      <ArrowRight size={14} />
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Monaco transparent container with relative indicators */}
            <div className="relative flex min-h-0 flex-1 flex-col">
              <div 
                onMouseMove={handleMouseMove}
                className="spotlight-card glass min-h-0 flex-1 overflow-hidden rounded-[2rem] border border-white/10"
              >
                <CodeEditor value={code} onChange={setCode} language={language} />
              </div>

              {/* Dynamic status widgets at the bottom of the editor */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4 px-2.5">
                
                {/* 1. Real-time pre-analysis compiler metrics bar */}
                <div className="flex flex-wrap items-center gap-5 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-full px-3 py-1">
                    <FileCode size={12} className="text-sky-300" />
                    Lines: <strong className="text-white">{metrics.linesCount}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-full px-3 py-1">
                    Char Count: <strong className="text-white">{metrics.chars}</strong>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-full px-3 py-1">
                    Comments: <strong className="text-white">{metrics.commentRatio}%</strong>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-full px-3 py-1">
                    Estimated Tier: <strong className="text-sky-300 text-glow">{metrics.complexity}</strong>
                  </span>
                </div>

                {/* 2. Interactive keystroke simulation panel */}
                <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-full px-3.5 py-1">
                  <Keyboard size={12} className="text-slate-500" />
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mr-1.5">Hotkeys:</span>
                  <div className={`keycap h-5 px-1.5 text-[9px] font-bold ${keysPressed.ctrl ? "active" : ""}`}>
                    Ctrl
                  </div>
                  <span className="text-[9px] text-slate-600 font-bold">+</span>
                  <div className={`keycap h-5 px-1.5 text-[9px] font-bold ${keysPressed.enter ? "active" : ""}`}>
                    Enter
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        {/* Right side static/dynamic output aside panel */}
        <aside className="flex w-full flex-col xl:w-[440px]">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 text-glow animate-pulse">
                <Sparkles size={17} />
              </div>
              <div>
                <p className="eyebrow text-emerald-400/70 text-[9px]">Auditing Drawer</p>
                <p className="text-xs text-slate-400">
                  Observe deep neural feedback checks.
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 px-6 py-6">
            <div 
              onMouseMove={handleMouseMove}
              className="spotlight-card glass flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[2rem] border border-white/10"
            >
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 18 }}
                    className="flex flex-1 flex-col items-center justify-center px-10 text-center relative z-10"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-sky-400/10 text-sky-300 shadow-lg shadow-sky-500/10 text-glow">
                      <Cpu size={36} className="animate-spin" />
                    </div>
                    <h3 className="mt-8 text-base font-bold text-white tracking-tight">
                      Analyzing code signature...
                    </h3>
                    <div className="mt-4 w-44 h-1 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div 
                        className="absolute inset-y-0 bg-sky-400 rounded-full"
                        initial={{ left: "-30%", width: "30%" }}
                        animate={{ left: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-slate-500 max-w-xs leading-relaxed">
                      {steps[analysisStep]}
                    </p>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="min-h-0 flex-1 overflow-hidden relative z-10"
                  >
                    <AnalysisResults data={result} />
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 flex-col items-center justify-center px-10 text-center relative z-10"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-red-500/10 text-red-400 text-glow">
                      <Code2 size={28} />
                    </div>
                    <h3 className="mt-5 text-sm font-bold text-white">Auditing Interrupted</h3>
                    <p className="mt-2 text-xs text-slate-500 max-w-xs">{error}</p>
                    <button
                      onClick={handleAnalyze}
                      className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-300 hover:bg-red-500/15"
                    >
                      Retry Audit
                    </button>
                  </motion.div>
                ) : !isLoggedIn ? (
                  <motion.div
                    key="guest-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 flex-col justify-between p-7 relative z-10"
                  >
                    <div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-sky-400/10 text-sky-300 text-glow">
                        <Sparkles size={28} className="animate-bounce" style={{ animationDuration: "3s" }} />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-white">
                        Unlock Dynamic AI Audits
                      </h3>
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        Become a registered developer to audit syntax files, detect logical bugs, and compile instant dynamic fixes.
                      </p>
                    </div>

                    <div className="grid gap-2.5 my-4">
                      {[
                        { title: "Logical Code Audits", desc: "Checks boundaries, loops, and potential null variables." },
                        { title: "OWASP Vulnerability Scans", desc: "Detects injection vulnerabilities and unsafe dependencies." },
                        { title: "Interactive AI Consultations", desc: "Discuss refactoring strategies with our senior AI bot." }
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-white/5 bg-slate-950/50 p-3 hover:border-sky-400/10 transition-colors"
                        >
                          <p className="text-[10px] font-bold text-white uppercase tracking-wider">{item.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/auth/register"
                      onClick={() => playSound("click")}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-sky-400 text-xs font-bold text-slate-950 shadow-lg shadow-sky-400/10 hover:bg-sky-300 text-glow active:scale-95"
                    >
                      Start Free Audit Session
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 flex-col justify-between p-7 relative z-10"
                  >
                    <div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/[0.03] text-slate-500">
                        <Code2 size={28} />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-white">
                        Idle Workspace
                      </h3>
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        Input a script or code block into the Monaco editor, select its syntax, and click "Run Analysis" to boot the audit checklist.
                      </p>
                    </div>

                    <div className="grid gap-2.5 my-4">
                      {[
                        "Live Edge-Case Logic Diagnostics",
                        "OWASP-Focused Code Security Scans",
                        "Automatic Code Optimization and Repair Suggestions"
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs text-slate-400 font-medium"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
