export const contacts = (init = [], action)=> {
    if (action.type === 'SOCKET_INIT_CONTACTS') {
        console.log(action.payload);
        return action.payload;
    }
    if (action.type === 'SOCKET_ADD_CONTACT') {
        let addArray = init.slice();
        addArray.splice(addArray.length, 0, action.payload);
        console.log(addArray);
        return addArray;
    }
    return init;
};



