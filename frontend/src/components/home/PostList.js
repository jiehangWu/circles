import React from "react";
import PostContainer from "./PostContainer"
import { connect } from 'react-redux';

class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.posts.postList.map((post) =>
                    <PostContainer userID={post.userID} time={post.time.toString()} content={post.content} likes={post.likes}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
    }
};

export default connect(mapStateToProps)(PostList);