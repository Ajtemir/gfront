import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Document} from "@/types/document";
import {RootState} from "@/store/store";

const initialState:{document:Document | null} = {document:null}
export const documentViewSlice = createSlice(
    {
        reducerPath : "documentView",
        initialState: initialState,
        name:"documentView",
        reducers: {
            setDocument: (state, action: PayloadAction<Document>) => {
                console.log('state worked')
               state.document = action.payload;
            },
        }
    }
)

export default documentViewSlice.reducer
export const {setDocument} = documentViewSlice.actions
export const selectDocumentView = (state: RootState) => state.documentView
