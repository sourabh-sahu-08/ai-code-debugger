import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm"
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal dialogue box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-slate-500 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/10 mb-6">
              <AlertTriangle size={20} />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{message}</p>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="rounded-xl bg-red-500 hover:bg-red-400 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/10"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
