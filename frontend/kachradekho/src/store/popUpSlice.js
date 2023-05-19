import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "false",
}

export const createPostSlice = createSlice({
  name: 'createpost',
  initialState,
  reducers: {
    setShowCreatePost: (state) => {
      state.value = state.value==="false" ? "true" : "false"
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowCreatePost } = createPostSlice.actions
export const CreatePostReducer = createPostSlice.reducer;


// login reducer
export const LoginSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
   setShowLogin: (state) => {
    state.value = state.value==="false" ? "true" : "false"
   },
  },
})

// Action creators are generated for each case reducer function
export const { setShowLogin } = LoginSlice.actions
export const LoginReducer = LoginSlice.reducer

// signUp reducer
export const RegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
   setShowRegister: (state) => {
    state.value = state.value==="false" ? "true" : "false"
   },
  },
})

// Action creators are generated for each case reducer function
export const { setShowRegister } = RegisterSlice.actions
export const RegisterReducer = RegisterSlice.reducer
