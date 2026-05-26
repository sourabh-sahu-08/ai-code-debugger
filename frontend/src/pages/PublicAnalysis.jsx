import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Code2, Globe, Clock, Database, Terminal, Sparkles, CheckCircle } from "lucide-react";
import { analysisService } from "../utils/api";
import Layout from "../components/Layout";
import CodePreview from "../components/shared/CodePreview";
import { motion } from "framer-motion";
import { useSound } from "../utils/useSound";

export default function PublicAnalysis() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { playSound } = useSound();

  useEffect(() => {
    const fetchPublicReport = async () => {
      try {
        if (!id) return;
        const response = await analysisService.getPublic(id);
        setAnalysis(response.data.data);
        playSound("success");
      } catch (err) {
        playSound("error");
        setError(err.response?.data?.message || "Report is private or does not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicReport();
  }, [id]);

  // Mouse coordinate spotlight
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-400/20 border-t-sky-400 shadow-2xl" />
          <p className="text-xs uppercase font-bold tracking-widest text-slate-500">Loading public share report...</p>
        </div>
      </Layout>
    );
  }

  if (error || !analysis) {
    return (
      <Layout>
        <div className="mx-auto max-w-xl px-6 pt-32 text-center">
          <div className="glass p-12 rounded-[2.5rem] border border-red-500/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Access Restrictions</h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              {error || "This code review report has been configured as private by its developer."}
            </p>
            <Link
              to="/"
              onClick={() => playSound("click")}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-sky-400 px-6 text-xs font-bold text-slate-950 hover:bg-sky-300"
            >
              Back to Nexus
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-[1300px] px-6 pb-24 pt-28">
        
        {/* Banner header */}
        <div 
          onMouseMove={handleMouseMove}
          className="spotlight-card rounded-[2.5rem] bg-white/[0.01] border border-white/5 p-8 md:p-12 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={13} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Shared Public Audit Report</span>
            </div>
            <h1 className="section-title text-white">Interactive code analysis.</h1>
            <p className="mt-2 text-xs text-slate-500 max-w-xl">
              Inspect original code blocks, comparative refactoring optimizations, logic descriptions, and computational complexity ratings.
            </p>
          </div>

          <Link
            to="/auth/register"
            onClick={() => playSound("click")}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 text-xs font-bold text-slate-950 hover:bg-sky-300 text-glow"
          >
            Start Free Session
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Complexity ratings cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 bg-sky-400/10 rounded-xl flex items-center justify-center text-sky-400 text-glow">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-slate-500">Time Complexity</p>
              <p className="text-xl font-mono text-white font-bold">{analysis.timeComplexity}</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 text-glow">
              <Database size={20} />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-slate-500">Memory complexity</p>
              <p className="text-xl font-mono text-white font-bold">{analysis.spaceComplexity}</p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 bg-sky-400/10 rounded-xl flex items-center justify-center text-sky-400 text-glow">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-slate-500">Correctness Rating</p>
              <p className="text-xl font-mono text-sky-300 text-glow font-bold">{analysis.confidenceScore}</p>
            </div>
          </div>
        </div>

        {/* Findings and reasoning sheets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div 
            onMouseMove={handleMouseMove}
            className="spotlight-card glass p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={14} className="text-sky-300" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Found flaws</span>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-xs text-slate-300 bg-slate-950/40 p-5 rounded-2xl border border-white/5">
                {analysis.findings}
              </pre>
            </div>
          </div>

          <div 
            onMouseMove={handleMouseMove}
            className="spotlight-card glass p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-sky-300" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Logical Reasoning</span>
              </div>
              <p className="font-mono text-xs text-slate-300 bg-slate-950/40 p-5 rounded-2xl border border-white/5 whitespace-pre-wrap leading-relaxed">
                {analysis.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Code Comparatives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CodePreview
            title="Original Code Input"
            code={analysis.originalCode}
            language={analysis.language}
            height="360px"
          />
          <CodePreview
            title="AI Repaired Correction"
            code={analysis.correctedCode}
            language={analysis.language}
            height="360px"
          />
        </div>

      </div>
    </Layout>
  );
}
