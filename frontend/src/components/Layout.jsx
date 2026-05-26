import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="relative min-height-screen overflow-x-hidden">
      {/* Visual top grid alignment cover */}
      <div className="absolute inset-0 grid-overlay z-0 pointer-events-none" />

      {/* Main navigation header */}
      <Navbar />

      {/* Primary child viewport container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
