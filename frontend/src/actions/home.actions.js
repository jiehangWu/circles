import { history } from "../helpers/history";

const loadHome = () => {
    return dispatch => {
        fetch('http://localhost:5000/home', {
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
                type: "LOAD_HOME",
                payload: parsedMsg
            });
        }).catch((err) => {
            history.push("/login");
            console.log("going back");
        });
    };
};

export const HomeActions = {
    loadHome,
};