"use client";

type IFormStatusMessage = {
  error?: string | null;
  success?: string | null;
};

export default function FormStatusMessage({ error, success }: IFormStatusMessage) {
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (success) return <p>{success}</p>;
  return null;
}
