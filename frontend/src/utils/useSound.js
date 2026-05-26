import { useEffect, useRef, useState } from "react";

export function useSound() {
  const [muted, setMuted] = useState(() => {
    return localStorage.getItem("ui_muted") === "true";
  });
  
  const audioCtxRef = useRef(null);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("ui_muted", String(next));
      return next;
    });
  };

  const playSound = (type) => {
    if (muted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "click") {
        // Premium UI tick
        osc.type = "sine";
        osc.frequency.setValueAtTime(950, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.06);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "success") {
        // Light clean ascending chord chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6
        
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === "error") {
        // Buzz tone
        osc.type = "sine";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
        
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "swoosh") {
        // Swoosh wave
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.35);
        
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        
        osc.start(now);
        osc.stop(now + 0.38);
      }
    } catch (e) {
      console.warn("Audio synthesis context issue", e);
    }
  };

  return { playSound, muted, toggleMute };
}
