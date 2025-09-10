// app/products/customize/[id]/page.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "../../../page.module.css";

export async function generateMetadata({ params }) {
  // Await params before using
  const { id } = await params;
  return {
    title: `Customize ${id} – Indy Laser Designs`,
  };
}

export default async function CustomizePage({ params }) {
  const { id } = await params; // Await params here

  let product = null;
  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      product = { id: productSnap.id, ...productSnap.data() };
    }
  } catch (error) {
    console.error("Error fetching product:", error.message);
  }

  if (!product) {
    return <div className={styles.error}>Product not found.</div>;
  }

  return (
    <div className={styles.customizePage}>
      <h1>{product.name}</h1>
      <p>{product.colors}</p>
      {/* Additional product details here */}
    </div>
  );
}
