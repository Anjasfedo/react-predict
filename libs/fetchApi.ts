import useJwtStore from "@stores/jwtStore";
import fetchWithAuth from "./fetchWithAuth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const testEnv = () => {
  console.log(BACKEND_URL);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchData = async (path: string): Promise<any> => {
  return fetchWithAuth(BACKEND_URL + path);
};

export const postData = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  return fetchWithAuth(BACKEND_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const postDataGetToken = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
  try {
    const response = await fetch(BACKEND_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Extract token from response data
    const responseData = await response.json();
    const token = responseData.token;

    // Store token in JWT store
    useJwtStore.getState().setToken(token);
  } catch (error) {
    console.error("Error in postDataWithToken:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
