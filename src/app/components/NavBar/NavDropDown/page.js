"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import styles from "../page.module.css";
import React from "react";
export default function SubNav({ children, name }) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isToggled, setToggled] = useState(false);
  const dropdownRef = useRef(null);

  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];
  const restOfChildren = childrenArray.slice(1);

  const toggleDropDown = () => {
    setToggled(!isToggled);
  };
  const dropDownClick = () => {
    if (screenWidth >= 769 && isToggled) {
      closeDropDown();
    }
  };

  const itemHeight = 65;
  const dropdownHeight = (1 + restOfChildren.length) * itemHeight + itemHeight;

  const closeDropDown = useCallback(() => {
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

    // // Handle Android back button
    // const handlePopState = (e) => {
    //   if (isToggled) {
    //     e.preventDefault();
    //     closeDropDown();
    //     // Push the current state back to prevent actual navigation
    //     window.history.pushState(null, "", window.location.pathname);
    //   }
    // };

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [isToggled, closeDropDown]); // Add isToggled to dependency array

  // 👇 Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        screenWidth >= 769 &&
        isToggled &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        closeDropDown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [screenWidth, isToggled, closeDropDown]);
  return (
    <>
      <div
        ref={dropdownRef}
        className={`${styles.itemDropDown}  ${isToggled ? styles.active : ""}`}
        style={{
          height: isToggled ? `${dropdownHeight}px` : "65px",
        }}
      >
        <div onClick={toggleDropDown} className={styles.item}>
          {name}
          <div
            className={`${styles.arrowContainer}  ${
              isToggled ? styles.active : ""
            }`}
          >
            <span className={styles.arrow}></span>
          </div>
        </div>
        <div
          className={`${styles.items} ${isToggled ? styles.active : ""}`}
          onClick={dropDownClick}
        >
          {firstChild}
          {restOfChildren}
        </div>
      </div>
    </>
  );
}
