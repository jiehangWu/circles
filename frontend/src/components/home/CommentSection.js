import React from 'react';
import Card from "@material-ui/core/Card";
import Comment from "./Comment";
import { PostActions } from '../../actions/posts.actions';
import { connect } from 'react-redux';

const mock = [
    {
        content: "lorem seuhfdiuewhfuh ehfiuwefo fwioeheiofhwohfwef wfwifowhf wfi wfoihweifo",
        date: new Date().toString(),
        username: "test1"
    },
    {
        content: "lorem seuhfdiuewhfuh ehfiuwefo fwioeheiofhwohfwef wfwifowhf wfi wfoihweifo",
        date: new Date().toString(),
        username: "test2"
    },
    {
        content: "lorem seuhfdiuewhfuh ehfiuwefo fwioeheiofhwohfwef wfwifowhf wfi wfoihweifo",
        date: new Date().toString(),
        username: "test2"
    },
    {
        content: "lorem seuhfdiuewhfuh ehfiuwefo fwioeheiofhwohfwef wfwifowhf wfi wfoihweifo",
        date: new Date().toString(),
        username: "test2"
    },
    {
        content: "lorem seuhfdiuewhfuh ehfiuwefo fwioeheiofhwohfwef wfwifowhf wfi wfoihweifo",
        date: new Date().toString(),
        username: "test2"
    },
    {
        content: "lorem seuhfdiuewhfuh ehfiuwefo fwioeheiofhwohfwef wfwifowhf wfi wfoihweifo",
        date: new Date().toString(),
        username: "test2"
    },
    {
        content: "lorem seuhfdiuewhfuh ehfiuwefo fwioeheiofhwohfwef wfwifowhf wfi wfoihweifo",
        date: new Date().toString(),
        username: "test2"
    },
];



class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.state = {
            content: "",
        };
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    clearAll = () => {
        this.setState({
            content: "",
        });
        this.textArea.current.value = "";
    };

    handleSubmit = () => { 
        if (this.state.content) {
            this.props.submitComment({
                date: new Date(),
                postId: this.props.postId,
                content: this.state.content,
            });
            this.clearAll();
        }

    };

    render() {
        return (
            <div className="container">
                <Card className="input-area my-3">
                    <div className="row">
                        <div className="col-lg-12">
                            <textarea className="text-box mx-2 mt-3"
                                rows="3"
                                placeholder="Say something about this post!"
                                required
                                onChange={(e) => { this.handleChange(e) }}
                                ref={this.textArea}>
                            </textarea>
                            <button type="button"
                                className={"btn btn-primary float-right mx-4 mb-3"
                                    + (this.state.content ? "" : " disabled")}
                                onClick={this.handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </Card>
                {this.props.comments.map((comment) => <Comment username={comment.user.username} date={comment.date} content={comment.content}/>)}
            </div>

        );
    }
}

const mapAction = {
    submitComment: PostActions.submitComment
}

export default connect(null, mapAction)(CommentSection);