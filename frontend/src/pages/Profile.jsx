import { useEffect, useState } from "react";
import { User, Mail, ShieldAlert, KeyRound, Check, FileCheck } from "lucide-react";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { authService, analysisService } from "../utils/api";
import { useSound } from "../utils/useSound";
import { motion } from "framer-motion";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [languageCounts, setLanguageCounts] = useState({});
  const [totalAnalyses, setTotalAnalyses] = useState(0);

  const [updatingDetails, setUpdatingDetails] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const { playSound } = useSound();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setName(user.name || "");
      setEmail(user.email || "");
    }

    const fetchStats = async () => {
      try {
        const response = await analysisService.getHistory();
        const history = response.data.data;
        setTotalAnalyses(history.length);

        const counts = {};
        history.forEach((item) => {
          counts[item.language] = (counts[item.language] || 0) + 1;
        });
        setLanguageCounts(counts);
      } catch (err) {
        console.error("Failed to load details stats", err);
      }
    };

    fetchStats();
  }, []);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setUpdatingDetails(true);
    playSound("click");

    try {
      const response = await authService.updateDetails({ name, email });
      localStorage.setItem("user", JSON.stringify(response.data.data));
      playSound("success");
      toast.success("Profile details updated successfully!");
    } catch (err) {
      playSound("error");
      toast.error(err.response?.data?.message || "Failed to update profile details.");
    } finally {
      setUpdatingDetails(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      playSound("error");
      toast.error("New passwords do not match!");
      return;
    }

    setUpdatingPassword(true);
    playSound("click");

    try {
      const response = await authService.updatePassword({ currentPassword, newPassword });
      localStorage.setItem("token", response.data.token);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      playSound("success");
      toast.success("Password updated successfully!");
    } catch (err) {
      playSound("error");
      toast.error(err.response?.data?.message || "Failed to update password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  // Mouse coordinate spotlight
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        
        {/* Banner with cursor spotlights */}
        <div 
          onMouseMove={handleMouseMove}
          className="spotlight-card rounded-[2.5rem] bg-white/[0.01] border border-white/5 p-8 md:p-12 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <p className="eyebrow mb-2 text-sky-400 text-glow">Identity hub</p>
            <h1 className="section-title text-white">Manage security context.</h1>
            <p className="mt-3 max-w-xl text-xs text-slate-400">
              Audit personal statistics breakdown, re-configure email links, or rotate credentials keys safely.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details & password forms */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Account Settings card */}
            <motion.div 
              onMouseMove={handleMouseMove}
              className="spotlight-card card-premium p-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <User size={18} className="text-sky-300 text-glow" />
                <h2 className="text-lg font-bold text-white">General Parameters</h2>
              </div>

              <form onSubmit={handleUpdateDetails} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Developer Name
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 px-4 text-xs text-white focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Email Address
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 px-4 text-xs text-white focus:outline-none"
                    />
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={updatingDetails}
                    className="flex h-10 items-center gap-2 rounded-xl bg-sky-400 px-5 text-xs font-bold text-slate-950 hover:bg-sky-300 text-glow disabled:opacity-50"
                  >
                    {updatingDetails ? "Saving..." : "Save Parameters"}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Password rotation card */}
            <motion.div 
              onMouseMove={handleMouseMove}
              className="spotlight-card card-premium p-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <KeyRound size={18} className="text-sky-300 text-glow" />
                <h2 className="text-lg font-bold text-white">Rotate Keys</h2>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Current Password
                    </span>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 px-4 text-xs text-white focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      New Password
                    </span>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 px-4 text-xs text-white focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      Confirm New Password
                    </span>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 px-4 text-xs text-white focus:outline-none"
                    />
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={updatingPassword}
                    className="flex h-10 items-center gap-2 rounded-xl bg-sky-400 px-5 text-xs font-bold text-slate-950 hover:bg-sky-300 text-glow disabled:opacity-50"
                  >
                    {updatingPassword ? "Rotating..." : "Rotate Password Key"}
                  </button>
                </div>
              </form>
            </motion.div>

          </div>

          {/* Visual statistics aside bar */}
          <div className="lg:col-span-4 space-y-6">
            
            <motion.div 
              onMouseMove={handleMouseMove}
              className="spotlight-card glass p-8 rounded-[2rem] border border-white/5 shadow-2xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <FileCheck size={18} className="text-sky-300 text-glow" />
                <h2 className="text-base font-bold text-white">Auditing Analytics</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Audits Ran</p>
                  <p className="text-3xl font-mono font-bold text-white text-glow mt-1">{totalAnalyses}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Language breakdown</p>
                  {Object.keys(languageCounts).length > 0 ? (
                    Object.entries(languageCounts).map(([lang, count]) => {
                      const percentage = totalAnalyses ? Math.round((count / totalAnalyses) * 100) : 0;
                      return (
                        <div key={lang} className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono text-slate-400">
                            <span className="capitalize">{lang}</span>
                            <span>{count} ({percentage}%)</span>
                          </div>
                          <div className="h-1.5 bg-slate-950 border border-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-500">No active history compiled.</p>
                  )}
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </Layout>
  );
}
