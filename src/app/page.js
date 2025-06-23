// Remove Image import if ProductItem doesn't use next/image
import styles from "./page.module.css";
export const metadata = {
  title: "Indy Laser Designs",
};
export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1>INDY LASER DESIGNS</h1>
      </section>
    </>
  );
}
