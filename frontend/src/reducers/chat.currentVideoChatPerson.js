// current chat person
export const currentVideoChatPerson = (init = {}, action) => {
    if (action.type === 'CHAT_APPLY') {

        // console.log(action.payload);

        return action.payload;
    }
    if (action.type === 'CLEAR_VIDEO_CHAT') {
        return {};
    }
    return init;
};
