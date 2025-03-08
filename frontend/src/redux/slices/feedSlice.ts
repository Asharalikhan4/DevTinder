import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: [] as any[],
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeSingleUserFromFeed: (state, action) => {
            return state?.filter((user: any) => user?._id !== action.payload);
        },
        removeFeed: (state, action) => {
            return [];
        }
    },
});

export default feedSlice.reducer;
export const { addFeed, removeSingleUserFromFeed, removeFeed } = feedSlice.actions;