import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { authService } from "../utils/api";
import { useSound } from "../utils/useSound";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { playSound } = useSound();

  useEffect(() => {
    if (location.search.includes("expired=true")) {
      setError("Your secure session expired. Please sign in again.");
    }
  }, [location]);

  // Mouse coordinate spotlight
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    playSound("click");

    try {
      const { data } = await authService.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      playSound("success");
      toast.success(`Welcome back, ${data.user.name}`);
      navigate("/");
    } catch (err) {
      playSound("error");
      const errorMsg = err.response?.data?.message || "Invalid email or password.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-14 pt-24">
        <div className="mx-auto grid w-full max-w-[1200px] items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          
          <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="spotlight-card hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.06),transparent_40%),linear-gradient(180deg,rgba(15,23,42,0.25)_0%,rgba(9,15,28,0.45)_100%)] p-12 backdrop-blur-xl lg:flex lg:flex-col lg:justify-center lg:gap-12"
          >
            <div className="max-w-md">
              <p className="eyebrow mb-4 text-sky-400 text-glow">Secure Workspace Access</p>
              <h1 className="text-3xl font-bold tracking-tight text-white leading-snug">
                Iterate on logical reviews inside secure environment.
              </h1>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                Log in to recall historical analysis runs, add checklist notes, discuss optimizations, and deploy custom shared reports.
              </p>
            </div>
            <div className="grid gap-3.5">
              {[
                "Saved analyses dashboard records database",
                "Private and public-share dynamic gates option",
                "Interactive senior AI bot consultant chat history"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/5 bg-slate-950/40 px-5 py-3.5 text-xs text-slate-400 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="spotlight-card rounded-[2.5rem] border border-white/10 bg-slate-950/30 p-8 shadow-2xl backdrop-blur-xl sm:p-12"
          >
            <div className="mx-auto max-w-md">
              <div className="mb-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300 text-glow border border-sky-400/15 shadow-inner">
                  <LogIn size={20} />
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-white">
                  Welcome back
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Authenticate your credentials to activate nexus.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden rounded-2xl border border-red-500/15 bg-red-500/5 px-5 py-3.5 text-[11px] text-red-400"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Email address
                  </span>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@example.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-xs text-white placeholder:text-slate-600 focus:border-sky-400/30 focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Secure Password
                  </span>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-12 text-xs text-white placeholder:text-slate-600 focus:border-sky-400/30 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-sky-400 text-xs font-bold text-slate-950 shadow-xl shadow-sky-400/10 hover:bg-sky-300 text-glow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {loading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-slate-900/20 border-t-slate-900 animate-spin" />
                  ) : (
                    <>
                      Sign In to Account
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-xs text-slate-500 font-medium">
                New developer?{" "}
                <Link
                  to="/auth/register"
                  onClick={() => playSound("click")}
                  className="font-bold text-slate-300 hover:text-sky-300 underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
