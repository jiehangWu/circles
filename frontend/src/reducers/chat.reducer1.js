// init has 3 parts: 1 chats (key value) 2 order display order of chats 3 current chatter
// use key-value to store contact names: {online, chats}
// message = {sender, receiver, content, date}
export const chatsReducer1 = (init = {}, action) => {
    if (action.type === 'SOCKET_INIT_CONTACTS') {
        console.log("0");
        let ret_chats = {};
        action.payload.map((ele) => {
            ret_chats[ele] = [];
        });
        return ret_chats;
    }
    // send a message
    if (action.type === "ADD_ONE_MESSAGE") {
        let message = action.payload;
        let receiver = message.receiver;
        let list = init[receiver].slice();
        list.push(action.payload);
        let ret = {...init};
        ret[receiver] = list;
        console.log("sender " + receiver);
        return ret;
    }
    // receive a message
    if (action.type === "ADD_ONE_MESSAGE_CLIENT") {
        let message = action.payload;
        let sender = message.sender;
        let list = init[sender].slice();
        list.push(action.payload);
        let ret = {...init};
        ret[sender] = list;
        console.log("sender " + sender);
        return ret;

    }

    if (action.type === "ADD_ONE_CONTACT") {
        let ret = {...init, [action.payload]: []};
        return ret;
    }

    return init;
};