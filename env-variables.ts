const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backendUrl) {
  throw new Error("Could not bind 'NEXT_PUBLIC_BACKEND_URL' environment variable.")
}

export {
  backendUrl
}
