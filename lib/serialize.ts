export function serialize(value: unknown) {
  return JSON.parse(
    JSON.stringify(value, (_key, current) => {
      if (
        current &&
        typeof current === "object" &&
        typeof current.toNumber === "function"
      ) {
        return current.toNumber();
      }
      if (typeof current === "bigint") {
        return Number(current);
      }
      return current;
    })
  );
}

export function errorMessage(error: unknown, fallback = "Something went wrong.") {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
