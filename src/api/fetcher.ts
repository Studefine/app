const apiUrl = process.env.REACT_APP_API_BASE_URL;

export type ApiPath =
  | "login"
  | "register"
  | "logout"
  | "getUser"
  | "paths"
  | `phrases`
  | `phrases/${string}`
  | "topics"
  | `topics/${string}`
  | `topics/${string}/topics`
  | `topics/${string}/phrases`
  | `paths/${string}`;

export const fetcher = <T>(path: ApiPath, init?: RequestInit) => {
  const fetchPromise = fetch(`${apiUrl}/${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
  return {
    ...fetchPromise,
    json: () =>
      fetchPromise.then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        return response.json() as Promise<T>;
      }),
    text: () => fetchPromise.then((response) => response.text()),
  };
};
