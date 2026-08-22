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
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const list = tab === "All" ? DRUGS : DRUGS.filter((d) => d.cat === tab);

  const RISK_DATA = [
    {
      category: "High Risk",
      percentage: 45,
      color: "#ef4444",
      glowColor: "rgba(239, 68, 68, 0.4)",
    },
    {
      category: "Moderate Risk",
      percentage: 35,
      color: "#06b6d4",
      glowColor: "rgba(6, 182, 212, 0.4)",
    },
    {
      category: "Emerging Risk",
      percentage: 20,
      color: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
  ];

  const slices = RISK_DATA.map((data, index) => {
    const startAngle = RISK_DATA.slice(0, index).reduce((sum, d) => sum + d.percentage, 0) * 3.6;
    const endAngle = startAngle + data.percentage * 3.6;
    return { ...data, startAngle, endAngle, index };
  });

  const generateSlicePath = (slice: any) => {
    const outerRadius = 75;
    const innerRadius = 48; // Adjusted donut radius to prevent overlap
    const cx = 100;
    const cy = 100;

    const startRad = ((slice.startAngle - 90) * Math.PI) / 180;
    const endRad = ((slice.endAngle - 90) * Math.PI) / 180;

    const x1Out = cx + outerRadius * Math.cos(startRad);
    const y1Out = cy + outerRadius * Math.sin(startRad);
    const x2Out = cx + outerRadius * Math.cos(endRad);
    const y2Out = cy + outerRadius * Math.sin(endRad);

    const x1In = cx + innerRadius * Math.cos(endRad);
    const y1In = cy + innerRadius * Math.sin(endRad);
    const x2In = cx + innerRadius * Math.cos(startRad);
    const y2In = cy + innerRadius * Math.sin(startRad);

    const largeArc = slice.percentage > 50 ? 1 : 0;

    return `M ${x1Out} ${y1Out} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Out} ${y2Out} L ${x1In} ${y1In} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2In} ${y2In} Z`;
  };

  return (
    <section id="awareness" className="relative mx-auto max-w-7xl px-4 py-16">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-slate-950/30 to-slate-950/50 animate-gradient-shift"></div>
      </div>

      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Drug Types & Risk Assessment</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Understand substance classifications and their risk profiles.
      </p>

      {/* Merged 2-Column Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Left Column: Category Filter + Drug Grid */}
        <div>
          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "glass glass-hover text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Drug Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {list.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d)}
                className="glass glass-hover rounded-2xl p-5 text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
                    {d.cat}
                  </span>
                  <h3 className="mt-1 font-bold text-foreground text-base">{d.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{d.short}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-destructive">Risk: {d.risk}</span>
                  <span className="text-xs text-primary underline">View effects</span>
                </div>
              </button>
            ))}
          </div>

          {/* Educational Causes Grid */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {CAUSES.map((c) => (
              <div key={c.title} className="glass rounded-2xl p-4">
                <c.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-2 text-sm font-bold text-foreground">{c.title}</h3>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Compact Risk Chart Panel */}
        <div className="flex flex-col gap-4">
          <div className="glass rounded-2xl p-5 border border-cyan-500/20">
            <h3 className="text-sm font-bold text-foreground mb-3">Risk Distribution</h3>
            <div className="relative flex justify-center items-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                {slices.map((slice) => (
                  <g
                    key={slice.index}
                    onMouseEnter={() => setHoveredSegment(slice.index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    opacity={hoveredSegment === null || hoveredSegment === slice.index ? 1 : 0.4}
                    className="cursor-pointer transition-opacity duration-200"
                  >
                    <path
                      d={generateSlicePath(slice)}
                      fill={slice.color}
                      stroke="rgba(15, 23, 42, 0.8)"
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </svg>

              {/* Clean Inner Donut Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-bold text-cyan-400">Risk Index</span>
                <span className="text-[10px] text-muted-foreground">Campus Assessment</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {slices.map((slice) => (
              <div key={slice.index} className="glass rounded-xl p-2.5 border border-cyan-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                    <span className="text-xs font-medium text-foreground">{slice.category}</span>
                  </div>
                  <span className="text-xs font-bold text-cyan-400">{slice.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Score Badge */}
          <div className="glass rounded-xl p-3 border border-cyan-500/30 bg-cyan-500/5">
            <p className="text-xs font-medium text-cyan-400">Campus Prevalence Index</p>
            <p className="text-xl font-bold text-foreground mt-0.5">7.8 / 10</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Moderate-High concern across institutions</p>
          </div>
        </div>
      </div>

      {/* Bottom Stat Bar */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {[
          { label: "High-Risk Substances", value: "12+", icon: "🔴" },
          { label: "Avg. Onset Age", value: "19-22", icon: "📊" },
          { label: "Addiction Rate", value: "65%", icon: "⚠️" },
          { label: "Recovery Possible", value: "Yes", icon: "✅" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-full px-4 py-2 border border-cyan-500/20 flex items-center gap-2">
            <span className="text-sm">{stat.icon}</span>
            <span className="text-xs font-semibold text-muted-foreground">{stat.label}:</span>
            <span className="text-xs font-bold text-cyan-400">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Drug Details Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="glass w-full max-w-lg rounded-3xl p-6 border border-primary/30"
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
                  className="rounded-xl bg-secondary/50 p-2.5 text-xs text-foreground flex items-center gap-2"
                >
                  <span className="text-cyan-400">•</span> {e}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-lg bg-destructive/10 p-3 border border-destructive/20">
              <p className="text-xs font-bold text-destructive uppercase">Risk level: {active.risk}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}