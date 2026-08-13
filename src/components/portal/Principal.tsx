import { Award, GraduationCap, Quote, ShieldCheck } from "lucide-react";

const BIO = [
  { icon: GraduationCap, text: "25+ years of teaching and academic leadership" },
  { icon: Award, text: "PSG Teacher of the Year awardee" },
  { icon: ShieldCheck, text: "ISACA Academic Advocate" },
];

export function Principal() {
  return (
    <section id="principal" className="mx-auto max-w-7xl px-4 py-16">
      <div className="glass rounded-[2rem] p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Principal&apos;s Message</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr]">
          <div className="glass flex aspect-[4/5] items-center justify-center rounded-3xl border-dashed text-center text-xs font-semibold text-muted-foreground">
            [Principal Photo
            <br />
            Dr. A. Soundarrajan]
          </div>
          <div>
            <Quote className="h-8 w-8 text-primary" />
            <p className="mt-3 text-xl leading-relaxed font-medium text-foreground">
              &ldquo;A campus is a place to build futures, not to lose them. SREC stands for
              zero-tolerance towards drugs and unconditional support for every student who needs
              help. Speak up early — we will stand with you, not against you.&rdquo;
            </p>
            <p className="mt-4 font-display text-lg font-bold text-foreground">
              Dr. A. Soundarrajan
            </p>
            <p className="text-sm text-muted-foreground">
              Principal, Sri Ramakrishna Engineering College
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {BIO.map((b) => (
                <div key={b.text} className="glass glass-hover rounded-2xl p-4">
                  <b.icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm text-foreground">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
