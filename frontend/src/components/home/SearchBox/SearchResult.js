import React from 'react';
import PostContainer from '../PostContainer';
import {connect} from 'react-redux';
import {location} from '../../../helpers/util';

class PostList extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.results.length !== 0 ?
                    this.props.searchResult.map((post) =>
                        <PostContainer
                            key={post._id}
                            postId={post._id}
                            username={post.user.username}
                            userId={post.user._id}
                            avatar={post.user.avatar}
                            date={post.date}
                            content={post.content}
                            likes={post.likes}
                            imgLink={post.imgLink}
                            comments={post.comments}
                            location={location.SEARCH}/>
                    ) : <div>
                        <center>No related results</center>
                    </div>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchResult: state.posts.searchResult
    };
};

export default connect(mapStateToProps)(PostList);