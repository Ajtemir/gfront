import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {backendUrl} from "@/env-variables";
import {EndpointBuilder} from "@reduxjs/toolkit/query/react";
import {Application} from "@/types/application";

export const documentApi = createApi({
    reducerPath: 'documentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl
    }),

    endpoints:(build) => ({

        updateDocument : build.query<Application[], number>({
            query : (applicationId: number)=> {
                return {
                    url:'documents',
                    params: {
                        applicationId: applicationId,
                    },
                }
            },
        }),

    }),
})

export const {
} = documentApi