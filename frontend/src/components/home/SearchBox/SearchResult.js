import React from 'react';
import PostContainer from '../PostContainer';
import { connect } from 'react-redux';
import { PostActions } from '../../../actions/posts.actions';

class PostList extends React.Component {

	render() {

		return (
			<React.Fragment>
				{this.props.results.length !==0 ?
					this.props.results.map((post) =>
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
							isAtProfile={false} />
					 ): <div><center>No related results</center></div>}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapAction = {
	loadAllPosts: PostActions.loadAllPosts
};

export default connect(mapStateToProps, mapAction)(PostList);