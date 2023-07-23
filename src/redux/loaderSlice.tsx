import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ILoaderState {
    isLoading: boolean,
    counter:number,

}
const initialState: ILoaderState = {
    isLoading: false,
    counter:0,

}

export const loaderSlice = createSlice({
    name: 'loaderReducer',
    initialState,
    reducers: {
        startLoader: (state: ILoaderState, action: PayloadAction<void>) => {
            if(state.counter==0){
                state.isLoading = true;
                state.counter++;
            }
            
        },
        stopLoader:(state: ILoaderState, action: PayloadAction<void>)=>{
            state.isLoading=false;
            state.counter=0;
        }

    }
});

export const {
    startLoader,
    stopLoader,
} = loaderSlice.actions;

export default loaderSlice.reducer;