import { backendUrl } from "@/env-variables";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateForeigner, Foreigner, UpdateForeignerDetails, UpdateForeignerImage } from "@/types/foreigner";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { ForeignerSchema } from "@/schemas";
import { formatDateOnly } from "@/utils/format-date-only";

const baseUrl = `${backendUrl}/foreigners`;

const foreignerKeys = {
  all: ['foreigners'] as const,
  detail: (id: number) => [...foreignerKeys.all, id.toString()] as const,
}

const useCreateForeigner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: CreateForeigner) => fetchWithCredentials(`${baseUrl}/create`, {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        birthDate: formatDateOnly(request.birthDate),
        deathDate: formatDateOnly(request.deathDate),
      })
    })
      .then(response => response.json())
      .then(json => ForeignerSchema.validate(json))
      .then(data => data as Foreigner),
    onSuccess: (foreigner, _) =>
      queryClient.setQueryData(foreignerKeys.detail(foreigner.id), foreigner)
  })
}

const useUpdateForeignerDetails = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: UpdateForeignerDetails) => fetchWithCredentials(`${baseUrl}/${request.id}/update-details`, {
      method: 'PUT',
      body: JSON.stringify({
        ...request,
        birthDate: formatDateOnly(request.birthDate),
        deathDate: formatDateOnly(request.deathDate),
      })
    }),
    onSuccess: (_, request) => queryClient.invalidateQueries(foreignerKeys.detail(request.id))
  }) 
}

const useUpdateForeignerImage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: UpdateForeignerImage) => fetchWithCredentials(`${baseUrl}/${request.id}/update-image`, {
      method: 'PUT',
      body: JSON.stringify(request)
    }),
    onSuccess: (_, request) => queryClient.invalidateQueries(foreignerKeys.detail(request.id))
  })
}

const useForeigner = (id: number) => useQuery({
  queryKey: foreignerKeys.detail(id),
  enabled: !!id,
  queryFn: () => fetchWithCredentials(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(json => ForeignerSchema.validate(json))
    .then(data => data as Foreigner),
})

export {
  useCreateForeigner,
  useUpdateForeignerDetails,
  useUpdateForeignerImage,
  useForeigner,
}