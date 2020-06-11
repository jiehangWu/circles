// add input as a Redux state
export const inputTag = (input) => {
    return {
        type: 'INPUT_TAG',
        input: input
    }
}

// add one tag to display in Tag port
export const addTag = (s) => {
    return {
        type: 'ADD_TAG',
        tag: s
    };
};

// delete one Tag with index i from Tag port
export const deleteTag = (i) => {
    return {
        type: 'DELETE_TAG',
        index: i
    }
};

// Select one Tag with index i from Tag port
export const selectToggleTag = (i) => {
    return {
        type: 'SELECT_TOGGLE_TAG',
        index: i
    }
};

