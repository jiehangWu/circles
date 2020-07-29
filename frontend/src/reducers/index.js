import { combineReducers } from 'redux';
import { login } from './login.reducer';
import { register } from './register.reducer';
import { message } from './message.reducer';
import { posts } from './posts.reducer';
import { userinfo } from './userinfo.reducer';
import { chatSocketReducer } from './chat.socket.reducer';
import { tags } from './tags.reducer';
import { currentChatPerson } from './chat.currentChatPerson1';
import { chatsListReducer } from './chat.onlineUsers';
import { chatsReducer1 } from './chat.reducer1';
import {historyContactsReducer} from "./chat.historyContacts";
import {chatEnter} from "./chat.enter";

export const rootReducer = combineReducers({
  currentChatPerson,
  message,
  login,
  register,
  posts,
  userinfo,
  tags,
  socketReducer: chatSocketReducer,
  chatsListReducer,
  chatsReducer1,
  historyContactsReducer,
  chatEnter
});
