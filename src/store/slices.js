import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "false",
  loggedIn: false,
  userData: null,
}

export const createProjectSlice = createSlice({
  name: 'createproject',
  initialState,
  reducers: {
    setShowCreateProject: (state) => {
      state.value = state.value==="false" ? "true" : "false"
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowCreateProject } = createProjectSlice.actions
export const CreateProjectReducer = createProjectSlice.reducer;

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setShowNotification: (state) => {
      state.value = state.value==="false" ? "true" : "false"
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowNotification } = NotificationSlice.actions
export const NotificationReducer = NotificationSlice.reducer;


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