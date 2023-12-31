import { backendUrl } from "@/env-variables";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { CandidateWithoutImageArraySchema } from "@/schemas";
import { Candidate, CandidateWithoutImage } from "@/types/candidate";

const baseUrl = `${backendUrl}/candidates`;

const candidateKeys = {
  all: ['candidates'] as const,
  detail: (id: number) => [...candidateKeys.all, id.toString()] as const,
}

/** @summary Returns brief information about candidates. */
const useCandidates = () => useQuery({
  queryKey: candidateKeys.all,
  queryFn: () => fetchWithCredentials(`${baseUrl}`)
    .then(response => response.json())
    .then(json => CandidateWithoutImageArraySchema.validate(json))
    .then(data => data as CandidateWithoutImage[]),
})

/** @summary Returns full information about candidate. Depending on a type of candidate, returns different data. */
const useCandidate = (id: number) => useQuery({
  queryKey: candidateKeys.detail(id),
  enabled: !!id,
  queryFn: () => fetchWithCredentials(`${baseUrl}/${id}`)
    .then(response => response.json())
    // .then(json => CandidateSchema.validate(json))
    .then(data => data as Candidate)
})

const useDeleteCandidate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (candidateId: number) => 
      fetchWithCredentials(`${baseUrl}/${candidateId}/delete`, {
        method: 'DELETE'
      }),
    onSuccess: (_, candidateId) =>
      queryClient.removeQueries(candidateKeys.detail(candidateId))
  })
}

export {
  useCandidates,
  useCandidate,
  useDeleteCandidate,
}