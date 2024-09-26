import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'blog',
    initialState:
    {
        sections: []
    },
    reducers:
    {
        addSection(state, action)
        {
            const {section} = action.payload;
            state.sections.push(section);
        }
    }
})

export const { addSection } = slice.actions;
export default slice.reducer;