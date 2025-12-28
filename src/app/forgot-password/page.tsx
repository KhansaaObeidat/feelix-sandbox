"use client";

import { FormEvent, useState } from "react";
import { apiService } from "../services/api-service";
import FormStatusMessage from "../components/form-status-message";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const cleanedEmail = email.trim();
    if (!cleanedEmail) {
      setErrorMessage("Email is required");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      await apiService("/auth/password-reset-request", {
        method: "POST",
        body: JSON.stringify({ email: cleanedEmail }),
      });

      setSuccessMessage("Please check your email to reset your password.");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to request password reset."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
      {!loading && (
        <FormStatusMessage error={errorMessage} success={successMessage} />
      )}{" "}
    </div>
  );
};

export default ForgotPassword;
