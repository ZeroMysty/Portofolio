"use client";

export default function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[10001]"
      style={{
        opacity: 0.38,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='sandNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.4 -0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sandNoise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
        mixBlendMode: "multiply",
      }}
    />
  );
}
