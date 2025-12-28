"use client";

import { IVerificationStatus } from "./verification-status-model";

export default function VerificationStatus({
  status,
  message,
  error,
  onRetry,
}: IVerificationStatus) {
  if (status === "loading") return <p>Verifying...</p>;
  if (status === "success")
    return <p>{message || "Account verified. Redirecting to login..."}</p>;

  return (
    <div>
      <p style={{ color: "red" }}>{error || "Verification failed."}</p>

      <button onClick={onRetry}>

        {status === "resending" ? "Resending..." : "Resend verification"}
      </button>
    </div>
  );
}
