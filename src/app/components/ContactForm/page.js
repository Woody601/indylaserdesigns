"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, number, message }),
    });

    if (res.ok) {
      setFullName("");
      setEmail("");
      setNumber("");
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      setError("Something went wrong. Please try again or call us directly.");
    }

    setSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    else if (name === "email") setEmail(value);
    else if (name === "number") setNumber(value);
    else if (name === "message") setMessage(value);
  };

  return (
    <>
      {success && (
        <div className={styles.toast}>Message sent successfully!</div>
      )}
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
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.button} type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
