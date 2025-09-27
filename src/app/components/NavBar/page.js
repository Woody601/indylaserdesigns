"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import SubNav from "./NavDropDown/page";

export default function NavBar() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isToggled, setToggled] = useState(false);

  // Close nav if screen size changes to desktop
  useEffect(() => {
    if (screenWidth >= 769 && isToggled) {
      setToggled(false);
    }
  }, [screenWidth, isToggled]);

  const toggleNav = () => {
    if (screenWidth <= 768) {
      setToggled(!isToggled);
    }
  };

  const closeNav = useCallback(() => {
    if (isToggled) {
      setToggled(false);
    }
  }, [isToggled]);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Set initial screen width
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);

    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isToggled) {
        e.preventDefault();
        closeNav();
      }
    };

    // Handle Android back button
    const handlePopState = (e) => {
      if (isToggled) {
        e.preventDefault();
        closeNav();
        // Push the current state back to prevent actual navigation
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isToggled, closeNav]); // Add isToggled to dependency array

  return (
    <>
      <nav className={`${styles.navHolder} ${isToggled ? styles.active : ""}`}>
        <Link
          href="/"
          onClick={closeNav}
          className={`${styles.item} ${styles.logo}`}
        >
          <Image
            src="/logo.svg"
            width={119.06}
            height={40}
            alt="Indy Laser Designs logo"
            loading="eager"
            priority
          />
        </Link>

        <div
          className={`${styles.bars} ${isToggled ? styles.active : ""}`}
          onClick={toggleNav}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <div className={styles.items}>
          <Link href="/about" onClick={closeNav} className={styles.item}>
            About
          </Link>

          <SubNav name="Materials">
            <Link href="/materials" onClick={closeNav} className={styles.item}>
              All Materials
            </Link>
            <Link
              href="/materials/#"
              onClick={closeNav}
              className={styles.item}
            >
              Wood
            </Link>
          </SubNav>

          <SubNav name="Products">
            <Link href="/products" onClick={closeNav} className={styles.item}>
              All Products
            </Link>
            <Link
              href="/products/drinkware"
              onClick={closeNav}
              className={styles.item}
            >
              Drinkware
            </Link>
          </SubNav>
          <Link href="/pricing" onClick={closeNav} className={styles.item}>
            Pricing
          </Link>
          <Link href="/contact" onClick={closeNav} className={styles.item}>
            Contact
          </Link>
        </div>
      </nav>

      <div
        className={`${styles.overlay} ${isToggled ? styles.active : ""}`}
        onClick={closeNav}
      />
    </>
  );
}
