import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#050a15]/30 py-8 px-6 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 md:flex-row text-xs text-slate-500 font-medium">
        <p>© 2026 AI Code Reviewplatform (khudsekrle). Secure neural processing workspace.</p>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-white transition-colors">Workspace</Link>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Security Registry</a>
        </div>
      </div>
    </footer>
  );
}
