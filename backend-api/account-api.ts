import { UpdateUserDetails, User } from "@/types/user";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { UserSchema } from "@/schemas";
import { backendUrl } from "@/env-variables";
import {Application} from "@/types/application";
import {GetApplicationsResult} from "@/backend-api/application-api";

const baseUrl = `${backendUrl}/account`

const updateUserDetails = async (update: UpdateUserDetails) => {
  const response = await fetchWithCredentials(`${baseUrl}/update`, {
    method: 'PUT',
    body: JSON.stringify(update),
  })
  
  const json = await response.json()
  const user = await UserSchema.validate(json) as User;
  
  return user;
}

const updateUserImage = async ({id, image}: {id: number, image: string | null}) => {
  const response = await fetchWithCredentials(`${baseUrl}/update-image`, {
    method: 'PUT',
    body: JSON.stringify({id, image})
  })
  
  const updatedImage = await response.text()
  return updatedImage;
}

export {
  updateUserDetails,
  updateUserImage,
}