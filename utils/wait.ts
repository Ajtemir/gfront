export const wait = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time));

export const waitForData = <T>(data: T, time: number): Promise<T> => new Promise(resolve =>
    setTimeout(() => resolve(data), time))
