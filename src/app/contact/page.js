import ContactForm from "../components/ContactForm/page";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact – Indy Laser Designs",
};

export default function ContactPage() {
  return (
    <div className={styles.contact}>
      <h1>Contact</h1>
      <p>
        Please enter the details of your request. We will respond as soon as
        possible.
      </p>

      <ContactForm />
    </div>
  );
}
