export const userinfo = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_HOME':
      return {
        userId: action.payload.userId,
        username: action.payload.username,
      };
      case "LOAD_PROFILE":
        return {
            userId: action.payload.userId,
            username: action.payload.username,
            tags: action.payload.tags,
        };
    default:
      return state;
  }
};
