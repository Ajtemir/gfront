import { backendUrl } from "@/env-variables";
import { CreateEntity, Entity, UpdateEntityDetails, UpdateEntityImage } from "@/types/entity";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EntitySchema } from "@/schemas";
import { minutesToMilliseconds } from "date-fns";

const baseUrl = `${backendUrl}/entities`;

const entityKeys = {
  all: ['entities'] as const,
  detail: (id: number) => [...entityKeys.all, id.toString()] as const,
}

const useCreateEntity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: CreateEntity) =>
      fetchWithCredentials(`${baseUrl}/create`, {
        method: 'POST',
        body: JSON.stringify(request),
      })
        .then(response => response.json())
        .then(json => EntitySchema.validate(json))
        .then(data => data as Entity),
    onSuccess: (entity, _) =>
      queryClient.setQueryData(entityKeys.detail(entity.id), entity)
  })
}

const useUpdateEntityDetails = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: UpdateEntityDetails) =>
      fetchWithCredentials(`${baseUrl}/${request.id}/update-details`, {
        method: 'PUT',
        body: JSON.stringify(request)
      }),
    onSuccess: (_, request) =>
        queryClient.invalidateQueries(entityKeys.detail(request.id))
  })
}

const useUpdateEntityImage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: UpdateEntityImage) =>
        fetchWithCredentials(`${baseUrl}/${request.id}/update-image`, {
          method: 'PUT',
          body: JSON.stringify(request)
        }),
      onSuccess: (_, request) =>
        queryClient.invalidateQueries(entityKeys.detail(request.id))
  })
}

const useEntity = (id: number) => useQuery({
  queryKey: entityKeys.detail(id),
  enabled: !!id,
  queryFn: () => fetchWithCredentials(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(json => EntitySchema.validate(json))
    .then(data => data as Entity),
  staleTime: minutesToMilliseconds(3),
})

export {
  useCreateEntity,
  useUpdateEntityDetails,
  useUpdateEntityImage,
  useEntity,
}
