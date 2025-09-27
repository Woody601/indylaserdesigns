// app/products/page.js

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styles from "./page.module.css";
import ProductTypeTile from "../components/ProductTypeTile/page";
export const metadata = {
  title: "Products – Indy Laser Designs",
};

export default async function Products() {
  let products = [];
  try {
    const productSnapshot = await getDocs(collection(db, "productTypes"));
    products = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }

  return (
    <>
      <h1 className={styles.header}>Products</h1>
      <div className={styles.products}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductTypeTile
              typeName={product.name}
              typeSlug={product.slug}
              key={product.id}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
}
