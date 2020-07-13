export const userinfo = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_HOME':
      return {
        userId: action.payload.userId,
        username: action.payload.username,
      };
    case "LOAD_PROFILE":
      console.log("posts in reducer", action.payload.posts)
      return {
        userId: action.payload.userId,
        username: action.payload.username,
        tags: action.payload.tags,
        posts: action.payload.posts
      };
    case "PASS_ID":
      return {
        ...state,
        prevId: action.payload,
      };
    default:
      return state;
  }
};
