"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/Button";
import styles from "@/styles/Claim.module.scss";
import clsx from "clsx";

interface HandleFormProps {
  rootDomain: string;
}

export function HandleForm({ rootDomain }: HandleFormProps) {
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
    <form
      onSubmit={handleSubmit}
      className={clsx(styles.form, "sectionMargin")}
    >
      <div className={styles.formRow}>
        <label htmlFor="handleString">handle you'd like</label>
        <p className={styles.hint}>
          Letters, numbers, and dashes (-) only. No unicode.
        </p>
        <div className="flexRow">
          <input type="text" id="handleString" name="handleString" required />
          <p>.{rootDomain}</p>
        </div>
      </div>

      <div className={styles.formRow}>
        <label htmlFor="didString">did</label>
        <p className={styles.hint}>
          You can find this under{" "}
          <a
            href="https://bsky.app/settings/account"
            target="_blank"
            rel="noopener"
          >
            Settings {">"} Account {">"} Handle {">"} "I have my own domain"{" "}
            {">"} No DNS Panel
          </a>
        </p>
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
        Claim Handle
      </Button>
    </form>
  );
}
