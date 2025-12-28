"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VerifyStatus } from "./verification-status-model";
import VerificationStatus from "./verification-status";
import { apiService } from "../services/api-service";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verify = async (mode: "loading" | "resending") => {
    if (!token) {
      setStatus("error");
      setError("Missing verification token.");
      return;
    }

    try {
      setStatus(mode);
      setError(null);
      setMessage(null);

      await apiService("/auth/verify", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      setStatus("success");
      setMessage("Account verified. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Verification failed.");
    }
  };

  useEffect(() => {
    verify("loading");
  }, [token]);

  return (
    <VerificationStatus
      status={status}
      message={message}
      error={error}
      onRetry={() => verify("resending")}
    />
  );
}
