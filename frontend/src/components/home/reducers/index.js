import  {combineReducers} from "redux";
import inputReducer from './InputReducer';
import tagsReducer from './TagsReducer';

export  default  combineReducers( {
    input: inputReducer,
    tags: tagsReducer,
})