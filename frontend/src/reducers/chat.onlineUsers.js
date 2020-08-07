// contacts list

export const chatsListReducer = (init = [], action) => {
  // get all users online
  if (action.type === 'SOCKET_INIT_CONTACTS_LIST') {
    const ret = [];
    const kv = action.payload;
    Object.keys(kv).map((key) => {
      ret.push({
        userId: key,
        username: kv[key].username,
        userAvatar: kv[key].userAvatar,
        unread: 0
      });
      return 0;
    });


    return ret;
  }
  // move the contact to first place
  if (action.type === 'HEAD_CONTACT_LIST_RECEIVE') {
    const ret = init.slice();
    const chatPerson = action.payload;
    chatPerson.unread = 0;
    const index = ret.findIndex((ele) => ele.userId === chatPerson.userId);
    if (index !== -1) {
      let chatP = ret[index];
      ret.splice(index,1);
      ret.splice(0,0, chatP);
    } else {
      ret.splice(0,0, chatPerson);
    }
    return ret;
  }
  if (action.type === 'HEAD_CONTACT_LIST_SEND') {
    const ret = init.slice();
    const chatPerson = action.payload;
    chatPerson.unread = 0;
    const index = ret.findIndex((ele) => ele.userId === chatPerson.userId);
    if (index !== -1) {
      ret.splice(index,1);
    }
    ret.splice(0,0, chatPerson);
    return ret;
  }
  if (action.type === 'ADD_ONE_CONTACT_LIST') {
    const ret = init.slice();
    const chatPerson = action.payload;
    chatPerson.unread = 0;
    ret.push(chatPerson);
    return ret;
  }
  if (action.type === 'LOCAL_SET_READ') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.unread = 0;
    }
    return ret;
  }
  if (action.type === 'LOCAL_SET_UNREAD') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.unread = chat.unread + 1;
    }
    return ret;
  }
  if (action.type === 'CLEAR_ONLINE') {
    return [];
  }
  return init;
};
