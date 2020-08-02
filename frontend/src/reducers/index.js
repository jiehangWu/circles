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
import {currentVideoChatPerson} from "./chat.currentVideoChatPerson";
import {chatVideoStatus} from "./chat.videoStatus";
import {chatVideoCaller} from "./chat.videoCaller";
import {screenWidth} from "./screenWidth";
import {screenHeight} from "./screenHeight";

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
  chatEnter,
  currentVideoChatPerson,
  chatVideoStatus,
  chatVideoCaller,
  screenWidth,
  screenHeight
});
