// app/products/[type]/page.js
import { notFound } from "next/navigation"; // Import notFound
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./page.module.css";
import ProductCard from "@/app/components/Product/Card/page";

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const { type } = awaitedParams;

  let typeName = type; // fallback
  try {
    const snapshot = await getDocs(collection(db, "productTypes"));
    const types = snapshot.docs.map((doc) => doc.data());
    const matchedType = types.find((t) => t.slug === type);
    if (matchedType) typeName = matchedType.name;
  } catch (error) {
    console.error("Error fetching product types:", error.message);
  }

  return {
    title: `${typeName} – Indy Laser Designs`,
  };
}

export default async function Types({ params }) {
  const awaitedParams = await params;
  const { type } = awaitedParams;

  let products = [];
  let productTypeData = null;

  // Fetch all product types and find matching slug
  try {
    const productTypeSnapshot = await getDocs(collection(db, "productTypes"));
    const types = productTypeSnapshot.docs.map((doc) => doc.data());
    productTypeData = types.find((t) => t.slug === type);

    // Check if product type is invalid
    if (!productTypeData) {
      notFound(); // Trigger 404 page if no matching type is found
    }
  } catch (error) {
    notFound(); // Optionally trigger 404 on error
  }

  // Fetch all products and filter by type
  try {
    const productSnapshot = await getDocs(collection(db, "products"));
    products = productSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((product) => product.type === type);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }

  return (
    <>
      <h1 className={styles.header}>
        {productTypeData ? productTypeData.name : type}
      </h1>
      <div className={styles.products}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              productTitle={product.name}
              colors={product.colors}
              productSlug={product.slug}
              productType={product.type}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
}
