"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/Button";
import styles from "@/styles/Claim.module.scss";

export function HandleForm() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const res = await fetch("/api/claims", {
        method: "POST",
        body: formData,
      });

      const { message: newMessage, errors: newErrors } = await res.json();

      if (!res.ok) {
        setMessage(newMessage);
        setErrors(newErrors);
        return;
      }

      setMessage(newMessage);
      setErrors([]);
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <label htmlFor="handleString">handle you'd like</label>
        <input type="text" id="handleString" name="handleString" required />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="didString">did</label>
        <input type="text" id="didString" name="didString" required />
      </div>

      <p aria-live="polite">{message}</p>

      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <Button type="submit" disabled={isPending}>
        claim handle
      </Button>
    </form>
  );
}
