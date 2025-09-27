"use client";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function ProductTypeTile({ typeName, typeSlug }) {
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  const handleCustomizeClick = () => {
    router.push(`/products/${typeSlug}`); // Navigate to /products/[type]
  };

  const safeTypeName = typeName || "";
  const safeTypeSlug = typeSlug || "";

  const getImageUrl = () => {
    if (!safeTypeName) return ""; // fallback to avoid crashing
    return `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/productTypes%2F${safeTypeName
      .toLowerCase()
      .replace(/\s+/g, "")}.png?alt=media`;
  };

  return (
    <div
      className={styles.productTile}
      onClick={safeTypeSlug ? handleCustomizeClick : undefined}
      role="button"
      tabIndex={0}
      aria-label={safeTypeName ? `View ${safeTypeName} category` : "Category"}
    >
      <div className={styles.productName}>
        {safeTypeName || "Unnamed Category"}
      </div>

      <div className={styles.productImagecontainer}>
        {imageError || !safeTypeName ? (
          <p>Image not available</p>
        ) : (
          <NextImage
            src={getImageUrl()}
            alt={`${safeTypeName} category`}
            width={300}
            height={300}
            className={styles.productImage}
            priority={true}
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </div>
  );
}
