import { UserSchema } from "@/schemas";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { backendUrl } from "@/env-variables";

const baseUrl = `${backendUrl}/account`

type LoginRequest = {
  username: string;
  password: string;
}

async function login(request: LoginRequest) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json')
  
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({
      userName: request.username,
      password: request.password
    }),
    headers,
    // allow to save auth cookies
    credentials: 'include'
  })
  
  const json = await response.json();
  const user = await UserSchema.validate(json)
  return user;
}

async function logout() {
  await fetchWithCredentials(`${baseUrl}/logout`, {
    method: 'POST',
    // allow to remove auth cookies
    credentials: 'include'
  })
}

export {
  login,
  logout,
}