import { auth } from "@configs/firebase";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const fetchWithAuth = async (
  url: string,
  options: FetchOptions = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const token = await auth.currentUser?.getIdToken();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export default fetchWithAuth;
