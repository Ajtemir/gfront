import {BaseQueryFn, createApi, EndpointBuilder, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {backendUrl} from "@/env-variables";
import {Application} from "@/types/application";
import {Person} from "@/types/person";
import {GetPaginatedItemsResult} from "@/backend-api/application-api";
import {Member} from "@/types/member";
import {Exception} from "@/store/store";

export const memberApi = createApi({
    reducerPath: 'memberAPI',
    baseQuery: <BaseQueryFn<string | FetchArgs, unknown, Exception, {}>>(
        fetchBaseQuery({
            baseUrl: backendUrl,
        })
    ),
    endpoints: (build) => ({

        getPersonDataByPin : build.query<Person, string>({
            query: (pin) => ({
                url: '/Members/GetPersonDataByPin',
                params: {
                    pin: pin
                }
            })
        }),

        getMembers : build.query<GetPaginatedItemsResult<Member>, {pageNumber:number, pageSize:number}>({
            query: (pagination) => ({
                url: '/Members/GetMembers',
                params: {
                    ...pagination
                }
            })
        }),

        createPerson : build.mutation<Person, Person>({
            query: (person) => ({
                url: '/members/create',
                method: 'POST',
                body: person
            })
        }),

        getMemberById : build.query<Member, number>({
            query: (id) => ({
                url: `/Members/GetPersonById/${id}`,
            })
        }),

    })
})

export const {
    useLazyGetPersonDataByPinQuery,
    useGetPersonDataByPinQuery,
    useGetMembersQuery,
    useCreatePersonMutation,
    useGetMemberByIdQuery,
} = memberApi




