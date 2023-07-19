import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ILoaderState {
    isLoading: boolean,

}
const initialState: ILoaderState = {
    isLoading: false,

}

export const loaderSlice = createSlice({
    name: 'loaderReducer',
    initialState,
    reducers: {
        on: (state: ILoaderState, action: PayloadAction<void>) => {
            state.isLoading = true;
        },
        off:(state: ILoaderState, action: PayloadAction<void>)=>{
            state.isLoading=false;
        }

    }
});

export const {
on,
off,
} = loaderSlice.actions;

export default loaderSlice.reducer;