import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[3rem]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-dark hover:-translate-y-0.5",
  secondary:
    "bg-white text-primary border border-border hover:border-accent hover:text-accent",
  ghost: "text-white/90 hover:text-white underline-offset-4 hover:underline",
};

/**
 * Primary site call-to-action. Uses next/link for internal anchor navigation
 * (e.g. "#contact"). Pass an absolute/mailto href only for external destinations.
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
