import { useState, type FormEvent } from "react";
import confetti from "canvas-confetti";
import { Printer, Sparkles } from "lucide-react";

type Cert = { name: string; roll: string; dept: string; date: string };

const DEPTS = [
  "Computer Science and Engineering",
  "Information Technology",
  "Electronics and Communication",
  "Electrical and Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence and Data Science",
];

export function Pledge() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [dept, setDept] = useState(DEPTS[0]);
  const [agreed, setAgreed] = useState(false);
  const [cert, setCert] = useState<Cert | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !roll.trim() || !agreed) return;
    setCert({
      name: name.trim(),
      roll: roll.trim(),
      dept,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
    void confetti({ particleCount: 160, spread: 80, origin: { y: 0.7 } });
    setTimeout(() => void confetti({ particleCount: 90, spread: 110, origin: { y: 0.6 } }), 300);
  };

  const field =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <section id="pledge" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Anti-Drug Pledge</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Sign the pledge and receive your personalised Certificate of Appreciation instantly.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                Student Name
              </label>
              <input
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aravind Kumar"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                Roll Number
              </label>
              <input
                className={field}
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="e.g. 71762233045"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-foreground">
                Department
              </label>
              <select className={field} value={dept} onChange={(e) => setDept(e.target.value)}>
                {DEPTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-secondary p-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--primary)]"
              />
              <span className="text-sm text-secondary-foreground">
                I pledge to stay away from all narcotic and psychotropic substances, to support
                friends in need, and to help keep SREC a drug-free campus.
              </span>
            </label>
            <button
              type="submit"
              disabled={!name.trim() || !roll.trim() || !agreed}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform enabled:hover:scale-[1.02] disabled:opacity-45"
            >
              <Sparkles className="h-4 w-4" /> Submit Pledge
            </button>
          </div>
        </form>

        <div className="glass rounded-3xl p-6 sm:p-8">
          {cert ? (
            <>
              <div
                id="certificate"
                className="rounded-3xl border-2 border-primary bg-card p-8 text-center"
              >
                <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
                  Sri Ramakrishna Engineering College
                </p>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-card-foreground">
                  Certificate of Appreciation
                </h3>
                <p className="mt-6 text-sm text-muted-foreground">This is proudly presented to</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">{cert.name}</p>
                <p className="mt-2 text-sm text-card-foreground">
                  {cert.dept} &middot; Roll No. {cert.roll}
                </p>
                <p className="mx-auto mt-6 max-w-sm text-sm text-muted-foreground">
                  for taking the Anti-Drug Pledge and committing to a healthy, drug-free campus
                  community.
                </p>
                <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Date: {cert.date}</span>
                  <span>Dr. A. Soundarrajan, Principal</span>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="glass glass-hover mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-foreground"
              >
                <Printer className="h-4 w-4 text-primary" /> Print Certificate
              </button>
            </>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <Sparkles className="h-8 w-8 text-primary" />
              <p className="mt-3 font-semibold text-foreground">Your certificate appears here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete the pledge form to generate your printable certificate.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
