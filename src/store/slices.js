import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "false",
  loggedIn: false,
  userData: null,
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

// editpage reducer
export const EditPopUpSlice = createSlice({
  name: 'editPopup',
  initialState,
  reducers: {
    setShowEditPopup: (state) => {
    state.value = state.value==="false" ? "true" : "false"
   },
  },
})

// Action creators are generated for each case reducer function
export const { setShowEditPopup } = EditPopUpSlice.actions
export const EditPopUpReducer = EditPopUpSlice.reducer

// user auth
// const loginState = {
//   loggedIn: false,
// };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer =  authSlice.reducer;

//user data
export const currentUserDataSlice = createSlice({
  name: 'currentUserData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = currentUserDataSlice.actions;
export const CurrentUserReducer = currentUserDataSlice.reducer;