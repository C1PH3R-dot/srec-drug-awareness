import { useState } from "react";
import { Newspaper, RotateCcw } from "lucide-react";

const NEWS = [
  {
    title: "SREC hosts district-level anti-drug rally",
    tag: "CAMPUS",
    date: "Mar 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    description: "Over 500 students and faculty participated in the awareness rally.",
  },
  {
    title: "NSS unit trains 200 peer counsellors",
    tag: "INITIATIVE",
    date: "Feb 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    description: "Training program on identifying early signs and providing support.",
  },
  {
    title: "Coimbatore police launch campus watch drive",
    tag: "CITY",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    description: "Joint effort with law enforcement for a safer campus environment.",
  },
  {
    title: "Workshop: recognising early warning signs",
    tag: "WORKSHOP",
    date: "Dec 2025",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "Educate students and staff on behavioral and physical indicators.",
  },
  {
    title: "Student art contest on de-addiction",
    tag: "CULTURE",
    date: "Nov 2025",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
    description: "Creative expression and awareness through student artwork.",
  },
  {
    title: "Pledge drive crosses 3,000 signatures",
    tag: "MILESTONE",
    date: "Oct 2025",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    description: "Community commitment to a drug-free campus continues to grow.",
  },
];

const QUESTIONS = [
  {
    q: "Which national helpline offers 24x7 anonymous drug de-addiction support?",
    options: ["1933 (MANAS)", "1800-123", "108", "1091"],
    a: 0,
  },
  {
    q: "Which of these is an early psychological warning sign of substance abuse?",
    options: ["Improved focus", "Sudden secrecy and mood swings", "Better sleep", "More savings"],
    a: 1,
  },
  {
    q: "Synthetic cannabinoids like 'Spice' are dangerous mainly because:",
    options: [
      "They are legal everywhere",
      "Their chemical potency is unpredictable",
      "They contain vitamins",
      "They are non-addictive",
    ],
    a: 1,
  },
  {
    q: "What should you do if a friend shows signs of dependency?",
    options: [
      "Ignore it",
      "Share it on social media",
      "Encourage them to seek counselling and call a helpline",
      "Confront them publicly",
    ],
    a: 2,
  },
  {
    q: "Which emergency number connects to all-in-one emergency services in India?",
    options: ["112", "139", "1800", "144"],
    a: 0,
  },
];

export function MediaQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const done = step >= QUESTIONS.length;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === QUESTIONS[step]!.a) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      setStep((s) => s + 1);
    }, 800);
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setPicked(null);
  };

  const badge = score >= 5 ? "Campus Champion" : score >= 3 ? "Aware Ally" : "Keep Learning";

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-cyan-950/20 to-slate-950/40 animate-gradient-shift"></div>
      </div>
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Media Hub</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {NEWS.map((n) => (
          <article
            key={n.title}
            className="group glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {/* Image Header with Gradient Overlay */}
            <div className="relative h-40 overflow-hidden bg-gradient-to-b from-cyan-600 to-cyan-900">
              <img
                src={n.image}
                alt={n.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

              {/* Tag Pill */}
              <div className="absolute top-3 left-3">
                <span className="inline-block rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  {n.tag}
                </span>
              </div>

              {/* Date Badge */}
              <div className="absolute bottom-3 right-3 text-xs font-semibold text-white">
                {n.date}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-base font-bold text-foreground line-clamp-2 mb-2">
                {n.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {n.description}
              </p>

              {/* Hover Reveal */}
              <div className="mt-3 flex gap-2">
                <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div id="quiz" className="mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Awareness Quiz</h2>
        <p className="mt-2 text-muted-foreground">5 quick questions. Test what you know.</p>

        <div className="glass mt-6 rounded-3xl p-6 sm:p-8">
          {done ? (
            <div className="text-center">
              <p className="font-display text-5xl font-extrabold text-primary">
                {score}/{QUESTIONS.length}
              </p>
              <p className="mt-3 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                {badge}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Share your score with friends and encourage them to take the pledge.
              </p>
              <button
                onClick={reset}
                className="glass glass-hover mx-auto mt-6 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-foreground"
              >
                <RotateCcw className="h-4 w-4 text-primary" /> Retake Quiz
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                <span>Score: {score}</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">{QUESTIONS[step]!.q}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {QUESTIONS[step]!.options.map((o, i) => {
                  const correct = picked !== null && i === QUESTIONS[step]!.a;
                  const wrong = picked === i && i !== QUESTIONS[step]!.a;
                  return (
                    <button
                      key={o}
                      onClick={() => choose(i)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        correct
                          ? "border-primary bg-primary text-primary-foreground"
                          : wrong
                            ? "border-destructive bg-destructive text-destructive-foreground"
                            : "border-border bg-secondary text-secondary-foreground hover:border-primary"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
