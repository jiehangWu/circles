// current chat person

export const currentChatPerson = (init = '', action) => {
  if (action.type === 'CHAT_SWITCH') {
    console.log(action.payload);
    return action.payload;
  }
  return init;
};
