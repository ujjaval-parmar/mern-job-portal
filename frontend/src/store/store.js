import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: ''
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        signup( state, action ){

            localStorage.clear();

            localStorage.setItem("user", JSON.stringify({ user: action.payload.user, token: action.payload.token }));

            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        login( state, action ){

            localStorage.clear();

            localStorage.setItem("user", JSON.stringify({ user: action.payload.user, token: action.payload.token }));


            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        logout( state, action ){

            localStorage.clear();

            state.user = null
            state.token = ''
        },


    }

});


export const { signup, login, logout } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export default store;