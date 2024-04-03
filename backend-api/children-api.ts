import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {backendUrl} from "@/env-variables";
import {Child} from "@/types/child";
import {ChildListItem} from "@/types/childListItem";
import {ChildInfo} from "@/types/ChildInfo";

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
        }),

        getChildrenByMotherIdFromZagsThroughPin : build.query<void, number>({
            query: (motherId: number) => ({
                url: '/Children/GetChildrenByMotherIdFromZagsThroughPin',
                params: {
                    motherId: motherId
                }
            })
        }),

        GetChildById : build.query<ChildInfo, number>({
            query: (childId: number) => ({
                url: '/Children/GetChild',
                params: {
                    childId: childId
                }
            })
        }),

    })
})

export const {
    useGetChildrenByMotherIdQuery,
    useAddChildToMotherMutation,
    useLazyGetChildrenByMotherIdFromZagsThroughPinQuery,
    useGetChildByIdQuery
} = childrenApi