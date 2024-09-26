import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogReducer";

export const store = configureStore({
    reducer:
    {
        blog: blogReducer
    }
})