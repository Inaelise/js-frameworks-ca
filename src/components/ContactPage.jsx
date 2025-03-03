import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <main>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Full name</label>
          <input id="name" {...register("fullName")} />
          <p>{errors.fullName?.message}</p>
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input id="subject" {...register("subject")} />
          <p>{errors.subject?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" {...register("message")}></textarea>
          <p>{errors.message?.message}</p>
        </div>
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
