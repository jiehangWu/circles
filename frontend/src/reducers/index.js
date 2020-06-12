import {combineReducers} from "redux";
import {login} from "./login.reducer";
import {register} from "./register.reducer";
import {message} from "./message.reducer";
import inputReducer from './InputReducer';
import tagsReducer from './TagsReducer';

export const rootReducer = combineReducers({
    message,
    login,
    register,
    input: inputReducer,
    tags: tagsReducer,
});
