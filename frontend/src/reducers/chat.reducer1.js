// init has 3 parts: 1 chats (key value) 2 order display order of chats 3 current chatter
// use key-value to store contact names: {online, chats}
// message = {sender, receiver, content, date}

export const chatsReducer1 = (init = {}, action) => {
    if (action.type === 'SOCKET_INIT_CONTACTS') {

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

        let retChats = Object.assign({}, init);
        let arr = action.payload.chats;
        const userId = action.payload.userId;
        if (arr) {
            arr.forEach((ele) => {

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
        const {receiver} = message;
        const ret = {...init};
        if (!Object.keys(ret).includes(receiver.userId)) {
            ret[receiver.userId] = [];
        }
        const list = init[receiver.userId].slice();
        list.push(action.payload);
        ret[receiver.userId] = list;
        return ret;
    }
    // receive a message
    if (action.type === 'ADD_ONE_MESSAGE_CLIENT') {
        const message = action.payload;
        const {sender} = message;
        const ret = {...init};
        if (!Object.keys(ret).includes(sender.userId)) {
            ret[sender.userId] = [];
        }
        const list = init[sender.userId].slice();
        list.push(action.payload);
        ret[sender.userId] = list;

        return ret;
    }
    if (action.type === 'ADD_ONE_CONTACT') {
        let ret = {...init};
        if (!Object.keys(init).includes(action.payload.userId)) {
            ret[action.payload.userId] = [];
        }
        return ret;
    }
    if (action.type === 'CHAT_CLEAR') {
        return {};
    }
    return init;
};
