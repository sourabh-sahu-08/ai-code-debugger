import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#050a15] text-[#f1f5f9] overflow-x-hidden selection:bg-sky-500/20 selection:text-white">
      {/* Background radial effects */}
      <div className="absolute inset-0 z-0 pointer-events-none grid-overlay" />
      
      <Navbar />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
