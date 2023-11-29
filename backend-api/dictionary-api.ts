import { useQuery } from "@tanstack/react-query";
import { fetchWithCredentials } from "@/backend-api/fetch-with-credentials";
import { backendUrl } from "@/env-variables";
import { Citizenship } from "@/types/citizenship";
import { minutesToMilliseconds } from 'date-fns'

const baseUrl = `${backendUrl}/dictionaries`;

const useCitizenships = () => useQuery({
  queryKey: ['citizenships'],
  queryFn: () => fetchWithCredentials(`${baseUrl}/citizenships`)
    .then(response => response.json())
    .then(data => data as Citizenship[]),
  staleTime: minutesToMilliseconds(30),
  cacheTime: minutesToMilliseconds(45),
})


export {
  useCitizenships
}