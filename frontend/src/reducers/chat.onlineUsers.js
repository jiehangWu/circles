// contacts list

export const chatsListReducer = (init = [], action) => {
  // get all users online
  if (action.type === 'SOCKET_INIT_CONTACTS_LIST') {
    const ret = [];
    const kv = action.payload;
    Object.keys(kv).map((key) => {
      ret.push({
        userId: key,
        username: kv[key],
        read: true,
      });
      return 0;
    });
    console.log(ret);
    return ret;
  }
  // move the contact to first place
  if (action.type === 'HEAD_CONTACT_LIST') {
    const ret = init.slice();
    const user = action.payload;
    const index = ret.findIndex((ele) => { return ele.userId === user.userId; });
    const chatPerson = ret[index];
    ret.splice(index, 1);
    ret.splice(0, 0, chatPerson);
    console.log(ret);
    return ret;
  }
  if (action.type === 'ADD_ONE_CONTACT_LIST') {
    const ret = init.slice();
    const chatPerson = action.payload;
    chatPerson.read = true;
    ret.push(chatPerson);
    return ret;
  }
  if (action.type === 'LOCAL_SET_READ') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.read = true;
    }
    return ret;
  }
  if (action.type === 'LOCAL_SET_UNREAD') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.read = false;
    }
    return ret;
  }
  return init;
};
