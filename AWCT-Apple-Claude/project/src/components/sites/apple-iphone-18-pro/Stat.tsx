import { cn } from "@/lib/utils";
import { Rich } from "./Rich";
import styles from "./Stat.module.css";

export type StatData = { pre: string; value: string; post: string };

/** apple.com "figure.stat": small label, large value, caption. */
export function Stat({ stat, className, size = "base" }: { stat: StatData; className?: string; size?: "base" | "large" }) {
  return (
    <figure className={cn(styles.stat, size === "large" && styles.large, className)}>
      <span className={styles.pre}>{stat.pre}</span>
      <span className={styles.value}>
        <Rich text={stat.value} />
      </span>
      <span className={styles.post}>
        <Rich text={stat.post} />
      </span>
    </figure>
  );
}
