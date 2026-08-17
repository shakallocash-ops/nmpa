/**
 * Public pages serve published data immediately and refresh Neon in the
 * background so /admin is not blocked by homepage counts.
 */

const FRESH_MS = 60_000;
const PLACEHOLDER_MS = 8_000;
const QUERY_MS = 6_000;

type Entry<T> = { value: T; expires: number };

const store = new Map<string, Entry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();
let publicQueue: Promise<unknown> = Promise.resolve();

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Public query exceeded ${ms}ms`));
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const run = publicQueue.then(fn, fn);
  publicQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export async function rememberPublic<T>(
  key: string,
  compute: () => Promise<T>,
  fallback: T,
  ttlMs = FRESH_MS
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;

  if (hit && hit.expires > now) {
    return hit.value;
  }

  if (hit) {
    void refresh(key, compute, fallback, ttlMs);
    return hit.value;
  }

  store.set(key, { value: fallback, expires: now + PLACEHOLDER_MS });
  void refresh(key, compute, fallback, ttlMs);
  return fallback;
}

function refresh<T>(
  key: string,
  compute: () => Promise<T>,
  fallback: T,
  ttlMs: number
): Promise<T> {
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const run = enqueue(() =>
    withTimeout(compute(), QUERY_MS)
      .then((value) => {
        store.set(key, { value, expires: Date.now() + ttlMs });
        return value;
      })
      .catch(() => {
        const stale = store.get(key) as Entry<T> | undefined;
        if (stale) return stale.value;
        store.set(key, {
          value: fallback,
          expires: Date.now() + PLACEHOLDER_MS
        });
        return fallback;
      })
  ).finally(() => {
    inflight.delete(key);
  });

  inflight.set(key, run);
  return run;
}
