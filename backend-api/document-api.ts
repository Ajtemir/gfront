import {backendUrl} from "@/env-variables";
import {createApi, EndpointBuilder, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Document} from "@/types/document";

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

        updateDocument : build.mutation<Document, UpdateDocumentArgument>({
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