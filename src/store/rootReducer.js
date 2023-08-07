import { combineReducers } from 'redux';
import { CreatePostReducer, LoginReducer, RegisterReducer, EditPopUpReducer, authReducer, CurrentUserReducer } from './slices';
// import { CurrentUserReducer } from './currentUserData';

const rootReducer = combineReducers({
  createPost: CreatePostReducer,
  logIn: LoginReducer,
  register: RegisterReducer,
  editPopup:EditPopUpReducer,
  currentUser: CurrentUserReducer,
  auth: authReducer,
});

export default rootReducer;