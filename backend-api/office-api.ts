import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CreateOffice, Office, UpdateOfficeDetails} from "@/types/office";
import {fetchWithCredentials} from "@/backend-api/fetch-with-credentials";
import {backendUrl} from "@/env-variables";
import {OfficeSchema, OfficeArraySchema} from "@/schemas";
import {minutesToMilliseconds} from "date-fns";

const baseUrl = `${backendUrl}/offices`;

const officeKeys = {
  all: ['offices'] as const,
  detail: (id: number) => [...officeKeys.all, id.toString()] as const,
}


const useOffices = () => useQuery({
  queryKey: officeKeys.all,
  queryFn: () => fetchWithCredentials(`${baseUrl}`)
    .then(response => response.json())
    .then(json => OfficeArraySchema.validate(json))
    .then(data => data as Office[])
})

const useOffice = (id: number) => useQuery({
  queryKey: officeKeys.detail(id),
  enabled: !!id,
  queryFn: () => fetchWithCredentials(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(json => OfficeSchema.validate(json))
    .then(data => data as Office),
  staleTime: minutesToMilliseconds(3),
})


const useCreateOffice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateOffice) => fetchWithCredentials(`${baseUrl}/create`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
      .then(response => response.json())
      .then(json => OfficeSchema.validate(json))
      .then(data => data as Office),
    onSuccess: (office, request) =>
      queryClient.setQueryData(officeKeys.detail(office.id), office)
  })
}

const useUpdateOfficeDetails = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: UpdateOfficeDetails) => fetchWithCredentials(`${baseUrl}/${request.id}/update-details`, {
      method: 'PUT',
      body: JSON.stringify(request)
    }),
    onSuccess: (_, request) => queryClient.invalidateQueries({queryKey: officeKeys.detail(request.id)})
  })
}

const useDeleteOffice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (officeId: number) => fetchWithCredentials(`${baseUrl}/${officeId}/delete`, {
      method: 'DELETE',
    }),
    onSuccess: (_, officeId) => queryClient.invalidateQueries({queryKey: officeKeys.detail(officeId)})
  })
}


export {
  useOffices,
  useOffice,
  useCreateOffice,
  useUpdateOfficeDetails,
  useDeleteOffice,
}
