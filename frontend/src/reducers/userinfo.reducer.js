
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
        registerName: action.payload.registerName,
        avatar: action.payload.avatar,
        firstTimer: action.payload.firstTimer,
      };
    case 'UPLOAD_AVATAR':
      return {
        ...state,
        avatar: action.payload
      };
    case "LOAD_PROFILE":
      return {
        ...state,
        profileUserId: action.payload.userId,
        profileUsername: action.payload.username,
        profileAvatar: action.payload.avatar,
        tags: action.payload.tags,
        profilePosts: action.payload.posts
      };
    case "UPDATE_GEOLOCATION":
      return {
        ...state,
        geolocation: action.payload
      };
    case "LOAD_GEOCIRCLES_LIST":
      return {
        ...state,
        geoCirlesList: action.payload
      };
    case "LOAD_GEOLOCATION":
      return {
        ...state,
        geolocation: action.payload.geolocation,
        geoUser: 'action.payload.username'
      };
    case "CANCEL_FIRST_TIMER":
      return {
        ...state,
        firstTimer: action.payload,
      };
    default:
      return state;
  }
};
