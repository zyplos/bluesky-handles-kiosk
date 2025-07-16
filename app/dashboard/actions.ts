"use server";

export interface HandleFormState {
  message: string;
  errors: string[];
}

export async function updateHandle(
  initialState: HandleFormState,
  formData: FormData
) {
  const handle = formData.get("handleString");
  const did = formData.get("didString");

  console.log("initialState", initialState);
  console.log("formData", formData);

  return { message: `claimed ${handle}`, errors: [] };
}
