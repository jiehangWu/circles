export const chatEnter = (init = 1, action) => {
  if (action.type === 'CHAT_ENTER') {
    if (init === 1) {
      return 0;
    } return 1;
  }
  return init;
};
