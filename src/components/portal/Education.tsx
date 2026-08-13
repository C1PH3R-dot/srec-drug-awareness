import { useState } from "react";
import { Brain, HeartPulse, Users, X } from "lucide-react";

type Drug = {
  id: string;
  cat: "Opioids" | "Stimulants" | "Depressants" | "Synthetics";
  name: string;
  short: string;
  effects: string[];
  risk: string;
};

const DRUGS: Drug[] = [
  {
    id: "heroin",
    cat: "Opioids",
    name: "Heroin & Prescription Opioids",
    short: "Powerful painkillers with extreme dependency risk.",
    effects: ["Slowed breathing", "Severe withdrawal", "Collapsed veins", "Overdose death"],
    risk: "Very High",
  },
  {
    id: "meth",
    cat: "Stimulants",
    name: "Methamphetamine & Cocaine",
    short: "Speed up the central nervous system dangerously.",
    effects: ["Irregular heartbeat", "Paranoia", "Insomnia", "Stroke risk"],
    risk: "High",
  },
  {
    id: "benzo",
    cat: "Depressants",
    name: "Benzodiazepines & Alcohol",
    short: "Sedatives that impair judgement and memory.",
    effects: ["Blackouts", "Liver damage", "Respiratory failure", "Dependency"],
    risk: "High",
  },
  {
    id: "cannabis",
    cat: "Depressants",
    name: "Cannabis / Ganja",
    short: "Impairs concentration and academic performance.",
    effects: ["Memory loss", "Amotivation", "Anxiety", "Psychosis risk"],
    risk: "Moderate",
  },
  {
    id: "mdma",
    cat: "Synthetics",
    name: "MDMA & Party Pills",
    short: "Lab-made stimulants sold under fake names.",
    effects: ["Hyperthermia", "Dehydration", "Serotonin crash", "Depression"],
    risk: "High",
  },
  {
    id: "spice",
    cat: "Synthetics",
    name: "Synthetic Cannabinoids (Spice)",
    short: "Unpredictable chemicals sprayed on plant matter.",
    effects: ["Seizures", "Violent behaviour", "Kidney injury", "Hallucinations"],
    risk: "Very High",
  },
];

const TABS = ["All", "Opioids", "Stimulants", "Depressants", "Synthetics"] as const;

const CAUSES = [
  {
    icon: Users,
    title: "Causes of Abuse",
    points: ["Peer pressure & hostel culture", "Academic burnout", "Family conflict", "Curiosity & easy access"],
  },
  {
    icon: Brain,
    title: "Psychological Symptoms",
    points: ["Mood swings & irritability", "Secretive behaviour", "Loss of interest in studies", "Sleep pattern changes"],
  },
  {
    icon: HeartPulse,
    title: "Mental Health Impact",
    points: ["Anxiety & depression", "Memory & focus decline", "Suicidal ideation", "Social withdrawal"],
  },
];

export function Education() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [active, setActive] = useState<Drug | null>(null);
  const list = tab === "All" ? DRUGS : DRUGS.filter((d) => d.cat === tab);

  return (
    <section id="awareness" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Educational Hub</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Know the causes, spot the signs, understand the damage. Awareness is the strongest defence a
        campus can build.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {CAUSES.map((c) => (
          <div key={c.title} className="glass glass-hover rounded-3xl p-6">
            <c.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-bold text-foreground">{c.title}</h3>
            <ul className="mt-3 space-y-2">
              {c.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-2">
        <h3 className="mr-4 text-xl font-bold text-foreground">Drug Types</h3>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              t === tab
                ? "rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                : "glass rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d, idx) => (
          <button
            key={d.id}
            onClick={() => setActive(d)}
            className={`glass glass-hover rounded-3xl p-6 text-left ${idx === 0 ? "lg:row-span-2 lg:flex lg:flex-col lg:justify-between" : ""}`}
          >
            <div>
              <span className="text-[11px] font-bold tracking-wider text-primary uppercase">
                {d.cat}
              </span>
              <h4 className="mt-2 text-lg font-bold text-foreground">{d.name}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{d.short}</p>
            </div>
            <p className="mt-4 text-xs font-semibold text-foreground">Risk level: {d.risk}</p>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[oklch(0.15_0.03_264_/_65%)] p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="glass w-full max-w-lg rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-primary uppercase">
                  {active.cat}
                </span>
                <h3 className="mt-1 text-2xl font-bold text-foreground">{active.name}</h3>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{active.short}</p>
            <h4 className="mt-5 text-sm font-bold text-foreground">Health effects</h4>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {active.effects.map((e) => (
                <li
                  key={e}
                  className="rounded-xl bg-secondary px-3 py-2 text-sm text-secondary-foreground"
                >
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-semibold text-destructive">Risk level: {active.risk}</p>
          </div>
        </div>
      )}
    </section>
  );
}
