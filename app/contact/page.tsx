"use client";

import { useState } from "react";
import ZigzagPattern from "@/components/zigzag-pattern";
import RollingText from "@/components/rolling-text";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  const socials = [
    { name: "Instagram", handle: "@zaidhifdzulm", href: "https://www.instagram.com/zaidhifdzulm/" },
    { name: "GitHub", handle: "github.com/zeddz", href: "https://github.com" },
    { name: "LinkedIn", handle: "linkedin.com/in/zaidhifdzul", href: "https://linkedin.com" },
    { name: "Discord", handle: "zeddz#0001", href: "https://discord.com" },
  ];

  const services = [
    "Web Development",
    "Creative 3D & WebGL",
    "Robotics & IoT Hardware",
    "Consultation / Collaboration",
  ];

  return (
    <main className="relative min-h-screen bg-background text-black font-geo animate-fade-in-up overflow-hidden pt-24 pb-20">
      {/* Background Zigzag Motif */}
      <ZigzagPattern opacity={0.07} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 space-y-20 z-10">
        {/* ============================================================ */}
        {/* HEADER */}
        {/* ============================================================ */}
        <section className="space-y-4 border-b border-black/10 pb-12">
          <div className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 font-mono">
            <span>Inquiry // Collaboration</span>
            <span className="flex items-center gap-2 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Q1/Q2 Projects
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            Get In Touch
          </h1>

          <p className="text-base md:text-xl text-neutral-600 font-sans font-light max-w-2xl">
            Have an ambitious idea, need a full-stack web application, or want to explore creative robotics? Send a message and let&apos;s build it.
          </p>
        </section>

        {/* ============================================================ */}
        {/* SPLIT SECTION: CONTACT INFO & FORM */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block">
                Direct Channels
              </span>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Email Address
                  </span>
                  <a
                    href="mailto:zaidhifdzulm@gmail.com"
                    className="text-xl md:text-2xl font-bold hover:underline underline-offset-4 tracking-tight"
                  >
                    zaidhifdzulmumtaz@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Telephone / WhatsApp
                  </span>
                  <a
                    href="tel:+6281234567890"
                    className="text-xl md:text-2xl font-bold hover:underline underline-offset-4 tracking-tight"
                  >
                    +62 812 3456 7890
                  </a>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Base Location
                  </span>
                  <span className="text-xl md:text-2xl font-bold tracking-tight block">
                    Bandung, West Java, ID
                  </span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block">
                Connect Online
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-black/10 hover:border-black transition-all bg-background/50 hover:-translate-y-0.5 duration-200 block"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                      <RollingText text={s.name} />
                      <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono block">
                      {s.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 border border-black/10 p-8 md:p-12 bg-background/70 backdrop-blur-sm relative">
            {submitted ? (
              <div className="text-center py-16 space-y-4 animate-fade-in-up">
                <span className="text-4xl block">✨</span>
                <h3 className="text-3xl font-black uppercase tracking-tight">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-neutral-600 font-sans max-w-md mx-auto">
                  Thank you for reaching out, {formState.name}! I will review your message and reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", service: "Web Development", message: "" });
                  }}
                  className="mt-6 px-6 py-2.5 bg-black text-[#ede8df] text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight border-b border-black/10 pb-4">
                  Send A Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-black/5 border border-black/10 focus:border-black focus:outline-none text-sm font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-black/5 border border-black/10 focus:border-black focus:outline-none text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                    Service of Interest
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full px-4 py-3 bg-black/5 border border-black/10 focus:border-black focus:outline-none text-sm font-sans"
                  >
                    {services.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className="w-full px-4 py-3 bg-black/5 border border-black/10 focus:border-black focus:outline-none text-sm font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black text-[#ede8df] text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Send Inquiry Message →
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* FAQ / WORK INQUIRY GUIDANCE */}
        {/* ============================================================ */}
        <section className="border-t border-black/10 pt-16 space-y-8">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="text-base font-bold uppercase tracking-wider">
                What is your turnaround time?
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 font-sans leading-relaxed">
                Project timelines range from 1 to 4 weeks depending on complexity, features, and whether 3D/hardware integration is required.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold uppercase tracking-wider">
                Do you take freelance work?
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 font-sans leading-relaxed">
                Yes! I am actively taking select freelance projects, frontend consulting, and creative web experiences for forward-thinking clients.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold uppercase tracking-wider">
                Where are you based?
              </h4>
              <p className="text-xs md:text-sm text-neutral-600 font-sans leading-relaxed">
                Based in Bandung, Indonesia (GMT+7). Available to collaborate remotely with clients and teams worldwide.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
