import { Github, Linkedin, Bug, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [showBugModal, setShowBugModal] = useState(false);
  const [bugReport, setBugReport] = useState("");

  const handleBugSubmit = () => {
    if (!bugReport.trim()) return;
    console.log("Bug report:", bugReport);
    alert("Thank you for reporting! We'll look into it.");
    setBugReport("");
    setShowBugModal(false);
  };

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950 pt-20 pb-8">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950 animate-gradient-shift"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* Main Grid */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Quick Emergency Helplines */}
          <div>
            <h3 className="font-semibold text-white mb-4">🚨 Emergency Support</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="tel:1933" className="hover:text-cyan-400 transition-colors">
                  <span className="font-semibold text-cyan-400">1933</span> MANAS Helpline
                </a>
              </li>
              <li>
                <a href="tel:10581" className="hover:text-cyan-400 transition-colors">
                  <span className="font-semibold text-cyan-400">10581</span> TN De-addiction
                </a>
              </li>
              <li>
                <a href="tel:112" className="hover:text-cyan-400 transition-colors">
                  <span className="font-semibold text-cyan-400">112</span> Police Emergency
                </a>
              </li>
              <li>
                <a href="tel:+919498104304" className="hover:text-cyan-400 transition-colors">
                  <span className="font-semibold text-cyan-400">+91 94981 04304</span> Campus Support
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#awareness" className="hover:text-cyan-400 transition-colors">
                  Educational Hub
                </a>
              </li>
              <li>
                <a href="#principal" className="hover:text-cyan-400 transition-colors">
                  Principal's Message
                </a>
              </li>
              <li>
                <a href="#pledge" className="hover:text-cyan-400 transition-colors">
                  Anti-Drug Pledge
                </a>
              </li>
              <li>
                <a href="#helplines" className="hover:text-cyan-400 transition-colors">
                  Helplines
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-cyan-400 transition-colors">
                  Knowledge Quiz
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Profile */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-white mb-4">👨‍💻 Developer Profile</h3>
            <div className="glass glass-hover rounded-2xl p-4 border border-cyan-500/20">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold text-2xl">
                    JK
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Joshua Kurian</h4>
                  <p className="text-xs text-cyan-400 mb-1">
                    IT Department Undergraduate | Aspiring Design Engineer
                  </p>
                  <p className="text-xs text-slate-300 mb-3">
                    Web Designer & Fullstack Developer
                  </p>
                  <p className="text-xs italic text-slate-400 mb-3">
                    "Engineered with passion for SREC Drug-Free Campus Initiative."
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-slate-700/50 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
                    >
                      <Github className="h-3 w-3" /> GitHub
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-slate-700/50 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
                    >
                      <Linkedin className="h-3 w-3" /> LinkedIn
                    </a>
                    <button
                      onClick={() => setShowBugModal(true)}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-700/50 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-red-400 transition-colors"
                    >
                      <Bug className="h-3 w-3" /> Report Bug
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-slate-400">
          <div>
            <p className="mb-1">
              <span className="font-semibold text-cyan-400">Sri Ramakrishna Engineering College</span>, Coimbatore
            </p>
            <p>
              Drug-Free Society & Campus Awareness Initiative | Shatter the Chain. Choose Life.
            </p>
          </div>
          <div className="flex gap-4 text-right">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Use
            </a>
            <span>© 2026 SREC. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Bug Report Modal */}
      {showBugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <h3 className="font-semibold text-white">Report a Bug</h3>
            </div>
            <textarea
              value={bugReport}
              onChange={(e) => setBugReport(e.target.value)}
              placeholder="Describe the issue you found..."
              className="w-full rounded-lg bg-slate-700/50 px-4 py-3 text-sm text-white placeholder-slate-400 border border-cyan-500/20 focus:outline-none focus:border-cyan-500/50 resize-none h-32 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowBugModal(false)}
                className="flex-1 rounded-lg bg-slate-700/50 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBugSubmit}
                disabled={!bugReport.trim()}
                className="flex-1 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
