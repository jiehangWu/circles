import {combineReducers} from "redux";
import {login} from "./login.reducer";
import {register} from "./register.reducer";
import {message} from "./message.reducer";
import {posts} from "./posts.reducer"
import {userinfo} from "./userinfo.reducer";
import {contacts} from "./chat.reducer";
import {socketReducer} from "./socket.reducer";
import {chatMessage} from "./chatMessage.reducer";

export const rootReducer = combineReducers({
    message,
    login,
    register,
    posts,
    userinfo,
    contacts,
    socketReducer,
    chatMessage
});
