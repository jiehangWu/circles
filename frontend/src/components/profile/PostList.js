import React from 'react';
import PostContainer from '../home/PostContainer';
import { connect } from 'react-redux';
import { ProfileActions } from '../../actions/profile.actions';
import { PostActions } from '../../actions/posts.actions'; 

class PostList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadPosts(this.props.currID);
	}

	componentWillMount() {
		this.props.loadPosts(this.props.currID);
	}

	render() {
		return (
			<React.Fragment>
				{this.props.postList ?
					this.props.postList.map((post) =>
						<PostContainer postId={post._id}
							username={post.user.username}
							userId={post.user._id}
							date={post.date}
							content={post.content}
							likes={post.likes}
							imgLink={post.imgLink}
							comments={post.comments} />
					) : ''}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.userinfo.posts,
		postList: state.posts.postList
	};
};

const mapAction = {
	loadProfile: ProfileActions.loadProfile,
	loadPosts: PostActions.loadProfilePosts
};

export default connect(mapStateToProps, mapAction)(PostList);