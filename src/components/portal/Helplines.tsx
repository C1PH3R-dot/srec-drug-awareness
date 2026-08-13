import { useState } from "react";
import { Check, Copy, MapPin, Phone, ShieldAlert } from "lucide-react";

const HELPLINES = [
  { name: "MANAS National Narcotics Helpline", num: "1933", note: "24x7 anonymous support" },
  { name: "Tamil Nadu State Helpline", num: "10581", note: "De-addiction guidance" },
  { name: "Police Emergency", num: "112", note: "Also dial 100" },
  { name: "EB-CID Coimbatore", num: "+91 94981 04304", note: "Report drug peddling" },
];

const HOSPITALS = [
  {
    name: "Coimbatore Medical College Hospital",
    area: "Trichy Road, Coimbatore",
    num: "+914222301393",
  },
  { name: "PSG Hospitals", area: "Peelamedu, Coimbatore", num: "+914222570170" },
  { name: "Kovai Medical Center (KMCH)", area: "Avinashi Road, Coimbatore", num: "+914224323800" },
];

export function Helplines() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num);
      setCopied(num);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section id="helplines" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Coimbatore Helplines</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Free, confidential and available around the clock. Tap to dial or copy the number.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HELPLINES.map((h) => (
          <div key={h.num} className="glass glass-hover rounded-3xl p-5">
            <p className="text-sm font-bold text-foreground">{h.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{h.note}</p>
            <p className="mt-4 font-display text-2xl font-extrabold text-primary">{h.num}</p>
            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${h.num.replace(/\s/g, "")}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <button
                onClick={() => copy(h.num)}
                aria-label={`Copy ${h.name} number`}
                className="rounded-full border border-border px-3 py-2 text-xs font-bold text-foreground hover:bg-secondary"
              >
                {copied === h.num ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass mt-8 rounded-3xl p-6 sm:p-8">
        <ShieldAlert className="h-6 w-6 text-destructive" />
        <h3 className="mt-3 text-xl font-bold text-foreground">
          Anti-Narcotics Task Force (ANTF) &amp; EB-CID
        </h3>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Tamil Nadu&apos;s ANTF works with district police to dismantle drug supply networks near
          educational institutions, while the EB-CID (Economic Offences Wing) tracks the financial
          trail of trafficking. Student tip-offs are handled anonymously — your identity is never
          disclosed, and no action is taken against a student who seeks help for dependency.
        </p>
      </div>

      <h3 className="mt-14 text-2xl font-bold text-foreground">Nearby De-addiction Hospitals</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {HOSPITALS.map((h) => (
          <div key={h.name} className="glass glass-hover rounded-3xl p-6">
            <p className="text-lg font-bold text-foreground">{h.name}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {h.area}
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={`tel:${h.num}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + " Coimbatore")}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold text-foreground hover:bg-secondary"
              >
                <MapPin className="h-3.5 w-3.5" /> Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
