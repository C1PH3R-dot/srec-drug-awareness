import { AlertTriangle, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

const RISK_DATA = [
  {
    category: "High Risk",
    percentage: 45,
    color: "#ef4444",
    description: "Opioids, Synthetic Drugs, Narcotics",
    glowColor: "rgba(239, 68, 68, 0.4)",
    drugs: ["Heroin", "Fentanyl", "Synthetic Cannabinoids", "MDMA"],
  },
  {
    category: "Moderate Risk",
    percentage: 35,
    color: "#06b6d4",
    description: "Prescription Stimulants, Sedatives",
    glowColor: "rgba(6, 182, 212, 0.4)",
    drugs: ["Benzodiazepines", "Prescription Amphetamines", "Alcohol", "Cannabis"],
  },
  {
    category: "Emerging Risk",
    percentage: 20,
    color: "#a855f7",
    description: "Vapes, Novel Psychoactive Substances",
    glowColor: "rgba(168, 85, 247, 0.4)",
    drugs: ["E-Cigarettes/Vapes", "Novel Psychoactive Substances", "Designer Drugs"],
  },
];

export function RiskAssessmentChart() {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  // Calculate pie slice angles
  const slices = RISK_DATA.map((data, index) => {
    const startAngle = RISK_DATA.slice(0, index).reduce((sum, d) => sum + d.percentage, 0) * 3.6;
    const endAngle = startAngle + data.percentage * 3.6;
    return { ...data, startAngle, endAngle, index };
  });

  // SVG path generator for pie slices
  const generateSlicePath = (slice: any) => {
    const radius = 80;
    const cx = 100;
    const cy = 100;

    const startRad = (slice.startAngle * Math.PI) / 180;
    const endRad = (slice.endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArc = slice.percentage > 50 ? 1 : 0;

    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-cyan-950/20 to-slate-950/30 animate-gradient-shift"></div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Substance Risk Classification & Dependency Level
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Interactive risk assessment showing substance abuse prevalence and health impact levels.
        </p>
      </div>

      {/* Chart Container */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px] items-start">
        {/* SVG Pie Chart */}
        <div className="glass rounded-2xl p-8 border border-cyan-500/20 shadow-2xl flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <svg viewBox="0 0 200 200" className="w-full drop-shadow-2xl">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="rgba(51, 65, 85, 0.2)"
                strokeWidth="2"
              />

              {/* Pie slices */}
              {slices.map((slice) => (
                <g
                  key={slice.index}
                  onMouseEnter={() => setHoveredSegment(slice.index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={
                    hoveredSegment === null || hoveredSegment === slice.index ? 1 : 0.5
                  }
                >
                  {/* Glow effect on hover */}
                  {hoveredSegment === slice.index && (
                    <filter id={`glow-${slice.index}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  )}

                  <path
                    d={generateSlicePath(slice)}
                    fill={slice.color}
                    stroke="rgba(0, 0, 0, 0.3)"
                    strokeWidth="1"
                    filter={hoveredSegment === slice.index ? `url(#glow-${slice.index})` : ""}
                    style={{
                      filter: hoveredSegment === slice.index ? `drop-shadow(0 0 8px ${slice.glowColor})` : "none",
                      transition: "all 0.3s ease",
                    }}
                  />

                  {/* Percentage labels */}
                  {slice.percentage > 10 && (
                    <text
                      x={100 + 50 * Math.cos(((slice.startAngle + slice.endAngle) / 2 * Math.PI) / 180)}
                      y={100 + 50 * Math.sin(((slice.startAngle + slice.endAngle) / 2 * Math.PI) / 180)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs font-bold"
                      fill="white"
                      fontWeight="600"
                      fontSize="11"
                    >
                      {slice.percentage}%
                    </text>
                  )}
                </g>
              ))}

              {/* Center circle */}
              <circle cx="100" cy="100" r="50" fill="rgba(15, 23, 42, 0.8)" />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                className="text-sm font-bold"
                fill="#06b6d4"
                fontSize="14"
                fontWeight="600"
              >
                Substance
              </text>
              <text
                x="100"
                y="110"
                textAnchor="middle"
                className="text-xs"
                fill="#64748b"
                fontSize="12"
              >
                Risk Index
              </text>
            </svg>
          </div>
        </div>

        {/* Legend & Details */}
        <div className="space-y-3">
          {slices.map((slice) => (
            <button
              key={slice.index}
              onClick={() => setHoveredSegment(hoveredSegment === slice.index ? null : slice.index)}
              className={`w-full rounded-lg p-3 text-left transition-all border ${
                hoveredSegment === slice.index
                  ? "bg-slate-700/50 border-cyan-500/50 shadow-lg"
                  : "glass border-cyan-500/20 hover:border-cyan-500/40"
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-sm font-bold text-white">{slice.category}</span>
                <span className="ml-auto text-lg font-bold text-cyan-400">{slice.percentage}%</span>
              </div>

              {/* Risk Badge */}
              <div className="mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-400 border border-red-500/30">
                  <AlertTriangle className="h-3 w-3" />
                  High Dependency
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 mb-2">{slice.description}</p>

              {/* Drug List */}
              <div className="text-[10px] text-slate-400 space-y-0.5">
                {slice.drugs.map((drug) => (
                  <div key={drug} className="flex items-center gap-1">
                    <span className="text-cyan-400">•</span> {drug}
                  </div>
                ))}
              </div>

              {/* Health Impact on Hover */}
              {hoveredSegment === slice.index && (
                <div className="mt-2 rounded bg-slate-800/50 p-2 border border-yellow-500/30">
                  <p className="text-[10px] font-semibold text-yellow-400">⚠ Health Impact:</p>
                  <p className="text-[10px] text-slate-300 mt-1">
                    {slice.index === 0
                      ? "Severe withdrawal, overdose risk, long-term organ damage"
                      : slice.index === 1
                        ? "Cognitive impairment, addiction potential, behavioral changes"
                        : "Emerging health effects, limited research data available"}
                  </p>
                </div>
              )}
            </button>
          ))}

          {/* Total Risk Score */}
          <div className="glass rounded-lg p-3 border border-cyan-500/30 bg-cyan-500/5">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-400">Campus Risk Index</span>
            </div>
            <p className="text-2xl font-bold text-white mt-1">7.8/10</p>
            <p className="text-[10px] text-slate-400 mt-1">
              Moderate-to-High prevalence on campuses nationwide
            </p>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "High-Risk Substances", value: "12+", icon: "🔴" },
          { label: "Avg. Onset Age", value: "19-22", icon: "📊" },
          { label: "Addiction Rate", value: "65%", icon: "⚠️" },
          { label: "Recovery Possible", value: "Yes", icon: "✅" },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-xl p-4 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-semibold text-slate-400">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-cyan-400">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
