const tagsReducer = (arr = [
    {tag:"Sports", selected:false, color: "green"},
    {tag:"Animation", selected:false, color:"red"},
    {tag:"Music",selected: false, color: "yellow"},
    {tag: "Movie", selected: false, color: "blue"},
    {tag:"Game", selected: false, color: "purple"}], action) => {
    switch (action.type) {
        case "ADD_TAG":
            let addArray = arr.slice();
            let item = {};
            let randomColor = '#'+Math.floor(Math.random()*(2<<23)).toString(16);
            item.tag = action.tag;
            item.selected = false;
            item.color = randomColor;
            addArray.splice(addArray.length, 0, item);
            return addArray;
        case "DELETE_TAG":
            let delArray = arr.slice();
            delArray.splice(action.index, 1);
            return delArray;
        case "SELECT_TOGGLE_TAG":
            let selArray = arr.slice();
            let index = action.index;
            selArray[index].selected = !selArray[index].selected;
            return selArray;
        default:
            return arr;
    }
};

export default tagsReducer;