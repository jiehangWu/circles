const loadProfile = (currId) => {
    return dispatch => {
        fetch('https://circles-ubc-api.azurewebsites.net/profile/' + currId, {
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
            dispatch({
                type: "LOAD_PROFILE",
                payload: parsedMsg
            });
        }).catch((err) => {
            console.error(err);
        });
    };
};

export const ProfileActions = {
    loadProfile
};