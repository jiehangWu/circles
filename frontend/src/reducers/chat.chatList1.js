export const chatsListReducer = (init = [], action)=> {
    if (action.type === 'SOCKET_INIT_CONTACTS_LIST') {
        return action.payload;
    }
    if(action.type === "ADD_ONE_CONTACT_LIST") {
        let ret = init.slice();
        ret.push(action.payload);
        return ret;
    }
    return init;
};