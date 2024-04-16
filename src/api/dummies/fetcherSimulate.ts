export const d_fetcher =
  <T>(res: T, isFailed?: boolean, delay?: number) =>
  async (): Promise<T> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        isFailed ? reject(res) : resolve(res);
      }, delay ?? 1000);
    });

export const d_post =
  <P, T>(res: (p: P) => T, isFailed?: boolean, delay?: number) =>
  async (params: P): Promise<T> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        isFailed ? reject(res(params)) : resolve(res(params));
      }, delay ?? 1000);
    });
