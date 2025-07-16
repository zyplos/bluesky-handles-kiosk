"use client";

import { useActionState } from "react";
import { updateHandle, type HandleFormState } from "./actions";

const initialState = {
  message: "",
  errors: [],
};

export function HandleForm() {
  // use https://stackoverflow.com/a/79271939 and not the next docs
  const [state, formAction, pending] = useActionState<
    HandleFormState,
    FormData
  >(updateHandle, initialState);

  return (
    <form action={formAction}>
      <h2>i'm in the box</h2>

      <label htmlFor="handleString">handle you'd like</label>
      <input type="text" id="handleString" name="handleString" required />

      <label htmlFor="didString">did</label>
      <input type="text" id="didString" name="didString" required />

      <p aria-live="polite">{state.message}</p>

      <button type="submit" disabled={pending}>
        claim handle
      </button>
    </form>
  );
}
