"use client";

import { useState, useTransition } from "react";
import clsx from "clsx";

import type { ClaimData } from "@/internals/apiTypes";
import { isStringEmpty } from "@/internals/utils";

import { Button } from "@/components/Button";
import styles from "@/styles/Claim.module.scss";

interface HandleFormProps {
  rootDomain: string;
  claimData: ClaimData | null;
}

export function HandleForm({ rootDomain, claimData }: HandleFormProps) {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [handleString, setHandleString] = useState(claimData?.handle || "");
  const [showForm, setShowForm] = useState(false);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Based on your hint, we can also enforce the rules here
    // const sanitizedValue = event.target.value
    //   .toLowerCase()
    //   .replace(/[^a-z0-9-]/g, "");
    setHandleString(event.target.value);
  };

  if (!showForm) {
    return (
      <div className="sectionMargin textContent">
        {claimData ? (
          <p>
            Your current claimed handle is{" "}
            <span className="bold">
              {claimData.handle}.{rootDomain}
            </span>
          </p>
        ) : (
          <p>You haven't claimed a handle yet.</p>
        )}
        <p>
          <Button
            onClick={() => {
              setShowForm((prev) => {
                return !prev;
              });
            }}
          >
            {claimData ? "Edit Claimed" : "Claim a"} Handle
          </Button>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(styles.form, "sectionMargin")}
    >
      <div className={styles.formRow}>
        <label htmlFor="handleString">handle you'd like</label>
        <p className={styles.hint}>Letters, numbers, and dashes (-) only.</p>
        <input
          type="text"
          id="handleString"
          name="handleString"
          className="bottomSpaceMargin"
          //
          required
          minLength={1}
          maxLength={100}
          //
          value={handleString}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <p className="textMuted">
          {claimData && (
            <>
              Your current handle is {claimData.handle}.{rootDomain}.{" "}
            </>
          )}
          {!isStringEmpty(handleString) && (
            <>
              Your {claimData && "new"} handle will be{" "}
              <span className={clsx("bold", styles.wordBreak)}>
                {handleString}.{rootDomain}
              </span>
            </>
          )}
        </p>
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
        <input
          type="text"
          id="didString"
          name="didString"
          required
          defaultValue={claimData?.did || ""}
        />
      </div>

      <p aria-live="polite" className="bottomSpaceMargin">
        {message}
      </p>

      {errors.length > 0 && (
        <ul className="bottomSpaceMargin">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="flexRow">
        <Button type="submit" disabled={isPending}>
          Claim Handle
        </Button>

        <Button
          onClick={() => {
            setShowForm((prev) => {
              return !prev;
            });
          }}
          outlined
          variant="alt"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
