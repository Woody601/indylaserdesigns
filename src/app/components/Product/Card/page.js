"use client";
import { useState, useEffect, useRef } from "react";
import NextImage from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

// helper functions
const getColorName = (c) =>
  typeof c === "string" ? c : c?.name ?? c?.id ?? "";

const getColorId = (c, idx = 0) =>
  typeof c === "string" ? c : c?.id ?? c?.name ?? String(idx);

const getBigImg = (c) => (typeof c === "object" ? c?.bigimg ?? null : null);

const getCssClassFromColor = (c) => {
  const name = getColorName(c);
  return name ? name.toLowerCase().replace(/\s+/g, "") : "";
};

export default function ProductCard({
  productTitle,
  colors = [], // now [{id, name, bigimg, smallimg}]
  productSlug,
  productType,
  images = {}, // optional legacy image map
}) {
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(
    colors?.length ? colors[0] : null
  );
  const [hoverColor, setHoverColor] = useState(null);
  const activeColor = hoverColor || selectedColor;

  // ✅ choose display image (from bigimg or fallback)
  const pickImage = () => {
    const big = getBigImg(activeColor);
    if (big) return big;
    const name = getColorName(activeColor);
    if (name && images[name]) return images[name];
    const firstBig = colors.find((c) => getBigImg(c));
    if (firstBig) return getBigImg(firstBig);
    const vals = Object.values(images || {});
    return vals.length ? vals[0] : null;
  };

  const displayedImage = pickImage();

  // Responsive layout tracking
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      observer.disconnect();
    };
  }, []);

  const buttonWidth = containerWidth <= 689 ? 24 : 16;
  const gap = 8;
  const maxButtons = Math.max(
    1,
    Math.floor(containerWidth / (buttonWidth + gap))
  );
  const displayedColors = (colors || []).slice(0, maxButtons);
  const remainingColors = (colors?.length || 0) - displayedColors.length;

  const handleCustomizeClick = () =>
    // router.push(`${productType}/${productSlug}`);
    console.log("Not sending to the product page yet.");

  return (
    <div className={styles.productTile} onClick={handleCustomizeClick}>
      <div className={styles.productImagecontainer}>
        {displayedImage ? (
          <NextImage
            src={displayedImage}
            alt={`${getColorName(activeColor) || productTitle} image`}
            width={300}
            height={300}
            className={styles.productImage}
            priority
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className={styles.productName}>{productTitle}</div>

      <div className={styles.colorButtons} ref={containerRef}>
        {displayedColors.length > 0 ? (
          <>
            {displayedColors.map((c, idx) => {
              const id = getColorId(c, idx);
              const name = getColorName(c);
              const colorClass = getCssClassFromColor(c);
              const isSelected = selectedColor === c;

              return (
                <div
                  key={id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  onMouseEnter={() => setHoverColor(c)}
                  onMouseLeave={() => setHoverColor(null)}
                  className={`${styles.button} ${
                    colorClass && styles[colorClass] ? styles[colorClass] : ""
                  } ${isSelected ? styles.selected : ""}`}
                  role="button"
                  tabIndex={0}
                  title={name}
                />
              );
            })}
            {remainingColors > 0 && (
              <div className={styles.remainingIndicator}>
                +{remainingColors}
              </div>
            )}
          </>
        ) : (
          <p>No colors available</p>
        )}
      </div>
    </div>
  );
}
