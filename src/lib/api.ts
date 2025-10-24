const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) throw new Error(`Backend error: ${res.statusText}`);
  return res.json();
}
