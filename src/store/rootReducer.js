import { combineReducers } from 'redux';
import { CreatePostReducer, LoginReducer, RegisterReducer, EditPopUpReducer, authReducer, CurrentUserReducer, NotificationReducer } from './slices';
// import { CurrentUserReducer } from './currentUserData';

const rootReducer = combineReducers({
  createPost: CreatePostReducer,
  notification: NotificationReducer,
  logIn: LoginReducer,
  register: RegisterReducer,
  editPopup:EditPopUpReducer,
  currentUser: CurrentUserReducer,
  auth: authReducer,
});

export default rootReducer;