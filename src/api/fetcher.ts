const apiUrl = process.env.REACT_APP_API_BASE_URL;

type Path = "login" | "register" | "logout" | "getUser";

export const fetcher = <T>(path: Path, init?: RequestInit) => {
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
