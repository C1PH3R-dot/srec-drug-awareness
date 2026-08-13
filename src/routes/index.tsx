import { createFileRoute } from "@tanstack/react-router";
import { AmbientOrbs, ThemeProvider } from "@/components/portal/theme";
import { Navbar } from "@/components/portal/Navbar";
import { Hero } from "@/components/portal/Hero";
import { Education } from "@/components/portal/Education";
import { Principal } from "@/components/portal/Principal";
import { Pledge } from "@/components/portal/Pledge";
import { Helplines } from "@/components/portal/Helplines";
import { MediaQuiz } from "@/components/portal/MediaQuiz";

const title = "SREC Drug-Free Campus Awareness Portal";
const description =
  "Official SREC student initiative for a drug-free campus: awareness, anti-drug pledge certificate, Coimbatore helplines and an interactive quiz.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <AmbientOrbs />
        <Navbar />
        <main>
          <Hero />
          <Education />
          <Principal />
          <Pledge />
          <Helplines />
          <MediaQuiz />
        </main>
        <footer className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-muted-foreground">
          Sri Ramakrishna Engineering College, Coimbatore &middot; Drug-Free Society &amp; Campus
          Awareness Initiative
        </footer>
      </div>
    </ThemeProvider>
  );
}
