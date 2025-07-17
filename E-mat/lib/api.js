// Server-side: Directly connect to backend service
// Client-side: Use proxy through Next.js API routes

const isServer = typeof window === 'undefined';

export async function fetchFromBackend(path, options = {}) {
  const baseUrl = isServer 
    ? process.env.API_URL 
    : process.env.NEXT_PUBLIC_API_BASE_PATH;

  const url = `${baseUrl}${path}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.statusText}`);
  }

  return response.json();
}