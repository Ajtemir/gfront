import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {backendUrl} from "@/env-variables";
import {Application} from "@/types/application";

export const applicationApi = createApi({
    reducerPath: 'userAPI',
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



    })
})

export const {
    useGetApplicationByIdQuery,
    useUpdateApplicationMutation,
} = applicationApi




