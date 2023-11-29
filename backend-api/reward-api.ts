import { CreateReward, Reward, UpdateReward } from "@/types/reward";
import { fetchWithCredentials } from "./fetch-with-credentials"
import { RewardArraySchema, RewardSchema } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { minutesToMilliseconds } from "date-fns";
import {backendUrl} from "@/env-variables";

const baseUrl = `${backendUrl}/rewards`;

const rewardKeys = {
    all: ['rewards'] as const,
    detail: (id: number) => [...rewardKeys.all, id.toString()] as const,
}

const useCreateReward = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: CreateReward) => fetchWithCredentials(`${baseUrl}/create`, {
            method: 'POST',
            body: JSON.stringify(request)
        })
          .then(response => response.json())
          .then(json => RewardSchema.validate(json))
          .then(data => data as Reward),
        onSuccess: (reward, _) =>
          queryClient.setQueryData(rewardKeys.detail(reward.id), reward)
    })
}


const useRewards = () => useQuery({
    queryKey: rewardKeys.all,
    queryFn: () => fetchWithCredentials(`${baseUrl}`)
        .then(response => response.json())
        .then(json => RewardArraySchema.validate(json))
        .then(data => data as Reward[]),
    staleTime: minutesToMilliseconds(2),
})

const useReward = (id: number) => useQuery({
    queryKey: rewardKeys.detail(id),
    enabled: !!id,
    queryFn: () => fetchWithCredentials(`${baseUrl}/${id}`)
        .then(response => response.json())
        .then(json => RewardSchema.validate(json))
        .then(data => data as Reward),
    staleTime: minutesToMilliseconds(3),
})

const useUpdateReward = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: UpdateReward) => fetchWithCredentials(`${baseUrl}/${request.id}/update`, {
            method: 'PUT',
            body: JSON.stringify(request)
        }),
        onSuccess: (_, request) =>
          queryClient.invalidateQueries({queryKey: rewardKeys.detail(request.id)})
    })
}


const useDeleteReward = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (rewardId: number) => fetchWithCredentials(`${baseUrl}/${rewardId}/delete`, {
            method: 'DELETE'
        }),
        onSuccess: (_, rewardId) => queryClient.removeQueries({queryKey: rewardKeys.detail(rewardId)})
    })
}


export {
    useCreateReward,
    useRewards,
    useReward,
    useUpdateReward,
    useDeleteReward,
}
