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

  const getImageUrl = () => {
    return `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/productTypes%2F${typeName
      .toLowerCase()
      .replace(/\s+/g, "")}.png?alt=media`;
  };

  return (
    <div
      className={styles.productTile}
      onClick={handleCustomizeClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${typeName} category`}
    >
      <div className={styles.productName}>{typeName}</div>
      {/* Product Type Image */}
      <div className={styles.productImagecontainer}>
        {imageError ? (
          <p>Image not available</p>
        ) : (
          <NextImage
            src={getImageUrl()}
            alt={`${typeName} category`}
            width={300}
            height={300}
            className={styles.productImage}
            priority={true}
            onError={() => setImageError(true)} // Handle image load error
          />
        )}
      </div>
    </div>
  );
}
