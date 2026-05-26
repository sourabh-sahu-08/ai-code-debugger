import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle, Code, FileText } from "lucide-react";
import CodePreview from "./shared/CodePreview";
import { useSound } from "../utils/useSound";

export default function AnalysisResults({ data }) {
  const [activeTab, setActiveTab] = useState("findings");
  const { playSound } = useSound();

  const handleTabChange = (tab) => {
    playSound("click");
    setActiveTab(tab);
  };

  const tabs = [
    { id: "findings", label: "Findings", icon: AlertCircle },
    { id: "code", label: "Code Fix", icon: Code },
    { id: "explanation", label: "Logic", icon: FileText }
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Dynamic Tab Switchers */}
      <div className="flex border-b border-white/10 bg-slate-900/30 px-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? "border-sky-400 text-sky-300"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6 scroll-smooth">
        {activeTab === "findings" && (
          <div className="space-y-5 animate-pulse" style={{ animationDuration: "15s" }}>
            <div className="flex items-center gap-2 text-emerald-400 text-glow">
              <CheckCircle size={15} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Quality Audit complete</span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-white/5 shadow-inner">
              {data.findings}
            </pre>
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-4 flex items-center justify-between">
              <div className="text-[11px] font-medium text-slate-400">
                Time: <strong className="text-white">{data.timeComplexity || "O(1)"}</strong> | Memory: <strong className="text-white">{data.spaceComplexity || "O(1)"}</strong>
              </div>
              <div className="text-sky-300 font-bold text-xs text-glow uppercase tracking-wider">
                Optimized Fixing
              </div>
            </div>
            <CodePreview
              title="Drop-in Replacement"
              code={data.correctedCode}
              language="javascript"
              height="280px"
            />
          </div>
        )}

        {activeTab === "explanation" && (
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-slate-500">Refactoring Reason</h4>
            <p className="font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-5 rounded-2xl border border-white/5 whitespace-pre-wrap">
              {data.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
