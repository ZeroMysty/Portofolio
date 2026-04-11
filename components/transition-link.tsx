"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const { startTransition } = useTransition();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    // Trigger the closing animation before navigating
    // Pass the href so the context can detect same-page navigation
    startTransition(href.toString(), () => {
      router.push(href.toString());
    });
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleTransition}
      {...props}
    >
      {children}
    </Link>
  );
}
