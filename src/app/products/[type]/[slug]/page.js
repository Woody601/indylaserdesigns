import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import styles from "./page.module.css";
import ProductTile from "@/app/components/Product/Tile/page";

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
    <div className={styles.productInfo}>
      <h1 className={styles.header}>{name}</h1>
      <ProductTile
        key={product.id}
        productTitle={product.name}
        colors={product.colors}
        productSlug={product.slug}
        productType={product.type}
      />
    </div>
  );
}
