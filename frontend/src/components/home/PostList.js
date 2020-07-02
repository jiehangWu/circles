import React from "react";
import PostContainer from "./PostContainer"
import { connect } from 'react-redux';
import { PostActions } from "../../actions/posts.actions";

class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadAllPosts();
    }

    render() {
        return (
            <div>
                {this.props.posts.postList.map((post) =>
                    <PostContainer  postId={post._id} 
                                    username={post.user.username}
                                    userId={post.user._id} 
                                    date={post.date} 
                                    content={post.content} 
                                    likes={post.likes}
                                    imgLink={post.imgLink}
                                    comments={post.comments}/>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
    };
};

const mapAction = {
    loadAllPosts: PostActions.loadAllPosts
};

export default connect(mapStateToProps, mapAction)(PostList);