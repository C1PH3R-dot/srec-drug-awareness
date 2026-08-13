import { useEffect, useRef, useState } from "react";
import { Pause, Phone, Play, Volume2, VolumeX } from "lucide-react";

const WORDS = ["Your Future", "Your Mind", "Your Family", "Your Campus"];

export function Hero() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
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
    <section id="top" className="mx-auto max-w-7xl px-4 pt-16 pb-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
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
          <video
            ref={videoRef}
            src="/drug-free.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="aspect-video w-full rounded-2xl bg-secondary object-cover"
          />
          <div className="absolute right-5 bottom-5 flex gap-2">
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

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
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
