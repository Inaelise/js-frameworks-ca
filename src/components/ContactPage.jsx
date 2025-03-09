import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../css/ContactPage.module.css";
import { Send } from "lucide-react";

const schema = yup
  .object({
    fullName: yup
      .string()
      .min(3, "Your name should be at least 3 characters.")
      .required("Please enter your full name"),
    subject: yup
      .string()
      .min(3, "The subject should be at least 3 characters")
      .required("Please enter a subject"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Please enter your email"),
    message: yup
      .string()
      .min(3, "The message should be at least 3 characters")
      .required("Please enter a message"),
  })
  .required();

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [showModal, setShowModal] = useState(false);

  function onSubmit(data) {
    console.log(data);
    setShowModal(true);
    reset();
  }

  return (
    <>
      <head>
        <meta
          name="description"
          content="This is the contact page. Fill in the form to send us a message."
        ></meta>
        <title>Contact us</title>
      </head>
      <main className={styles.contactContainer}>
        <h1>Contact us</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full name</label>
            <input
              className={styles.formInput}
              placeholder="Enter your full name"
              id="name"
              {...register("fullName")}
            />
            <p className={styles.errorMessage}>{errors.fullName?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input
              className={styles.formInput}
              placeholder="Enter the subject here"
              id="subject"
              {...register("subject")}
            />
            <p className={styles.errorMessage}>{errors.subject?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.formInput}
              placeholder="Example@outlook.com"
              id="email"
              {...register("email")}
            />
            <p className={styles.errorMessage}>{errors.email?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              className={styles.formTextarea}
              placeholder="Type your message here"
              id="message"
              {...register("message")}
            ></textarea>
            <p className={styles.errorMessage}>{errors.message?.message}</p>
          </div>
          <button
            className={styles.contactButton}
            type="submit"
            title="Send message"
          >
            <Send size={20} strokeWidth={1.5} />
            Send
          </button>
        </form>
        {/* Modal */}
        {showModal && (
          <div className={styles.contactModal}>
            <div className={styles.modalBorder}>
              <h2>Thank you for submitting your message!</h2>
              <p>You will get a reply within 1-2 business days.</p>
              <button
                className={styles.modalButton}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
