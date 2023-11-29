import { backendUrl } from "@/env-variables";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { CitizenSchema } from "@/schemas";
import { Citizen, CreateCitizen, UpdateCitizenDetails, UpdateCitizenImage } from "@/types/citizen";
import { formatDateOnly } from "@/utils/format-date-only";

const baseUrl = `${backendUrl}/citizens`;

const citizenKeys = {
  all: ['citizens'] as const,
  detail: (id: number) => [...citizenKeys.all, id.toString()] as const,
}

const useCreateCitizen = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: CreateCitizen) => fetchWithCredentials(`${baseUrl}/create`, {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        birthDate: formatDateOnly(request.birthDate),
        deathDate: formatDateOnly(request.deathDate),
      })
    })
      .then(response => response.json())
      .then(json => CitizenSchema.validate(json))
      .then(data => data as Citizen),
    onSuccess: (citizen, _) =>
      queryClient.setQueryData(citizenKeys.detail(citizen.id), citizen)
  })
}

const useUpdateCitizenDetails = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (request: UpdateCitizenDetails) => fetchWithCredentials(`${baseUrl}/${request.id}/update-details`, {
      method: 'PUT',
      body: JSON.stringify({
        ...request,
        birthDate: formatDateOnly(request.birthDate),
        deathDate: formatDateOnly(request.deathDate),
      })
    }),
    onSuccess: (_, request) => queryClient.invalidateQueries(citizenKeys.detail(request.id))
  })
}

const useUpdateCitizenImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (request: UpdateCitizenImage) => fetchWithCredentials(`${baseUrl}/${request.id}/update-image`, {
      method: 'PUT',
      body: JSON.stringify(request)
    }),
    onSuccess: (_, request) => queryClient.invalidateQueries(citizenKeys.detail(request.id))
  })
}


const useCitizen = (id: number) => useQuery({
  queryKey: citizenKeys.detail(id),
  enabled: !!id,
  queryFn: () => fetchWithCredentials(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(json => CitizenSchema.validate(json))
    .then(data => data as Citizen),
})

export {
  useCreateCitizen,
  useUpdateCitizenDetails,
  useUpdateCitizenImage,
  useCitizen,
}
