import { useEffect, useRef, useState } from "react";
import { Pause, Phone, Play, Volume2, VolumeX } from "lucide-react";
import LightTunnel from "../LightTunnel";
import "../LightTunnel.css";

const WORDS = ["Your Future", "Your Mind", "Your Family", "Your Campus"];

export function Hero() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true); // Track video load state
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="top" className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LightTunnel
          cableColor="#06B6D4"
          pulseColor="#06B6D4"
          tunnelColor="#06B6D4"
          flowDirection="inward"
          mouseInteraction={true}
          opacity={0.8}
        />
      </div>
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            Official Student Initiative
          </span>
          <h1 className="mt-6 text-5xl leading-[1.05] font-extrabold text-foreground sm:text-6xl lg:text-7xl">
            Shatter the Chain.
            <br />
            <span className="text-gradient">Choose Life.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Protect{" "}
            <span key={i} className="font-semibold text-primary animate-in fade-in slide-in-from-bottom-2">
              {WORDS[i]}
            </span>{" "}
            — an official student initiative for a drug-free campus at Sri Ramakrishna Engineering
            College, Coimbatore.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#pledge"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground glow-ring transition-transform hover:scale-105"
            >
              Take Anti-Drug Pledge
            </a>
            <a
              href="#helplines"
              className="glass glass-hover flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" /> Emergency Helplines
            </a>
          </div>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-2">
          <div className="aspect-video w-full relative rounded-2xl bg-secondary">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setIsVideoLoading(false)} // Hides overlay once video plays
              className="w-full h-full object-cover rounded-2xl"
            >
              <source src="/DRUG.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Render overlay ONLY when video is actively loading */}
            {isVideoLoading && (
              <div className="absolute inset-0 rounded-2xl backdrop-blur-md bg-gradient-to-br from-slate-900/40 via-cyan-900/20 to-slate-900/40 animate-pulse flex items-center justify-center shadow-2xl border border-cyan-500/10 pointer-events-none">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full border-3 border-cyan-400/30 border-t-cyan-400 animate-spin"></div>
                  <p className="text-sm font-medium text-cyan-400/70">Loading campaign video...</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute right-5 bottom-5 flex gap-2 z-10">
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
              className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full text-foreground"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full text-foreground"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 grid gap-3 sm:grid-cols-3">
        {[
          ["1 in 8", "students report peer pressure to try substances"],
          ["90%", "of addictions begin before the age of 25"],
          ["100%", "preventable with awareness and support"],
        ].map(([stat, label]) => (
          <div key={stat} className="glass glass-hover rounded-2xl p-5">
            <p className="font-display text-3xl font-bold text-primary">{stat}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}