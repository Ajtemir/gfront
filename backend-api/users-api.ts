import { UserSchema } from "@/schemas";
import { User } from "@/types/user";
import { backendUrl } from "@/env-variables";


const baseUrl = `${backendUrl}/users`

export const getUser = async (id: number) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    next: {
      tags: [`users-${id}`]
    }
  })
  
  const json = await response.json()
  const user = await UserSchema.validate(json) as User
  return user;
}