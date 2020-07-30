// ret.push({
//     userId: key,
//     username: kv[key],
//     read: true,
// });
export const historyContactsReducer = (init = [], action) => {
  if (action.type === 'INIT_HISTORY_CONTACTS') {

    // console.log(action.payload);

    const arr = action.payload.chats;
    const userId = action.payload.userId;
    const ret = arr.map((ele) => {
      let chatterId;
      let unread;
      let chatterName;
      let avatar;
      if (ele.chatter0._id === userId) {
        chatterId = ele.chatter1._id;
        chatterName = ele.chatter1.username;
        unread = ele.c0Unread;
        avatar = ele.chatter1.avatar;
      } else {
        chatterId = ele.chatter0._id;
        chatterName = ele.chatter0.username;
        unread = ele.c1Unread;
        avatar = ele.chatter0.avatar;
      }
      let d = ele.messages[ele.messages.length - 1].date;
      const date = Date.parse(ele.messages[ele.messages.length - 1].date);
      return ({
        userId: chatterId,
        username: chatterName,
        unread,
        userAvatar: avatar,
        date,
        dateStr: d
      });
    });
    ret.sort((a, b) => (a.date < b.date ? 1 : -1));
    let orig = init.slice();
    let list = ret.map((ele) => {
      return ele.userId;
    })
    init.slice().forEach((ele) => {
      if (!list.includes(ele.userId)) {
        ret.push(ele);
      }
    });
    return ret;
  }
  if (action.type === 'HEAD_HISTORY_CONTACTS_RECEIVE') {
    const ret = init.slice();
    const chatPerson = action.payload;
    chatPerson.unread = 1;
    // console.log(ret.map((ele) => ele.userId));
    const index = ret.findIndex((ele) => ele.userId === chatPerson.userId);
    if (index !== -1) {
      let chatP = Object.assign({},ret[index]);
      ret.splice(index,1);
      ret.splice(0,0, chatP);
    } else {
      ret.splice(0,0, chatPerson);
    }
    return ret;
  }
  if (action.type === 'HEAD_HISTORY_CONTACTS_SEND') {
    const ret = init.slice();
    const chatPerson = action.payload;
    chatPerson.unread = 0;
    const index = ret.findIndex((ele) => ele.userId === chatPerson.userId);
    if (index !== -1) {
      let chatP = Object.assign({},ret[index]);
      chatP.unread = 0;
      ret.splice(index,1);
      ret.splice(0,0, chatP);
    } else {
      ret.splice(0,0, chatPerson);
    }
    return ret;
  }
  if (action.type === 'HISTORY_CONTACTS_SET_READ') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.unread = 0;
    }
    return ret;
  }
  if (action.type === 'HISTORY_CONTACTS_SET_UNREAD') {
    const ret = init.slice();
    const userId = action.payload;
    const chat = ret.find((ele) => ele.userId === userId);
    if (chat) {
      chat.unread = chat.unread + 1;
    }
    return ret;
  }
  if (action.type === 'HISTORY_CONTACTS_ADD_CONTACT') {
    const ret = init.slice();
    const {userId} = action.payload;
    const {username} = action.payload;
    const {userAvatar} = action.payload;
    const index = ret.findIndex((ele) => ele.userId === userId);
    let chatter = {
      userId,
      username,
      unread: 0,
      userAvatar
    };
    if (index !== -1) {
      let chatP = Object.assign({}, ret[index]);
      chatP.unread = 0;
      ret.splice(index, 1);
      ret.splice(0, 0, chatP);
    } else {
      ret.splice(0, 0, chatter);
    }
    return ret;
  }
  return init;
};
