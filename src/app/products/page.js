// app/products/page.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styles from "./page.module.css";
import ProductTile from "../components/ProductTile/page";
export const metadata = {
  title: "Products – Indy Laser Designs",
};
export default async function Products() {
  let products = [];
  try {
    const productSnapshot = await getDocs(collection(db, "products"));
    products = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }

  return (
    <div className={styles.products}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductTile
            key={product.id}
            productTitle={product.name}
            colors={product.colors}
            productId={product.id}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
