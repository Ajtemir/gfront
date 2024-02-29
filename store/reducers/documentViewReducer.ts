import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Document} from "@/types/document";

const initialState = null as Document | null
export const documentViewSlice = createSlice(
    {
        reducerPath : "documentView",
        initialState: initialState,
        name:"documentView",
        reducers:{
            setDocument: (state, action: PayloadAction<Document>) => {
                state = action.payload;
            },
        }
    }
)

export default documentViewSlice.reducer
export const {setDocument} = documentViewSlice.actions
