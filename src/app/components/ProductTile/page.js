"use client";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation"; // <-- import router

export default function ProductTile({ productTitle, colors, productId }) {
  const router = useRouter();

  const combinedColorNames = (colors || []).map((color) =>
    color.toLowerCase().replace(/\s+/g, "")
  );

  const [selectedColor, setSelectedColor] = useState(
    (colors || []).length > 0 ? colors[0] : null
  );

  const [hoverColor, setHoverColor] = useState(null); // <-- add hover state

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

  const handleCustomizeClick = () => {
    router.push(`/products/customize/${productId}`);
  };

  const displayedColor = hoverColor || selectedColor;

  const getImageUrl = (color) => {
    return `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/products%2F${productTitle
      .toLowerCase()
      .replace(/\s+/g, "")}%2F${color
      .toLowerCase()
      .replace(/\s+/g, "")}.png?alt=media`;
  };

  return (
    <div className={styles.productTile}>
      {/* Product Name */}
      <div className={styles.productName}>{productTitle}</div>

      {/* Product Image */}
      {displayedColor ? (
        <NextImage
          src={getImageUrl(displayedColor)}
          alt={`${displayedColor} tumbler`}
          width={300}
          height={300}
          priority
          className={styles.productImage}
        />
      ) : (
        <p>No image available</p>
      )}

      {/* Hovered or Selected Color Label */}
      {/* <div className={styles.productColor}>
        {hoverColor || selectedColor || "No color selected"}
      </div> */}

      {/* Color Buttons */}
      {/* <div className={styles.colorButtons}>
        {(colors || []).length > 0 ? (
          colors.map((color) => {
            const cleanedColor = color.toLowerCase().replace(/\s+/g, "");
            const isSelected = selectedColor === color;

            return (
              <div
                key={cleanedColor}
                onClick={() => handleColorChange(color)}
                onMouseEnter={() => setHoverColor(color)}
                onMouseLeave={() => setHoverColor(null)}
                className={`${styles.button} ${styles[cleanedColor]} ${
                  isSelected ? styles.selected : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleColorChange(color);
                }}
                aria-pressed={isSelected}
              />
            );
          })
        ) : (
          <p>No colors available for this product.</p>
        )}
      </div> */}
      <div
        className={`${styles.button} ${styles.customize}`}
        onClick={handleCustomizeClick}
      >
        Customize
      </div>
    </div>
  );
}
