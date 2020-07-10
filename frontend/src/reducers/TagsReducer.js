const tagsReducer = (arr = [
  { tag: 'Sports', selected: false, color: 'green' },
  { tag: 'Animation', selected: false, color: 'red' },
  { tag: 'Music', selected: false, color: 'yellow' },
  { tag: 'Movie', selected: false, color: 'blue' },
  { tag: 'Game', selected: false, color: 'purple' }], action) => {
  switch (action.type) {
    case 'ADD_TAG':
      const addArray = arr.slice();
      const item = {};
      const randomColor = `#${Math.floor(Math.random() * (2 << 23)).toString(16)}`;
      item.tag = action.tag;
      item.selected = true;
      item.color = randomColor;
      addArray.splice(addArray.length, 0, item);
      return addArray;
    case 'DELETE_TAG':
      const delArray = arr.slice();
      delArray.splice(action.index, 1);
      return delArray;
    case 'SELECT_TOGGLE_TAG':
      const selArray = arr.slice();
      const { index } = action;
      selArray[index].selected = !selArray[index].selected;
      return selArray;
    default:
      return arr;
  }
};

export default tagsReducer;
