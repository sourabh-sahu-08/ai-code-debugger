import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { analysisService } from "../../utils/api";
import { useSound } from "../../utils/useSound";
import { toast } from "sonner";

export default function CommentsSection({ analysisId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const { playSound } = useSound();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!note.trim() || loading) return;

    playSound("click");
    setLoading(true);
    try {
      const response = await analysisService.addComment(analysisId, note.trim());
      setComments(response.data.data);
      setNote("");
      toast.success("Note saved!");
      playSound("success");
    } catch (err) {
      playSound("error");
      toast.error("Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    playSound("click");
    try {
      const response = await analysisService.deleteComment(analysisId, commentId);
      setComments(response.data.data);
      toast.success("Note deleted");
    } catch (err) {
      playSound("error");
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="glass flex h-[450px] flex-col rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
      
      {/* Scrollable list */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div 
              key={comment._id}
              className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1">
                <p className="font-mono text-[11px] text-slate-300 leading-relaxed">
                  {comment.text}
                </p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  {new Date(comment.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <button
                onClick={() => handleDelete(comment._id)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1.5 rounded bg-white/5 hover:bg-red-500/10 transition-all shrink-0"
                title="Delete note"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
            <p className="text-xs font-bold uppercase tracking-wider mb-1">Nexus Ledger Empty</p>
            <p className="text-[10px] text-slate-600 max-w-xs leading-relaxed">
              No developer notes have been recorded for this analysis. Input a custom task check list note below.
            </p>
          </div>
        )}
      </div>

      {/* Input panel bar */}
      <form onSubmit={handleAdd} className="border-t border-white/5 bg-slate-950/40 p-4 flex gap-2">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Persist a code correction checklist task..."
          className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !note.trim()}
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
            !note.trim() || loading 
              ? "bg-white/5 text-slate-600 cursor-not-allowed" 
              : "bg-sky-400 text-slate-950 hover:bg-sky-300"
          }`}
        >
          <Plus size={14} />
        </button>
      </form>
    </div>
  );
}
