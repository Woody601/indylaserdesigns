import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./page.module.css";
import React from "react";
export default function SubNav({ className, children }) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isToggled, setToggled] = useState(false);
  const firstChild = React.Children.toArray(children)[0];
  const restOfChildren = children.slice(1);
  const dropdownRef = useRef(null);
  //   // Close nav if screen size changes to desktop
  //   useEffect(() => {
  //     if (screenWidth >= 769 && isToggled) {
  //       setToggled(false);
  //     }
  //   }, [screenWidth, isToggled]);

  const toggleNav = () => {
    setToggled(!isToggled);
  };
  const itemHeight = 65;
  const dropdownHeight = restOfChildren.length * itemHeight + itemHeight;

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
      if (screenWidth >= 769) {
        if (e.key === "Escape" && isToggled) {
          e.preventDefault();
          closeNav();
        }
      }
    };

    // // Handle Android back button
    // const handlePopState = (e) => {
    //   if (isToggled) {
    //     e.preventDefault();
    //     closeNav();
    //     // Push the current state back to prevent actual navigation
    //     window.history.pushState(null, "", window.location.pathname);
    //   }
    // };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isToggled, closeNav]); // Add isToggled to dependency array

  // 👇 Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        screenWidth >= 769 &&
        isToggled &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        closeNav();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [screenWidth, isToggled, closeNav]);
  return (
    <>
      <div
        className={`${styles.itemDropDown}  ${isToggled ? styles.active : ""}`}
        style={{
          height: isToggled ? `${dropdownHeight}px` : "65px",
          transition: "height 0.3s ease",
        }}
      >
        <div className={styles.dropDown}>
          {firstChild}
          <div
            className={`${styles.block} ${isToggled ? styles.active : ""}`}
            onClick={toggleNav}
            ref={dropdownRef}
          >
            <span className={styles.arrow}></span>
          </div>
        </div>
        <div className={`${styles.items} ${isToggled ? styles.active : ""}`}>
          {restOfChildren}
        </div>
      </div>
    </>
  );
}
