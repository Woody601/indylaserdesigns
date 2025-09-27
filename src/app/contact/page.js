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
        Please call <a href="tel:317-313-7715">317-313-7715</a>, or email{" "}
        <a href="mailto:indylaserdesigns@gmail.com">
          indylaserdesigns@gmail.com
        </a>{" "}
        for any questions or requests, and we will get back with you as soon as
        possible.
      </p>
      {/* <p>
        Please enter the details of your request. We will respond as soon as
        possible.
      </p>
      <ContactForm /> */}
    </div>
  );
}
