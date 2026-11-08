"use client";

import { useState } from "react";
import TransitionLink from "@/components/transition-link";
import RollingText from "@/components/rolling-text";
import ZigzagPattern from "@/components/zigzag-pattern";

interface ProjectItem {
  id: string;
  title: string;
  category: "Web Engineering" | "Robotics & IoT" | "Creative & 3D";
  year: string;
  desc: string;
  tags: string[];
  role: string;
  featured?: boolean;
}

export default function Project() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Web Engineering", "Creative & 3D", "Robotics & IoT"];

  const projects: ProjectItem[] = [
    {
      id: "aether-robotics",
      title: "Aether Robotics Digital Twin",
      category: "Robotics & IoT",
      year: "2026",
      desc: "Real-time hardware telemetry dashboard and 3D digital twin for multi-axis robotic arms. Streams encoder readings via WebSockets with forward kinematics visualization.",
      tags: ["Three.js", "ESP32", "WebSockets", "C++", "Next.js"],
      role: "Hardware Firmware & Web Interface",
      featured: true,
    },
    {
      id: "omnistore-platform",
      title: "OmniStore Commerce Engine",
      category: "Web Engineering",
      year: "2025",
      desc: "Modern headless e-commerce architecture built with Next.js 15 App Router, Server Actions, Stripe Checkout, and PostgreSQL with sub-second page loads.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      role: "Full-Stack Architecture",
      featured: true,
    },
    {
      id: "zenith-webgl",
      title: "Zenith Kinetic Spatial Web",
      category: "Creative & 3D",
      year: "2025",
      desc: "Experimental interactive WebGL environment featuring custom GLSL vertex displacement shaders, spring-based cursor tracking, and procedural audio feedback.",
      tags: ["Three.js", "GLSL", "Framer Motion", "WebGL", "Blender"],
      role: "Creative Developer & Shader Artist",
      featured: true,
    },
    {
      id: "wikrama-portal",
      title: "Wikrama Learning Gateway",
      category: "Web Engineering",
      year: "2024",
      desc: "Comprehensive academic management portal featuring student attendance logging, assignment submission workflow, and interactive teacher grading dashboards.",
      tags: ["React", "Express", "Node.js", "Tailwind CSS", "MySQL"],
      role: "Lead Frontend Developer",
    },
    {
      id: "autonomous-rover",
      title: "Autonomous Rover ESP32",
      category: "Robotics & IoT",
      year: "2024",
      desc: "Obstacle-avoidance rover platform equipped with ultrasonic sensor arrays, PID motor controllers, and real-time Bluetooth telemetry monitoring on Android.",
      tags: ["Arduino", "ESP32", "C / C++", "PID Control", "Hardware PCB"],
      role: "Embedded Systems Engineer",
    },
    {
      id: "chronos-timer",
      title: "Chronos Minimalist Focus Tool",
      category: "Creative & 3D",
      year: "2024",
      desc: "Minimalist brutalist focus companion app with dynamic ambient soundscapes, procedural clock hands, and offline-first IndexedDB session analytics.",
      tags: ["TypeScript", "Web Audio API", "Tailwind CSS", "Canvas API"],
      role: "UI/UX & Frontend Developer",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <main className="relative min-h-screen bg-background text-[#000000] font-geo animate-fade-in-up overflow-hidden pt-24 pb-20">
      {/* Background Zigzag Motif */}
      <ZigzagPattern opacity={0.07} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 space-y-16 z-10">
        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}
        <section className="space-y-6 border-b border-black/10 pb-12">
          <div className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 font-mono">
            <span>Portfolio // Archive</span>
            <span>2024 — 2026</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            Selected Works
          </h1>

          <p className="text-base md:text-xl text-neutral-600 font-sans font-light max-w-2xl">
            A curated collection of web applications, creative 3D interfaces, and embedded robotics systems crafted with attention to performance and aesthetic craft.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-black text-[#ede8df]"
                    : "bg-black/5 text-neutral-600 hover:bg-black/10 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* PROJECT GRID */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group border border-black/10 p-8 flex flex-col justify-between hover:border-black bg-background/60 backdrop-blur-sm transition-all duration-300 relative"
            >
              {/* Top Meta */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
                  <span className="uppercase tracking-widest">{proj.category}</span>
                  <span>{proj.year}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {proj.title}
                </h2>

                <span className="text-[11px] font-mono text-neutral-500 block uppercase">
                  Role: {proj.role}
                </span>

                <p className="text-sm text-neutral-600 font-sans font-light leading-relaxed pt-2">
                  {proj.desc}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div className="space-y-6 pt-8 border-t border-black/5 mt-6">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono uppercase px-2 py-1 bg-black/5 text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="group/link inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer">
                    <RollingText text="Case Study Details" />
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover/link:translate-x-1.5">→</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    #{proj.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ============================================================ */}
        {/* CALL TO ACTION */}
        {/* ============================================================ */}
        <section className="p-12 border border-black/10 bg-black text-[#ede8df] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Need a custom system or creative build?
            </h3>
            <p className="text-xs md:text-sm opacity-70 font-sans">
              From interactive 3D WebGL to IoT hardware telemetry, let&apos;s build it together.
            </p>
          </div>
          <TransitionLink
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#ede8df] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shrink-0"
          >
            <RollingText text="Start A Project" />
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </TransitionLink>
        </section>
      </div>
    </main>
  );
}
