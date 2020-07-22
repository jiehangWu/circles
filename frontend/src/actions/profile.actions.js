import { history } from "../helpers/history";


const loadProfile = () => {
     return dispatch => {
          fetch('https://circles-ubc-api.azurewebsites.net/profile', {
               method: "POST",
               headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
               },
               credentials: 'include',
          }).then((response) => {
               if (response.ok) {
                    return response.text();
               }
               throw new Error("error in response");
          }).then((msg) => {
               let parsedMsg = JSON.parse(msg);
               console.log(parsedMsg);
               dispatch({
                    type: "LOAD_PROFILE",
                    payload: parsedMsg
               });
          }).catch((err) => {
               history.push("/home");
               console.log("going back");
          });
     };
};

export const ProfileActions = {
     loadProfile,
};
