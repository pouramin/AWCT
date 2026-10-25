"use client";

import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./hooks";

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
};

/** Fades copy up as it enters the viewport (apple.com "staggered-start" groups). */
export function Reveal({ as: Tag = "div", className, children, id }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={cn("a-reveal", inView && "is-visible", className)}>
      {children}
    </Tag>
  );
}
