export type VerifyStatus = "loading" | "success" | "error" | "resending";

export interface IVerificationStatus {
  status: VerifyStatus;
  message?: string | null;
  error?: string | null;
  onRetry: () => void;
};