"use client";

interface RollingTextProps {
  text: string;
  className?: string;
  stagger?: boolean;
}

export default function RollingText({
  text,
  className = "",
  stagger = true,
}: RollingTextProps) {
  return (
    <span className={`relative inline-flex overflow-hidden leading-none select-none ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover/btn:-translate-y-full group-hover/link:-translate-y-full"
          style={{ transitionDelay: stagger ? `${i * 0.02}s` : "0s" }}
        >
          <span className="block">
            {char === " " ? "\u00A0" : char}
          </span>
          <span className="absolute left-0 top-full block">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
