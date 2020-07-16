// init has 3 parts: 1 chats (key value) 2 order display order of chats 3 current chatter
// use key-value to store contact names: {online, chats}
// message = {sender, receiver, content, date}
export const chatsReducer1 = (init = {}, action) => {
  if (action.type === 'SOCKET_INIT_CONTACTS') {
    console.log('0');
    const ret_chats = {};
    action.payload.map((ele) => {
      ret_chats[ele] = [];
    });
    return ret_chats;
  }
  // send a message
  if (action.type === 'ADD_ONE_MESSAGE') {
    const message = action.payload;
    const { receiver } = message;
    const list = init[receiver].slice();
    list.push(action.payload);
    const ret = { ...init };
    ret[receiver] = list;
    console.log(`sender ${receiver}`);
    return ret;
  }
  // receive a message
  if (action.type === 'ADD_ONE_MESSAGE_CLIENT') {
    const message = action.payload;
    const { sender } = message;
    const list = init[sender].slice();
    list.push(action.payload);
    const ret = { ...init };
    ret[sender] = list;
    console.log(`sender ${sender}`);
    return ret;
  }

  if (action.type === 'ADD_ONE_CONTACT') {
    const ret = { ...init, [action.payload]: [] };
    return ret;
  }

  return init;
};
