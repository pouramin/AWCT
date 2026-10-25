import { cn } from "@/lib/utils";
import { SelectChevron } from "./icons";
import styles from "./Dropdown.module.css";

type DropdownProps = {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
  label?: string;
};

/** apple.com "form-dropdown": a native <select> styled as a rounded field with a chevron. */
export function Dropdown({ id, value, options, onChange, className, label }: DropdownProps) {
  return (
    <div className={cn(styles.dropdown, className)}>
      <select id={id} className={styles.select} value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <SelectChevron className={styles.chevron} />
    </div>
  );
}
