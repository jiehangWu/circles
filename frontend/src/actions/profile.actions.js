import { history } from "../helpers/history";

export const loadProfile = () => {
    return dispatch => {
        fetch('http://localhost:5000/profile', {
            method: "GET",
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
            history.push("/profile");
            console.log("going back");
        });
    };
};

export const ProfileActions = {
    loadProfile,
};