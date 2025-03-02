import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: [] as any[], 
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },
        removeSingleRequest: (state, action) => {
            return state?.filter((request: any) => request._id !== action.payload);
        },
        removeRequests: (state) => {
            return [];
        }
    },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;