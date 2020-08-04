export const peerWait = (init = 1, action) => {
    if (action.type === 'PEER_WAIT') {
        console.log(init);
        if (init === 1) {
            return 0;
        } return 1;
    }
    return init;
};