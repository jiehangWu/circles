// currently not in use, reserve for reference
// deep object reducer for chat
// init has 3 parts: 1 chats (key value) 2 order display order of chats 3 current chatter
// use key-value to store contact names: {online, chats}
// message = {sender, receiver, content, date}
export const chatsReducer = (init = {}, action) => {
    if (action.type === 'SOCKET_INIT_CONTACTS') {
        console.log("0");
        let ret = {};
        console.log(action.payload);
        let ret_chats = {};
        action.payload.map((ele) => {
            ret_chats[ele] = {
                online: true,
                messages: []
            };
        });
        ret.chats = ret_chats;
        ret.order = action.payload;
        console.log(ret);
        return ret;
    }
    if (action.type === "CHAT_SWITCH") {
        let ret = JSON.parse(JSON.stringify(init));
        ret.current = action.payload;
        return ret;
    }
    if (action.type === 'SOCKET_ADD_CONTACT_') {
        console.log("1");
        if (Object.keys(init.chats).includes(action.payload)) {
            return init;
        } else {
            let ret = {};
            let ret_chats = {...init.chats};
            let ret_order = init.order.slice();
            ret_chats[action.payload] = {
                online: true,
                messages: []
            };
            ret_order.push(action.payload);
            ret.chats = ret_chats;
            ret.order = ret_order;
            return ret;
        }
    }
    if (action.type === "SOCKET_LOSE_CONTACT") {
        console.log("2");
        if (Object.keys(init.chats).includes(action.payload)) {
            let ret = {};
            let ret_chats = {...init.chats};
            let ret_order = init.order.slice();
            ret_chats[action.payload].online = false;
            ret.chats = ret_chats;
            ret.order = ret_order;
            return ret;
        }
        return init;
    }

    if (action.type === "SOCKET_RECEIVE_MESSAGE") {
        console.log("3");
        if (Object.keys(init.chats).includes(action.payload.sender)) {
            let ret = {};
            let ret_chats = {...init.chats};
            let ret_order = init.order.slice();
            ret_chats[action.payload.sender].messages.push(action.payload);
            let i = ret_order.indexOf(action.payload.sender);
            ret_order.splice(i, 1);
            ret_order.splice(0, 0, action.payload.sender);
            ret.chats = ret_chats;
            ret.order = ret_order;
            return ret;
        } else {
            let ret = {};
            let ret_order = init.order.slice();
            let ret_chats = {...init.chats};
            ret_chats[action.payload.sender] = {
                online: true,
                messages: [action.payload]
            };
            ret_order.splice(0, 0, action.payload.sender);
            ret.order = ret_order;
            return ret;
        }
    }

    return init;
};



