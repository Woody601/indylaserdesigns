import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import NextImage from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug) {
    return { title: "Material not found – Indy Laser Designs" };
  }

  let material = null;
  try {
    const q = query(collection(db, "materialTypes"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      material = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (error) {
    console.error("Error fetching material:", error.message);
  }

  if (!material) {
    // 👇 return proper 404 metadata
    return { title: "Material Not Found – Indy Laser Designs" };
  }

  return {
    title: `${material.name} – Indy Laser Designs`,
  };
}

export default async function MaterialPage({ params }) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  let material = null;
  try {
    const q = query(collection(db, "materialTypes"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      material = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (error) {
    console.error("Error fetching material:", error.message);
  }

  if (!material) {
    notFound();
  }
  const { name, description, imgType, tileType } = material;
  const safeTypeName = name || "";
  const safeTileType = tileType || "material"; // fallback if missing
  const safeImgType = imgType || "webp"; // fallback if missing

  const getImageUrl = () => {
    if (!safeTypeName) return "";
    return `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/${safeTileType}Types%2F${safeTypeName
      .toLowerCase()
      .replace(/\s+/g, "")}.jpg?alt=media`;
  };

  return (
    <div className={styles.materialInfo}>
      <h1 className={styles.header}>{name}</h1>

      <div className={styles.imageContainer}>
        <NextImage
          src={getImageUrl()}
          alt={`${safeTypeName} category`}
          width={300}
          height={300}
          className={styles.image}
          priority={true}
        />
      </div>

      {description && <p>{description}</p>}
    </div>
  );
}
