export const tags = (arr = [
    {tag:"Sports", selected:false, color: "green"},
    {tag:"Animation", selected:false, color:"red"},
    {tag:"Music",selected: false, color: "yellow"},
    {tag: "Movie", selected: false, color: "blue"},
    {tag:"Game", selected: false, color: "purple"}], action) => {
    switch (action.type) {
        case "ADD_TAG":
            let addArray = arr.slice();
            let item = {};
            item.tag = action.tag;
            item.selected = false;
            addArray.splice(addArray.length, 0, item);
            return addArray;
        case "DELETE_TAG":
            let delArray = arr.slice();
            delArray.splice(action.index, 1);
            return delArray;
        default:
            return arr;
    }
};

