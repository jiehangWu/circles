const initialState = { tags: ["Sports", "Cars", "Sportscars"] };

export const tags = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case "ADD_TAG":
            return {
                ...state,
                tags: state.tags.concat(action.tag)
            };

        case "DELETE_TAG":
            let updatedTags = { tags: [] };
            state.tags.forEach((tag) => {
                if (tag !== action.tag) {
                    updatedTags.tags.push(tag);
                }
            });
            console.log(updatedTags);
            return updatedTags;

        case "INIT_TAGS":
            state.tags = action.payload;
            return state;

        default:
            return state;
    }
};

