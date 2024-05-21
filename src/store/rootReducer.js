import { combineReducers } from 'redux';
import { CreateProjectReducer, LoginReducer, RegisterReducer, EditPopUpReducer, authReducer, CurrentUserReducer, NotificationReducer } from './slices';
// import { CurrentUserReducer } from './currentUserData';

const rootReducer = combineReducers({
  createProject: CreateProjectReducer,
  notification: NotificationReducer,
  logIn: LoginReducer,
  register: RegisterReducer,
  editPopup:EditPopUpReducer,
  currentUser: CurrentUserReducer,
  auth: authReducer,
});

export default rootReducer;