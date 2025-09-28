"use client";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function TypeTile({ typeName, typeSlug, imgType, tileType }) {
  const router = useRouter();

  const [imageError, setImageError] = useState(false);

  const handleCustomizeClick = () => {
    router.push(`/${tileType}s/${typeSlug}`); // Navigate to /products/[type]
  };

  const safeTypeName = typeName || "";
  const safeTypeSlug = typeSlug || "";

  const getImageUrl = () => {
    if (!safeTypeName) return ""; // fallback to avoid crashing
    return `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/${tileType}Types%2F${safeTypeName
      .toLowerCase()
      .replace(/\s+/g, "")}.${imgType}?alt=media`;
  };

  return (
    <div
      className={styles.tile}
      onClick={safeTypeSlug ? handleCustomizeClick : undefined}
      role="button"
      tabIndex={0}
      aria-label={safeTypeName ? `View ${safeTypeName} category` : "Category"}
    >
      <div className={styles.name}>{safeTypeName || "Unnamed Category"}</div>

      <div className={styles.imageContainer}>
        {imageError || !safeTypeName ? (
          <>
            <p>Image not available</p>
            <p>{getImageUrl()}</p>
          </>
        ) : (
          <NextImage
            src={getImageUrl()}
            alt={`${safeTypeName} category`}
            width={300}
            height={300}
            className={styles.image}
            priority={true}
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </div>
  );
}
