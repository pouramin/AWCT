"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEscape } from "./hooks";
import { CloseIcon } from "./icons";
import styles from "./Modal.module.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  labelledBy: string;
  children: ReactNode;
};

/** apple.com "ric-modal": white sheet over a dimmed page, closes on ×, Escape or backdrop. */
export function Modal({ open, onClose, closeLabel, labelledBy, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add("a-scroll-lock");
    closeRef.current?.focus();
    return () => {
      document.documentElement.classList.remove("a-scroll-lock");
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        dir={document.documentElement.dir}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
