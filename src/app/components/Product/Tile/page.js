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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const combinedColorNames = (colors || []).map((color) =>
    color.toLowerCase().replace(/\s+/g, "")
  );

  const [selectedColor, setSelectedColor] = useState(
    (colors || []).length > 0 ? colors[0] : null
  );

  const [hoverColor, setHoverColor] = useState(null);

  // Preload all color images
  useEffect(() => {
    combinedColorNames.forEach((colorName) => {
      const img = new window.Image();
      const url = `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/products%2F${productTitle
        .toLowerCase()
        .replace(/\s+/g, "")}%2F${colorName}.png?alt=media`;
      img.src = url;
    });
  }, [productTitle, combinedColorNames]);

  const handleColorChange = (name) => {
    setSelectedColor(name);
  };

  const getImageUrl = (color) => {
    return `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/products%2F${productTitle
      .toLowerCase()
      .replace(/\s+/g, "")}%2F${color
      .toLowerCase()
      .replace(/\s+/g, "")}.png?alt=media`;
  };

  const safeColors = colors || [];
  const displayedColors = safeColors.slice(0);

  const displayedColor = hoverColor || selectedColor;

  return (
    <div className={styles.productTile}>
      {/* Product Image */}
      <div className={styles.productImagecontainer}>
        {displayedColor ? (
          <NextImage
            src={getImageUrl(displayedColor)}
            alt={`${displayedColor} tumbler`}
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
          Color: <span>{displayedColor}</span>
        </p>
        {/* Color Buttons */}

        <div className={styles.colorButtons} ref={containerRef}>
          {(displayedColors || []).length > 0 ? (
            <>
              {displayedColors.map((color) => {
                const cleanedColor = color.toLowerCase().replace(/\s+/g, "");
                const isSelected = selectedColor === color;

                return (
                  <div
                    key={cleanedColor}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorChange(color);
                    }}
                    onMouseEnter={() => setHoverColor(color)}
                    className={`${styles.button} ${styles[cleanedColor]} ${
                      isSelected ? styles.selected : ""
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleColorChange(color);
                    }}
                    title={color}
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
