const searchKeyword = (keyword) => (dispatch) => {
    fetch('http://localhost:5000/search/'+ keyword, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('error when searching for result');
    }).then((posts) => {
        dispatch({
            type: 'SEARCH_BY_KEYWORD',
            payload: posts,
        });
    }).catch((err) => {
        console.error(err);
    });
};

export const HomeActions = {
    searchKeyword,
};