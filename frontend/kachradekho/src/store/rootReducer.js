import { combineReducers } from 'redux';
import { CreatePostReducer, LoginReducer, RegisterReducer } from './popUpSlice';

const rootReducer = combineReducers({
  createPost: CreatePostReducer,
  logIn: LoginReducer,
  register: RegisterReducer,
});

export default rootReducer;