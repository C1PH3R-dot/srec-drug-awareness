import { useState } from "react";
import { AlertTriangle, Phone, ShieldCheck, X } from "lucide-react";
import { ThemeToggle } from "./theme";

const LINKS = [
  { label: "Awareness", href: "#awareness" },
  { label: "Principal", href: "#principal" },
  { label: "Pledge", href: "#pledge" },
  { label: "Helplines", href: "#helplines" },
  { label: "Quiz", href: "#quiz" },
];

const SOS = [
  { name: "Emergency (Police)", num: "112" },
  { name: "MANAS Narcotics Helpline", num: "1933" },
  { name: "TN De-addiction Helpline", num: "10581" },
  { name: "SREC Campus Counsellor", num: "+914222461588" },
];

export function Navbar() {
  const [sos, setSos] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3">
        <nav className="glass mx-auto flex max-w-7xl items-center gap-4 rounded-2xl px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/srec-logo.png"
              alt="SREC Logo"
              className="h-11 w-11 rounded-xl object-contain"
            />
            <div className="leading-tight">
              <p className="font-display text-sm font-bold text-foreground">SREC</p>
              <p className="hidden text-[11px] text-muted-foreground sm:block">
                Sri Ramakrishna Engineering College
              </p>
            </div>
          </a>

          <ul className="mx-auto hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ThemeToggle />
            <button
              onClick={() => setSos(true)}
              className="flex items-center gap-2 rounded-full bg-destructive px-4 py-2.5 text-xs font-bold tracking-wide text-destructive-foreground uppercase shadow-[0_0_25px_-4px_var(--destructive)] transition-transform hover:scale-105"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Emergency SOS</span>
              <span className="sm:hidden">SOS</span>
            </button>
          </div>
        </nav>
      </header>

      {sos && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[oklch(0.15_0.03_264_/_65%)] p-4 backdrop-blur-sm"
          onClick={() => setSos(false)}
        >
          <div
            className="glass w-full max-w-md rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Emergency SOS</h3>
                <p className="text-sm text-muted-foreground">
                  You are not alone. Reach out right now.
                </p>
              </div>
              <button
                onClick={() => setSos(false)}
                aria-label="Close"
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-2">
              {SOS.map((s) => (
                <li key={s.num}>
                  <a
                    href={`tel:${s.num}`}
                    className="glass glass-hover flex items-center justify-between rounded-2xl px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{s.name}</span>
                    <span className="flex items-center gap-2 text-sm font-bold text-primary">
                      <Phone className="h-4 w-4" />
                      {s.num}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> All calls are confidential and free.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
