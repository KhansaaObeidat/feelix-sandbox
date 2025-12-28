# Frontend Production Readiness Validation

This is a **Next.js** project bootstrapped with `create-next-app`, implemented as part of a sandbox technical validation task.

The goal of this project is to demonstrate **production-ready frontend behavior** for a SaaS platform, focusing on:
- Environment-based API configuration
- Authentication-related flows
- Secure API integration
- Loading, error, and empty states
- Clean and maintainable frontend code

UI design is intentionally kept minimal and is not part of the evaluation.

---

## Getting Started

### Running the Development Server

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the application in your browser:
```
http://localhost:3000
```

---

## Environment Configuration

API access is configured using environment variables.

Example `.env.local`:

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ENV=development
```

### Notes
- In Next.js, only variables prefixed with `NEXT_PUBLIC_` are exposed to client-side code; anything without the prefix is server-only.
- Never store secrets in frontend env files (API keys, service credentials, long-lived tokens) because `NEXT_PUBLIC_` values are bundled and visible in the browser.
- Dev/Staging/Prod differ mainly by API base URLs, feature flags, and security/observability settings (e.g., HTTPS, CSP, logging/monitoring).

---

## Implemented Features

### Dashboard Analytics
- Fetches analytics data from `/api/analytics`
- Supports query parameters (time, category, status)
- Filter controls sync to the URL and refetch safely on change
- Handles loading, empty, and error states
- Validates the response shape before rendering to guard against backend drifts

### Email / Phone Verification
- Route: `/verify?token=xxxx`
- Extracts token from URL query parameters
- Automatically submits verification request on page load
- Shows loading, success, and error states
- Redirects to login on success
- Displays "Resend verification" action on error

### Forgot Password
- Route: `/forgot-password`
- Submits email to request password reset
- Calls `POST /auth/password-reset-request`
- Displays success message:
  "Please check your email to reset your password."
- Handles API errors gracefully

### Reset Password Confirmation
- Route: `/reset-password?token=xxxx`
- Extracts token from URL query parameters
- Displays a form with:
  - New password
  - Confirm password
- Validates password match on the frontend
- Submits to `POST /auth/password-reset-confirm`
- Shows loading and error states
- Redirects to login on successful API response

---

## Local Testing Notes

No backend is provided as part of this sandbox task.
Backend endpoints are assumed to exist as specified in the requirements.

When running locally without a backend implementation:
- API requests may fail (e.g., network error / 404 if no mock routes are added)
- Error states are expected and are handled gracefully
- Redirects occur only on successful API responses

Note: The task only specifies `POST /auth/verify`, so the “Resend verification” action is implemented as a safe retry of the same verification request (no extra backend assumptions).

---

## Written Questions

### 1. How do these flows behave differently in Development, Staging, and Production?
- **Development:** Points to local/test APIs, verbose errors, feature flags enabled for faster iteration.
- **Staging:** Mirrors production configs/URLs with test data, feature flags close to release settings, errors logged but minimally exposed to users.
- **Production:** Real services and data, strict error redaction, HTTP-only auth cookies, CSP and HTTPS enforced, monitoring/alerts on failures.

### 2. What frontend mistakes commonly break CI/CD pipelines?
- TypeScript or ESLint errors.
- Missing or misconfigured environment variables.
- Incorrect import paths or case sensitivity issues.
- Hardcoded environment-specific values.
- Dependency or build configuration issues.

### 3. How do you protect frontend code from backend API changes?
- Centralizing API calls in a single service layer.
- Using clear interfaces or types for API responses.
- Handling loading, error, and empty states consistently.
- Avoiding assumptions that backend responses are always valid.
- Documenting assumptions and updating them when APIs change.

### 4. How should tokens be handled safely in frontend authentication flows?
- Avoid storing sensitive tokens in localStorage when possible.
- Prefer HttpOnly cookies for authentication.
- Tokens passed via URLs should be short-lived and never logged.
- Do not expose tokens in console logs or error messages.
- Always use HTTPS in staging and production environments.

---

## Test Routes

- `/verify?token=test`
- `/forgot-password`
- `/reset-password?token=test`




