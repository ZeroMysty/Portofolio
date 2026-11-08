import TransitionLink from "@/components/transition-link";
import RollingText from "@/components/rolling-text";
import ZigzagPattern from "@/components/zigzag-pattern";

export default function About() {
  const skills = [
    {
      category: "Frontend & Creative",
      items: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Three.js / WebGL", "Framer Motion"],
    },
    {
      category: "Backend & Systems",
      items: ["Node.js", "Express", "RESTful APIs", "PostgreSQL", "Prisma ORM", "Supabase"],
    },
    {
      category: "Robotics & Hardware",
      items: ["Arduino & ESP32", "C / C++", "Python", "Sensors & Actuators", "IoT Telemetry", "Serial Comms"],
    },
    {
      category: "Workflow & Tools",
      items: ["Git & GitHub", "Figma", "Blender (3D Modeling)", "VS Code", "Vercel", "Linux"],
    },
  ];

  const milestones = [
    {
      year: "2024 — Present",
      role: "Software Engineering Student & Developer",
      org: "SMK Wikrama Bandung",
      desc: "Deepening software architecture, modern full-stack web engineering, algorithms, and collaborative software projects.",
    },
    {
      year: "2024 — Present",
      role: "Lead Hardware & Software Integrator",
      org: "Robotics Club",
      desc: "Developing autonomous microcontroller firmware, telemetry dashboards, and motor driver circuitry for competitive robotic systems.",
    },
    {
      year: "2023 — Present",
      role: "Active Member & Contributor",
      org: "Coding Club",
      desc: "Mentoring peers in JavaScript fundamentals, algorithmic problem solving, and organizing internal hackathons.",
    },
  ];

  const stats = [
    { label: "Years of Coding", value: "3+" },
    { label: "Completed Projects", value: "20+" },
    { label: "Robotics Builds", value: "8+" },
    { label: "Cups of Coffee", value: "∞" },
  ];

  return (
    <main className="relative min-h-screen bg-background text-[#000000] font-geo animate-fade-in-up overflow-hidden pt-24 pb-20">
      {/* Background Zigzag Motif */}
      <ZigzagPattern opacity={0.07} />

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 space-y-24 z-10">
        {/* ============================================================ */}
        {/* HEADER & INTRO */}
        {/* ============================================================ */}
        <section className="space-y-8 border-b border-black/10 pb-16">
          <div className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 font-mono">
            <span>Profile // Biography</span>
            <span>Bandung, Indonesia</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            About Me
          </h1>

          <div className="space-y-6 text-xl md:text-2xl leading-relaxed text-[#3a3834] font-light max-w-4xl">
            <p>
              Hi, I&apos;m <span className="font-bold text-black">Zaid Hifdzul M.</span> (known online as <span className="font-bold text-black">Zeddz</span>). I am a software engineer and creative technologist with a fierce obsession for craft, clean architecture, and expressive digital media.
            </p>
            <p>
              Currently studying Software Engineering at <span className="font-semibold text-black">SMK Wikrama Bandung</span>, I spend my days building modern interactive web applications and experimenting with embedded microcontrollers in robotics.
            </p>
            <p>
              I believe code is not just instructions for computers—it is an artistic medium. Whether designing an interactive 3D canvas with WebGL, orchestrating real-time IoT telemetry, or polishing typography down to the pixel, I strive to make technology feel intuitive and alive.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* STATS HIGHLIGHT */}
        {/* ============================================================ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-black/10 pb-16">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-4xl md:text-6xl font-black tracking-tighter block">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold block">
                {s.label}
              </span>
            </div>
          ))}
        </section>

        {/* ============================================================ */}
        {/* TECH STACK & SKILLS */}
        {/* ============================================================ */}
        <section className="space-y-10 border-b border-black/10 pb-16">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Technical Arsenal
            </h2>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
              Tools &amp; Tech
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((group, idx) => (
              <div
                key={idx}
                className="p-8 border border-black/10 bg-background/60 backdrop-blur-sm space-y-4 hover:border-black transition-colors"
              >
                <h3 className="text-lg font-bold uppercase tracking-wider text-neutral-800">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 text-xs font-mono font-medium bg-black/5 text-black tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* JOURNEY & TIMELINE */}
        {/* ============================================================ */}
        <section className="space-y-10 border-b border-black/10 pb-16">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Journey &amp; Education
            </h2>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
              Timeline
            </span>
          </div>

          <div className="space-y-8">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-l-2 border-black hover:bg-black/[0.02] transition-colors"
              >
                <span className="text-xs font-mono font-bold text-neutral-500 tracking-wider">
                  {m.year}
                </span>
                <div className="md:col-span-3 space-y-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight">
                    {m.role}
                  </h3>
                  <span className="text-sm font-semibold text-neutral-700 block">
                    {m.org}
                  </span>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* FOOTER CTA */}
        {/* ============================================================ */}
        <section className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-black uppercase tracking-tight">
              Want to collaborate or talk tech?
            </h3>
            <p className="text-sm text-neutral-600 font-sans">
              Always open to discussing new opportunities, robotics projects, or creative ideas.
            </p>
          </div>
          <TransitionLink
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-black text-[#ede8df] text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shrink-0"
          >
            <RollingText text="Get In Touch" />
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </TransitionLink>
        </section>
      </div>
    </main>
  );
}
