import {configureStore, isRejected, MiddlewareAPI} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {Middleware, combineReducers} from "redux";
import {applicationApi} from "@/backend-api/application-api";
import {noteSlice} from "@/store/reducers/testReducer";
import {documentApi} from "@/backend-api/document-api";
import {rewardApi} from "@/backend-api/reward-api";
import {documentViewSlice} from "@/store/reducers/documentViewReducer";
import {childrenApi} from "@/backend-api/children-api";
import {memberApi} from "@/backend-api/member-api";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import {candidateApi} from "@/backend-api/candidate-api";
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejected(action)) {
            const error = action.payload as Exception
            console.log(error)
            if(error.status === 404){
                toast.error("This route not exist")
            }
            if(error.data.detail){
                toast.error(error.data.detail)
            }
            else if(error.data.errors){
                for (let errorsKey in error.data.errors) {
                    toast.error(error.data.errors[errorsKey])
                    console.error(error.data.errors[errorsKey])
                }
            }
            else {
                toast.error('500')
                console.error('500')
            }
        }

        return next(action);
    }

export interface Exception {
    data: {
        errors?: { [field: string]: string; },
        status: number,
        title: string,
        detail?: string
    }
    status:number
}

const rootReducer = combineReducers({
    [applicationApi.reducerPath]: applicationApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [rewardApi.reducerPath]: rewardApi.reducer,
    [childrenApi.reducerPath]: childrenApi.reducer,
    [documentViewSlice.reducerPath]: documentViewSlice.reducer,
    [noteSlice.reducerPath]: noteSlice.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [candidateApi.reducerPath]: candidateApi.reducer,
})

export const store =
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(applicationApi.middleware)
                .concat(documentApi.middleware)
                .concat(rewardApi.middleware)
                .concat(childrenApi.middleware)
                .concat(memberApi.middleware)
                .concat(candidateApi.middleware)
                .concat(rtkQueryErrorLogger)
                ;
        }
    })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()