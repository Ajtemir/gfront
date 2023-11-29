export function useTimeout(timeoutDurationMs: number, promise: Promise<void>) {
  const timeout: Promise<void> = new Promise((resolve, reject) =>
    setTimeout(
      () => reject(`Обещание (Promise) истекло после ${timeoutDurationMs} мс.`),
      timeoutDurationMs));

  return Promise.race([
    promise,
    timeout
  ]);
}
