
const init = [{
  comments: [],
  content: "jerome",
  date: "2020-07-12T04:45:11.380Z",
  imgLink: "",
  likes: 0,
  tags: [],
  user: { _id: "5f0a091a6f3f57468ccac0d1", username: "jerome" },
  __v: 0,
  _id: "5f0a9557d44c1d4cda62ca3f"
}];

export const userinfo = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_HOME':
      return {
        userId: action.payload.userId,
        username: action.payload.username,
      };
    case "LOAD_PROFILE":
      return {
        ...state,
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
