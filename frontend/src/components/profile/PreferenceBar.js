import React from 'react';
import DisplayTagArea from "./DisplayTagArea";
import { connect } from 'react-redux'
import InputTagArea from "./InputTagArea";
import { addTag } from "../../actions";
import Card from '@material-ui/core/Card';
import "./tagCard.css";

class PreferenceBar extends React.Component {

    constructor(props) {
        super(props);
    }

    handleAdd = () => {
        this.props.addTag(this.props.input);
    }

    render() {
        return <div className={"Container"}>
            <Card>
                <div className={"DisplayTags"}>
                    <div> <InputTagArea /></div>
                    <button type="button"
                        className={"btn btn-primary float-right mx-4 mb-3"
                            + (this.props.input ? "" : " disabled")}
                        onClick={this.handleAdd}>Add Tag
                    </button>

                </div>
            </Card>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return { input: state.tags.input };
};

export default connect(mapStateToProps, { addTag })(PreferenceBar);

