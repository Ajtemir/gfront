'use client'
import {useRouter, useSearchParams} from "next/navigation";
import {useAuthInfocomQuery} from "@/backend-api/children-api";
import {LinearProgress} from "@mui/material";
import React, {useEffect} from "react";
import {useAuth} from "@/hooks/use-auth";

const AuthInfocom = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code')!
    const state  = searchParams.get('state')!
    const auth = useAuth()
    const router = useRouter()
    console.log(code)
    console.log(state)
    const {data, isLoading, error} = useAuthInfocomQuery({code:code, state: state})
    if(data){
        console.log(data)
        auth.login('admin', 'password').then(() => {
            router.push('/')
        })
    }
    return <LinearProgress variant="indeterminate"/>
            // {isLoading && }
            // {data && <div> dsgs</div>}

};

export default AuthInfocom;