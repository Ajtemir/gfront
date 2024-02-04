import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type Note = {
    id: string;
    heading: string;
    content: string;
}

interface NoteState {
    notes: Array<Note>
}

const initialState: NoteState = {
    notes: [
        { id: '1', heading: 'Todo for the day', content: '' }
    ]
}

export const noteSlice = createSlice(
    {
        reducerPath : "note",
        initialState: initialState,
        name:"note",
        reducers:{
            addNote: (state, action: PayloadAction<Note>) => {
                const note = action.payload;
                state.notes.push(note)
            },
            removeNote: (state, action: PayloadAction<string>) => {
                const id = action.payload;
                const notes = state.notes.filter((note) => note.id !== id);
                state.notes = notes;
            }
        }
    }
)

export default noteSlice.reducer
export const {addNote, removeNote} = noteSlice.actions