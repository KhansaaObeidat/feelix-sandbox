const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_ENV = process.env.NEXT_PUBLIC_ENV ?? "development";

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function apiService<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  console.log("API CALL:", url);

  let res: Response;

  try {
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-client-env": APP_ENV,
        ...(options?.headers || {}),
      },
    });
  } catch (err) {
    throw new Error("Network error while calling API");
  }

  if (!res.ok) {
    let message = "Something went wrong";

    try {
      const data = await res.json();
      message = data?.message || message;
    } catch {
      // ignore JSON parsing errors
    }

    throw new Error(message);
  }

  // handle empty response (204)
  if (res.status === 204) {
    return null as T;
  }

  return res.json();
}
