// app/materials/page.js

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styles from "./page.module.css";

import TypeTile from "../components/TypeTile/page";
export const metadata = {
  title: "Materials – Indy Laser Designs",
};

export default async function Materials() {
  let materials = [];
  try {
    const materialSnapshot = await getDocs(collection(db, "materialTypes"));
    materials = materialSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching materials:", error.message);
  }

  return (
    <>
      <h1 className={styles.header}>Materials</h1>
      <div className={styles.products}>
        {materials.length > 0 ? (
          materials.map((material) => (
            <TypeTile
              typeName={material.name}
              typeSlug={material.slug}
              key={material.id}
              imgType={"jpg"}
              tileType={"material"}
            />
          ))
        ) : (
          <p>No materials available.</p>
        )}
      </div>
    </>
  );
}
