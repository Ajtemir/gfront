import {backendUrl} from "@/env-variables";
import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Application} from "@/types/application";

export interface UpdateDocumentArgument {
    documentId: number
    file?: string
    fileName?: string
}

export const documentApi = createApi({
    reducerPath: 'documentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl
    }),

    endpoints:(build) => ({

        updateDocument : build.mutation<void, UpdateDocumentArgument>({
            query : (updateDocumentArgument)=> {
                return {
                    url:`documents/update`,
                    method: 'POST',
                    body: {
                        ...updateDocumentArgument
                    },
                }
            },
        }),

    }),
})

export const {
    useUpdateDocumentMutation
} = documentApi