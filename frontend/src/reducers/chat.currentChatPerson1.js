// current chat person
export const currentChatPerson = (init = {}, action) => {
  if (action.type === 'CHAT_SWITCH') {

    // console.log(action.payload);

    return action.payload;
  }
  // action from reducer
  if (action.type === 'CLEAR_CHAT_PERSON') {
    return {};
  }
  return init;
};
