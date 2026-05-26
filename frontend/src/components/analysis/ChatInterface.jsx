import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import { analysisService } from "../../utils/api";
import { useSound } from "../../utils/useSound";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatInterface({ analysisId, initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const { playSound } = useSound();

  // Scroll feed to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    playSound("swoosh");
    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // optimistic user update
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await analysisService.chat(analysisId, userMessage);
      setMessages(response.data.data);
      playSound("success");
    } catch (err) {
      playSound("error");
      console.error("Chat failure", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass flex h-[450px] flex-col rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
      
      {/* Messages Feed */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-glow border ${
              msg.role === "user" 
                ? "bg-sky-400/10 text-sky-300 border-sky-400/15" 
                : "bg-emerald-400/10 text-emerald-300 border-emerald-400/15"
            }`}>
              {msg.role === "user" ? <User size={13} /> : <Sparkles size={13} />}
            </div>
            
            <div className={`rounded-2xl px-4 py-3 text-xs max-w-[80%] leading-relaxed ${
              msg.role === "user" 
                ? "bg-sky-500/5 text-slate-200 border border-sky-400/10" 
                : "bg-slate-900/50 text-slate-300 border border-white/5"
            }`}>
              <p className="whitespace-pre-wrap font-mono">{msg.content}</p>
            </div>
          </div>
        ))}

        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 border border-emerald-400/15">
                <Sparkles size={13} className="animate-spin" />
              </div>
              <div className="rounded-2xl bg-slate-900/50 border border-white/5 px-4 py-3 text-xs text-slate-500">
                Evaluating...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input panel bar */}
      <form onSubmit={handleSend} className="border-t border-white/5 bg-slate-950/40 p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Inquire about complexity matrices or security models..."
          className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
            !input.trim() || loading 
              ? "bg-white/5 text-slate-600 cursor-not-allowed" 
              : "bg-sky-400 text-slate-950 hover:bg-sky-300"
          }`}
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
