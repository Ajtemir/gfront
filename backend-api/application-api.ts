import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {backendUrl} from "@/env-variables";
import {Application} from "@/types/application";

export const applicationApi = createApi({
    reducerPath: 'applicationAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl
    }),
    endpoints: (build) => ({

        getApplicationById : build.query<Application, number>({
            query(id: number) {
                return `applications/${id}`;
            },
        }),

        updateApplication : build.mutation<void, Application>({
            query: (application) => ({
                url: '/applications/create',
                method: 'POST',
                body: application
            })
        }),

        getApplications : build.query<GetApplicationsResult, {pageNumber:number, pageSize:number}>({
            query: (pagination) => ({
                url: '/applications',
                params: {
                    ...pagination
                }
            })
        }),

    })
})


export interface GetApplicationsResult{
    items:Application[]
    totalCount:number
    pageNumber: number
    totalPages:number
    hasPreviousPage:boolean
    hasNextPage:boolean
}

export const {
    useGetApplicationByIdQuery,
    useUpdateApplicationMutation,
    useGetApplicationsQuery,
} = applicationApi




