import React from 'react';

import Card from "@material-ui/core/Card";
import ImageIcon from '@material-ui/icons/Image';
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Avatar from "@material-ui/core/Avatar";
import {PostActions} from '../../actions/posts.actions';
import {connect} from 'react-redux';
import {blue} from '@material-ui/core/colors';

const styles = {
    textArea: {
        width: "100%",
        border: '0',
        marginLeft: "2.5%",
        marginTop: '0%',
    },
    textBox: {
        width: "110%",
        marginLeft: "10%",
    },
    container: {
        width: "100%",
        height: "100%",
        border: '0',
        backgroundColor: 'transparent',
    },
    avatar: {
        marginLeft: '50%',
        marginTop: '50%',
        marginRight: '0%',
        backgroundColor: blue[200]
    },
};

class InputArea extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.state = {
            content: "",
            selectedImage: null
        };
    }

    clearAll = () => {
        this.setState({
            content: "",
        });
        this.textArea.current.value = "";
    };

    handleSubmit = () => {
        if (this.state.content) {
            this.props.submitPost({
                userId: this.props.userId,
                content: this.state.content,
                date: new Date(),
                tags: [],
                imgLink: this.props.uploadedImgLink,
            });
            this.clearAll();
        }
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
        });
    };

    imageChangeHandler = (e) => {
        this.setState({
            selectedImage: e.target.files[0]
        });
        if (e.target.files[0].name) {
            const data = new FormData();
            const fileName = e.target.files[0].name;
            data.append(fileName, e.target.files[0], fileName);
            this.props.uploadImage(data);
        }
    };

    render() {
        return (
            <div className="container"
                 style={styles.container}>
                <Card className="input-area my-0">
                    <div className="row">
                        <div className="col-lg-10" style={styles.textArea}>
                            <textarea className="text-box mx-2 mt-3"
                                      style={styles.textBox}
                                      rows="3"
                                      placeholder="What's up?"
                                      value={this.props.input}
                                      required
                                      onChange={(e) => {
                                          this.handleChange(e)
                                      }}
                                      ref={this.textArea}>

                            </textarea>
                            <input className="hide" style={{display: 'none'}} type="file" ref={'file-upload'}
                                   onChange={this.imageChangeHandler}/>

                            <IconButton aria-label="upload image" onClick={e => {
                                this.refs['file-upload'].click()
                            }}>
                                <ImageIcon/>
                            </IconButton>
                            <button type="button"
                                    className={"btn btn-primary float-right mx-1 mb-3"
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
        userId: state.userinfo.userId,
        username: state.userinfo.username,
        uploadedImgLink: state.posts.uploadedImgLink,
    };
};

const mapAction = {
    submitPost: PostActions.submitPost,
    likePost: PostActions.likePost,
    uploadImage: PostActions.uploadImage,
};

export default connect(mapStateToProps, mapAction)(InputArea);
