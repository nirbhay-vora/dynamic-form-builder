import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formValue: [],
}

export const formValueSlice = createSlice({
    name: "formValueSlice",
    initialState,
    reducers: {
        addFormValue: (state, action) => {
            console.log("sdf",action.payload)
            state.formValue = [...state.formValue, action.payload]
        },
    }

})

export const { addFormValue } = formValueSlice.actions;
export default formValueSlice.reducer;