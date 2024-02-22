import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {combineReducers} from "redux";
import {applicationApi} from "@/backend-api/application-api";
import {noteSlice} from "@/store/reducers/testReducer";
import {documentApi} from "@/backend-api/document-api";
import {rewardApi} from "@/backend-api/reward-api";

const rootReducer = combineReducers({
    [applicationApi.reducerPath]: applicationApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [rewardApi.reducerPath]: rewardApi.reducer,
    [noteSlice.reducerPath]: noteSlice.reducer,
})

export const store =
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(applicationApi.middleware)
                .concat(documentApi.middleware)
                .concat(rewardApi.middleware)
                ;
        }
    })
//     configureStore({
//     reducer: {
//         [applicationApi.reducerPath]: applicationApi.reducer,
//         noteReducer
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware()
//         .concat(applicationApi.middleware)
//
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()