"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Banner({ children }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={styles.banner}>
      <span className={styles.text}>{children}</span>
      <button
        className={styles.close}
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
      >
        &#x2715;
      </button>
    </div>
  );
}
