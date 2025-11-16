import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./page.module.css";
import ProductTile from "@/app/components/Product/Tile/page";

export async function generateMetadata({ params }) {
  // ✅ params is a Promise in your setup – await it first
  const { slug } = await params;

  let product = null;

  try {
    const itemsRef = collection(db, "products", "drinkware", "items");
    const q = query(itemsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const baseData = { id: docSnap.id, ...docSnap.data() };

      // Fetch colors subcollection
      const colorsRef = collection(docSnap.ref, "colors");
      const colorsSnap = await getDocs(colorsRef);
      const colors = colorsSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      product = { ...baseData, colors };
    }
  } catch (error) {
    console.error("Error fetching product in generateMetadata:", error.message);
  }

  if (!product) {
    return {
      title: "Product not found – Indy Laser Designs",
    };
  }

  return {
    title: `${product.name} – Indy Laser Designs`,
  };
}

export default async function CustomizePage({ params }) {
  // ✅ same here: await params before using its properties
  const { slug } = await params;

  let product = null;

  try {
    const itemsRef = collection(db, "products", "drinkware", "items");
    const q = query(itemsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const baseData = { id: docSnap.id, ...docSnap.data() };

      // Fetch colors subcollection
      const colorsRef = collection(docSnap.ref, "colors");
      const colorsSnap = await getDocs(colorsRef);
      const colors = colorsSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      product = { ...baseData, colors };
    }
  } catch (error) {
    console.error("Error fetching product:", error.message);
  }

  if (!product) {
    return <div className={styles.error}>Product not found.</div>;
  }

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.header}>{product.name}</h1>
      <ProductTile
        key={product.id}
        productTitle={product.name}
        colors={product.colors}
        productSlug={product.slug}
        productType={"drinkware"}
      />
    </div>
  );
}
