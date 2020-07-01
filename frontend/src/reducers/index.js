import {combineReducers} from "redux";
import {login} from "./login.reducer";
import {register} from "./register.reducer";
import {message} from "./message.reducer";
import {posts} from "./posts.reducer"
import {userinfo} from "./userinfo.reducer";


export const rootReducer = combineReducers({
    message,
    login,
    register,
    posts,
    userinfo,
});
