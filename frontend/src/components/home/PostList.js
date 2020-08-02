import React from 'react';
import PostContainer from './PostContainer';
import { connect } from 'react-redux';
import { PostActions } from '../../actions/posts.actions';
import { location } from '../../helpers/util';

class PostList extends React.Component {

	componentDidMount() {
		this.props.loadAllPosts();
	}

	render() {
		return (
			<div>
				{this.props.posts.postList.map((post) =>
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
						location={location.HOME}/>
				)}
			</div>
		);
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