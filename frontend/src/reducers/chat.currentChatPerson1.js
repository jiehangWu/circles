// current chat person
export const currentChatPerson = (init = {}, action) => {
  if (action.type === 'CHAT_SWITCH') {
    return action.payload;
  }
  // action from reducer
  if (action.type === 'CLEAR_CHAT_PERSON') {
    return {};
  }
  return init;
};
