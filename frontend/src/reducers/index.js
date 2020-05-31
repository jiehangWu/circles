import {combineReducers} from "redux";
import {login} from "./login.reducer";
import {register} from "./register.reducer";
import {message} from "./message.reducer";

export const rootReducer = combineReducers({
    message,
    login,
    register
});