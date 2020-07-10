import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import "./InputArea.css";
import ImageIcon from '@material-ui/icons/Image';
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { PostActions } from '../../actions/posts.actions';
import { connect } from 'react-redux';

class InputArea extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.state = {
            content: "",
        };
    }

    clearAll = () => {
        this.setState({
            content: "",
        });
        this.textArea.current.value = "";
    }

    handleSubmit = () => {
        if (this.state.content) {
            this.props.submitPost({
                userId: this.props.userId,
                content: this.state.content,
                date: new Date(),
                tags: []
            });
            this.clearAll();
        }
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    }

    render() {
        return (
            <div className="container">
                <Card className="input-area my-3">
                    <div className="row">
                        <div className="col-lg-2">
                            <Avatar aria-label="avatar" className="input-area-avatar mx-3 my-3">
                                R
                            </Avatar>
                        </div>
                        <div className="col-lg-10">
                            <textarea className="text-box mx-2 mt-3"
                                rows="3"
                                placeholder="What's up?"
                                required
                                onChange={(e) => { this.handleChange(e) }}
                                ref={this.textArea}>

                            </textarea>
                            <IconButton aria-label="upload image">
                                <ImageIcon />
                            </IconButton>
                            <IconButton aria-label="add emoji">
                                <EmojiEmotionsIcon />
                            </IconButton>
                            <button type="button"
                                className={"btn btn-primary float-right mx-4 mb-3"
                                    + (this.state.content ? "" : " disabled")}
                                onClick={this.handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userinfo.userId
    };
}

const mapAction = {
    submitPost: PostActions.submitPost,
    likePost: PostActions.likePost
}

export default connect(mapStateToProps, mapAction)(InputArea);