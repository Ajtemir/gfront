import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {backendUrl} from "@/env-variables";
import {Child} from "@/types/child";
import {ChildListItem} from "@/types/childListItem";

export const childrenApi = createApi({
    reducerPath: 'childrenAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl
    }),
    endpoints: (build) => ({

        getChildrenByMotherId : build.query<ChildListItem[], number>({
            query: (motherId) => ({
                url: '/Children/GetChildrenByMotherId',
                params: {
                    motherId: motherId
                }
            })
        }),

        addChildToMother : build.mutation<number, Child>({
            query: (child: Child) => ({
                url: '/Children/Create',
                body:{
                    ...child
                },
                method: 'POST'
            })
        })

    })
})

export const {
    useGetChildrenByMotherIdQuery,
    useAddChildToMotherMutation,
} = childrenApi