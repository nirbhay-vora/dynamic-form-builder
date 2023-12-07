import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    forms : [],
}

export const dynamicFormSlice = createSlice({
    name : "dynamicFormSlice",
    initialState,
    reducers : {
        addForm : (state,action) => {
            state.forms = [...state.forms, action.payload,];
        },
        deleteForm(state, action) {
            state.forms.splice(action.payload, 1);
        },
        editForm(state, action) {
            console.log(action.payload);
            const index = state.forms.findIndex(
                (form) => form?.slug === action.payload?.slug
                );
            if (index !== -1) {
                state.forms[index] = action.payload;
            }
        },
    }

})

export const {addForm,deleteForm,editForm} = dynamicFormSlice.actions;
export default dynamicFormSlice.reducer;