export const addTag = (id, tag) => (dispatch) => {
    fetch(`/home/tag`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, tag }),

    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('error when adding tags');
    }).then((tag) => {
        dispatch(addTagSuccess(tag.returnTag));
    }).catch((err) => {
        console.error(err);
    });
};

export const addTagSuccess = (tagContext) => ({
    type: 'ADD_TAG',
    tag: tagContext,
});

export const loadAllTags = (userId) => {
    return dispatch => {
        fetch(`/tags/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('error when fetching all tags');
            }
        }).then((tags) => {
            dispatch({
                type: "INIT_TAGS",
                payload: tags
            });
        }).catch((err) => {
            console.error(err);
        });
    };
};

export const deleteTag = (userId, tagContent) => {
    return dispatch => {
        fetch(`/tags/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ tagContent }),
        }).then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('error when deleting post ' + tagContent);
            }
        }).then(() => {
            dispatch({
                type: "DELETE_TAG",
                tag: tagContent
            });
        }).catch((err) => {
            console.error(err);
        });
    };
};

