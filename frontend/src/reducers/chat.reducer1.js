// init has 3 parts: 1 chats (key value) 2 order display order of chats 3 current chatter
// use key-value to store contact names: {online, chats}
// message = {sender, receiver, content, date}

export const chatsReducer1 = (init = {}, action) => {
  if (action.type === 'SOCKET_INIT_CONTACTS') {
    console.log('0');
    const retChats = Object.assign({}, init);
    Object.keys(action.payload).map((ele) => {
      if (retChats[ele] === undefined) {
        retChats[ele] = [];
      }
      return 0;
    });
    return retChats;
  }
  if (action.type === 'FILL_HISTORY_CHATS') {
    console.log(action.payload);
    let retChats = Object.assign({}, init);
    let arr = action.payload.chats;
    console.log(arr);
    const userId = action.payload.userId;
    if (arr) {
      arr.forEach((ele) => {
        console.log(ele);
        let chatterId;
        if (ele.chatter0._id === userId) {
          chatterId = ele.chatter1._id;
        } else {
          chatterId = ele.chatter0._id;
        }
        retChats[chatterId] = ele.messages;
        return 0;
      });
    }
    return retChats;
  }
  // send a message
  if (action.type === 'ADD_ONE_MESSAGE') {
    const message = action.payload;
    const { receiver } = message;
    const list = init[receiver.userId].slice();
    list.push(action.payload);
    const ret = { ...init };
    ret[receiver.userId] = list;
    console.log(`sender ${receiver}`);
    return ret;
  }
  // receive a message
  if (action.type === 'ADD_ONE_MESSAGE_CLIENT') {
    const message = action.payload;
    const { sender } = message;
    const list = init[sender.userId].slice();
    list.push(action.payload);
    const ret = { ...init };
    ret[sender.userId] = list;
    console.log(`sender ${sender}`);
    return ret;
  }

  if (action.type === 'ADD_ONE_CONTACT') {
    const ret = { ...init, [action.payload.userId]: [] };
    return ret;
  }

  return init;
};
