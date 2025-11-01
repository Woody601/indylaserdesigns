import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import ProductCard from "../../components/Product/Card/page";

export async function generateMetadata({ params }) {
  const { type } = await params;
  let typeName = type;

  try {
    const typeDoc = await getDoc(doc(db, "products", type));
    if (typeDoc.exists()) typeName = typeDoc.data().name || type;
  } catch (error) {
    console.error("Error fetching product type:", error.message);
  }

  return { title: `${typeName} – Indy Laser Designs` };
}

export default async function ProductTypePage({ params }) {
  const { type } = await params;
  let typeName = type;

  // Verify that the product type exists
  try {
    const typeDoc = await getDoc(doc(db, "products", type));
    if (!typeDoc.exists()) notFound();
    typeName = typeDoc.data().name || type;
  } catch (error) {
    console.error("Error fetching product type:", error.message);
    notFound();
  }

  // Fetch all items in this product type
  let items = [];
  try {
    const snapshot = await getDocs(collection(db, "products", type, "items"));
    items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }

  // For each item, fetch its color subcollection
  const itemsWithColors = await Promise.all(
    items.map(async (item) => {
      try {
        const colorsSnap = await getDocs(
          collection(db, "products", type, "items", item.id, "colors")
        );
        const colors = colorsSnap.docs.map((c) => {
          const data = c.data() || {};
          return {
            id: c.id,
            name: data.name || c.id, // if no name field, fallback to doc id
            smallimg: data.smallimg || null,
            bigimg: data.bigimg || null,
          };
        });
        return { ...item, colors };
      } catch (error) {
        console.error(`Error fetching colors for ${item.id}:`, error.message);
        return { ...item, colors: [] };
      }
    })
  );

  // Shape data for ProductCard
  const products = itemsWithColors.map((item) => {
    const productTitle = item.name || "Untitled Product";
    const productSlug =
      item.slug ||
      productTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    return {
      productTitle,
      productSlug,
      productType: type,
      colors: item.colors, // [{id, name, smallimg, bigimg}]
    };
  });

  return (
    <>
      <h1 className={styles.header}>{typeName}</h1>

      <div className={styles.products}>
        {products.length ? (
          products.map((p) => (
            <ProductCard
              key={p.productSlug}
              productTitle={p.productTitle}
              productSlug={p.productSlug}
              productType={p.productType}
              colors={p.colors}
            />
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </>
  );
}
