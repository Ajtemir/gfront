import { backendUrl } from "@/env-variables";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { MotherSchema } from "@/schemas";
import { CreateMother, Mother, UpdateMotherDetails, UpdateMotherImage } from "@/types/mother";
import { formatDateOnly } from "@/utils/format-date-only";

const baseUrl = `${backendUrl}/mothers`;

const motherKeys = {
  all: ['mothers'] as const,
  detail: (id: number) => [...motherKeys.all, id.toString()] as const,
}

const useCreateMother = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateMother) => fetchWithCredentials(`${baseUrl}/create`, {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        birthDate: formatDateOnly(request.birthDate),
        deathDate: formatDateOnly(request.deathDate),
      })
    })
      .then(response => response.json())
      .then(json => MotherSchema.validate(json))
      .then(data => data as Mother),
    onSuccess: (mother, _) =>
      queryClient.setQueryData(motherKeys.detail(mother.id), mother)
  })
}

const useUpdateMotherDetails = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: UpdateMotherDetails) => fetchWithCredentials(`${baseUrl}/${request.id}/update-details`, {
      method: 'PUT',
      body: JSON.stringify({
        ...request,
        birthDate: formatDateOnly(request.birthDate),
        deathDate: formatDateOnly(request.deathDate),
      })
    }),
    onSuccess: (_, request) => 
      queryClient.invalidateQueries(motherKeys.detail(request.id))
  })
}

const useUpdateMotherImage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: UpdateMotherImage) => fetchWithCredentials(`${baseUrl}/${request.id}/update-image`, {
      method: 'PUT',
      body: JSON.stringify(request)
    }),
    onSuccess: (_, request) =>
      queryClient.invalidateQueries(motherKeys.detail(request.id))
  })
}

const useMother = (id: number) => useQuery({
  queryKey: motherKeys.detail(id),
  enabled: !!id,
  queryFn: () => fetchWithCredentials(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(json => MotherSchema.validate(json))
    .then(data => data as Mother),
})

export {
  useCreateMother,
  useUpdateMotherDetails,
  useUpdateMotherImage,
  useMother,
}