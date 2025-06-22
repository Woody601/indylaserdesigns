"use client";
import styles from "./page.module.css";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <section className={styles.section}>
          <h5>Contact Us</h5>
          <br />
          <Link href="tel:317-313-7715">317-313-7715</Link>
          <br />
          <Link href="mailto:info@indylaserdesigns.com">
            info@indylaserdesigns.com
          </Link>
        </section>
        <section className={`${styles.section} ${styles.social}`}>
          <h5>Follow Us</h5>
          <br />
          <Link
            href="https://www.facebook.com/IndyLaserDesigns"
            className="fa fa-facebook"
            target="_blank"
            rel="noopener noreferrer"
          />
          <Link
            href="https://www.instagram.com/indylaserdesigns"
            className="fa fa-instagram"
            target="_blank"
            rel="noopener noreferrer"
          />
          <Link
            href="https://g.page/r/CUNmgRTOvEB4EA0"
            className="fa fa-google"
            target="_blank"
            rel="noopener noreferrer"
          />
        </section>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} Indy Laser Designs - All Rights Reserved.
        Website Built By{" "}
        <Link href="mailto:mychalwood@gmail.com">Mychal Wood</Link>
      </div>
    </footer>
  );
}
