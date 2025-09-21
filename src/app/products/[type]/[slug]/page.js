import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const awaitedParams = await params; // ✅ await first
  const { slug } = awaitedParams;

  let product = null;
  try {
    const q = query(collection(db, "products"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (error) {
    console.error("Error fetching product:", error.message);
  }

  const { name, colors = [] } = product;

  return {
    title: `${name} – Indy Laser Designs`,
  };
}

export default async function CustomizePage({ params }) {
  const awaitedParams = await params; // ✅ await first
  const { slug } = awaitedParams;

  let product = null;
  try {
    const q = query(collection(db, "products"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
  } catch (error) {
    console.error("Error fetching product:", error.message);
  }

  if (!product) {
    return <div className={styles.error}>Product not found.</div>;
  }

  const { name, colors = [] } = product;

  return (
    <div className={styles.customizePage}>
      <h1>{name}</h1>

      <div className={styles.colorGrid}>
        {colors.map((color) => {
          const colorSlug = color.toLowerCase().replace(/\s+/g, "");
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/indy-laser-designs.firebasestorage.app/o/products%2F${name
            .toLowerCase()
            .replace(/\s+/g, "")}%2F${colorSlug}.png?alt=media`;

          return (
            <div key={colorSlug} className={styles.colorItem}>
              <img src={imageUrl} alt={`${name} - ${color}`} width={200} />
              <p>{color}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
