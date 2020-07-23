// ret.push({
//     userId: key,
//     username: kv[key],
//     read: true,
// });
export const historyContactsReducer = (init = [], action) => {
  if (action.type === 'INIT_HISTORY_CONTACTS') {
    const arr = action.payload.chats;
    const userId = action.payload.userId;
    const ret = arr.map((ele) => {
      let chatterId;
      let read;
      let chatterName;
      if (ele.chatter0._id === userId) {
        chatterId = ele.chatter1._id;
        chatterName = ele.chatter1.username;
        read = ele.c0HasRead;
      } else {
        chatterId = ele.chatter0._id;
        chatterName = ele.chatter0.username;
        read = ele.c1HasRead;
      }
      const date = Date.parse(ele.messages[ele.messages.length - 1].date);
      return ({
        userId: chatterId,
        username: chatterName,
        read,
        date,
      });
    });
    ret.sort((a, b) => (a.date < b.date ? 1 : -1));
    console.log(ret);
    return ret;
  }
  if (action.type === 'HEAD_HISTORY_CONTACTS_RECEIVE') {
    const ret = init.slice();
    const chatPerson = action.payload;
    chatPerson.read = false;
    console.log(ret.map((ele) => ele.userId));
    const index = ret.findIndex((ele) => ele.userId === chatPerson.userId);
    if (index !== -1) {
      ret.splice(index,1);
    }
    ret.splice(0,0, chatPerson);
    return ret;
  }
  if (action.type === 'HEAD_HISTORY_CONTACTS_SEND') {
    const ret = init.slice();
    const chatPerson = action.payload;
    const index = ret.findIndex((ele) => ele.userId === chatPerson.userId);
    if (index !== -1) {
      ret.splice(index,1);
    }
    ret.splice(0,0, chatPerson);
    return ret;
  }
  if (action.type === 'HISTORY_CONTACTS_SET_READ') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.read = true;
    }
    return ret;
  }
  if (action.type === 'HISTORY_CONTACTS_SET_UNREAD') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.read = false;
    }
    return ret;
  }
  if (action.type === 'HISTORY_CONTACTS_ADD_CONTACT') {
    const ret = init.slice();
    const {userId} = action.payload;
    const {username} = action.payload;
    const index = ret.findIndex((ele) => ele.userId === userId);
    let chatter = {
      userId,
      username,
      read: true,
    };
    if (index !== -1) {
      ret.splice(index, 1);
    }
    ret.splice(0, 0, chatter);
    return ret;
  }
  return init;
};
