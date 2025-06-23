"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName && email && number && message) {
      console.log(fullName, email, number, message);
      router.push("/contact/success");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    else if (name === "email") setEmail(value);
    else if (name === "number") setNumber(value);
    else if (name === "message") setMessage(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formField}>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Name"
          value={fullName}
          onChange={handleChange}
          required
        />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          id="number"
          name="number"
          type="text"
          placeholder="Phone Number"
          value={number}
          onChange={handleChange}
          required
        />

        <textarea
          id="message"
          name="message"
          placeholder="Message"
          value={message}
          onChange={handleChange}
          required
        />

        <button className={styles.button} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
