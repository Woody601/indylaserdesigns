"use client";

import { useState, useEffect, useRef } from "react";
import NextImage from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function ProductTile({
  productTitle,
  colors,
  productSlug,
  productType,
}) {
  const router = useRouter();
  const containerRef = useRef(null);

  // 👉 Normalize colors into a consistent object shape, but keep
  // the "name string" so the buttons can behave just like the Card.
  const normalizedColors = (colors || []).map((c) => {
    if (typeof c === "string") {
      const name = c;
      const cleaned = name.toLowerCase().replace(/\s+/g, "");
      return {
        name, // "Stainless Steel"
        cleaned, // "stainlesssteel" for CSS
        bigimg: null,
        smallimg: null,
        raw: c,
      };
    }

    const name = c.name || "";
    const cleaned = name.toLowerCase().replace(/\s+/g, "");

    return {
      ...c,
      name,
      cleaned,
      bigimg: c.bigimg || null,
      smallimg: c.smallimg || null,
      raw: c,
    };
  });

  // ----- state: selected + hover, same pattern as Card -----
  const [selectedColor, setSelectedColor] = useState(
    normalizedColors.length > 0 ? normalizedColors[0] : null
  );
  const [hoverColor, setHoverColor] = useState(null);

  const displayedColor = hoverColor || selectedColor;

  // ----- image selection: prefer Firestore/JDS URLs, else fallback -----
  const getImageUrl = (colorObj) => {
    if (!colorObj) return null;

    // Prefer explicit URLs from Firestore (same idea as Card using image props)
    if (colorObj.bigimg || colorObj.smallimg) {
      return colorObj.bigimg || colorObj.smallimg;
    }

    // Fallback: your old Firebase Storage pattern based on product title + color
    const productSlugPart = productTitle
      ? productTitle.toLowerCase().replace(/\s+/g, "")
      : "";
    const colorSlugPart = colorObj.name
      ? colorObj.name.toLowerCase().replace(/\s+/g, "")
      : "";

    if (!productSlugPart || !colorSlugPart) return null;

    return `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/products%2F${productSlugPart}%2F${colorSlugPart}.png?alt=media`;
  };

  const displayedImage = getImageUrl(displayedColor);

  // ----- preload all color images (like Card) -----
  useEffect(() => {
    if (typeof window === "undefined") return;

    normalizedColors.forEach((colorObj) => {
      const url = getImageUrl(colorObj);
      if (!url) return;
      const img = new window.Image();
      img.src = url;
    });
  }, [normalizedColors, productTitle]);

  const handleColorChange = (colorObj) => {
    setSelectedColor(colorObj);
  };

  return (
    <div className={styles.productTile}>
      {/* Product Image */}
      <div className={styles.productImagecontainer}>
        {displayedImage ? (
          <NextImage
            src={displayedImage}
            alt={
              displayedColor
                ? `${displayedColor.name} ${productTitle}`
                : productTitle
            }
            width={300}
            height={300}
            className={styles.productImage}
            priority={true}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className={styles.productDetails}>
        <p className={styles.productColorText}>
          Color:{" "}
          <span>{displayedColor ? displayedColor.name : "Not selected"}</span>
        </p>

        {/* Color Buttons – same hover/click behavior as Card */}
        <div className={styles.colorButtons} ref={containerRef}>
          {normalizedColors.length > 0 ? (
            <>
              {normalizedColors.map((colorObj) => {
                const isSelected =
                  selectedColor && selectedColor.name === colorObj.name;

                // 🔥 This matches the Card-style CSS: class based on cleaned name
                const cleanedColor = colorObj.cleaned;

                return (
                  <div
                    key={colorObj.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorChange(colorObj);
                    }}
                    onMouseEnter={() => setHoverColor(colorObj)}
                    onMouseLeave={() => setHoverColor(null)}
                    className={`${styles.button} ${styles[cleanedColor]} ${
                      isSelected ? styles.selected : ""
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleColorChange(colorObj);
                      }
                    }}
                    title={colorObj.name}
                    aria-pressed={isSelected}
                  />
                );
              })}
            </>
          ) : (
            <p>No colors available for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
}
