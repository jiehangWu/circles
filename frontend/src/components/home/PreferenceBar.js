import React from 'react';
import DisplayTagArea from "./DisplayTagArea";
import Button from "./TagButton";
import InputTagArea from "./InputTagArea";
import {connect} from "react-redux";

class PreferenceBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={"DisplayPort"}>
            <div className={"DisplayTags"}>
                <DisplayTagArea/>
                <div>
                    <InputTagArea/>
                </div>
                <div>
                    <Button  name = "Add Tag" funcName = "addTag"/>
                </div>
            </div>
        </div>;
    }
}

export default PreferenceBar;

