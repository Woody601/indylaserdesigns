import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug) {
    return { title: "Material not found – Indy Laser Designs" };
  }

  let material = null;
  try {
    const q = query(collection(db, "materials"), where("slug", "==", slug));
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
    notFound(); // 👈 trigger Next.js 404 page
  }

  let material = null;
  try {
    const q = query(collection(db, "materials"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      material = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (error) {
    console.error("Error fetching material:", error.message);
  }

  if (!material) {
    notFound(); // 👈 trigger 404 if slug not found in Firestore
  }

  const { name, description } = material;

  return (
    <div className={styles.customizePage}>
      <h1>{name}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
