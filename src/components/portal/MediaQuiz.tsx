import { useState } from "react";
import { Newspaper, RotateCcw } from "lucide-react";

const NEWS = [
  { title: "SREC hosts district-level anti-drug rally", tag: "Campus", date: "Mar 2026" },
  { title: "NSS unit trains 200 peer counsellors", tag: "Initiative", date: "Feb 2026" },
  { title: "Coimbatore police launch campus watch drive", tag: "City", date: "Jan 2026" },
  { title: "Workshop: recognising early warning signs", tag: "Workshop", date: "Dec 2025" },
  { title: "Student art contest on de-addiction", tag: "Culture", date: "Nov 2025" },
  { title: "Pledge drive crosses 3,000 signatures", tag: "Milestone", date: "Oct 2025" },
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Media Hub</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NEWS.map((n) => (
          <article
            key={n.title}
            className="group glass relative aspect-square overflow-hidden rounded-3xl p-6"
          >
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="mt-4 block text-[11px] font-bold tracking-wider text-primary uppercase">
              {n.tag} &middot; {n.date}
            </span>
            <h3 className="mt-2 text-lg font-bold text-foreground">{n.title}</h3>
            <div className="glass absolute inset-0 flex translate-y-full items-center justify-center p-6 text-center text-sm font-semibold text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Read how the SREC community turned this into campus-wide action.
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
                  const correct = picked !== null && i === QUESTIONS[step].a;
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
