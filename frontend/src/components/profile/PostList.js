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
                    <PostContainer postId={post.postId}
                        userId={post.userId}
                        time={post.time.toString()}
                        content={post.content}
                        likes={post.likes}
                        isLiked={post.isLiked} />
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