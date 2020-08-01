import React from 'react';
import PostContainer from '../home/PostContainer';
import { connect } from 'react-redux';
import { ProfileActions } from '../../actions/profile.actions';
import { PostActions } from '../../actions/posts.actions';
import { location } from '../../helpers/util';

const styles = {
	textBox: {
		width: "5%",
		border: '0',
	},

	container: {
		width: "36%",
		height: "18%",
		border: '0',
		padding: '10px',
		backgroundColor: 'transparent'
	}
}

class PostList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadPosts(this.props.currID);
	}

	render() {
		return (
			<React.Fragment>
				{this.props.postList?
					this.props.postList.map((post) =>
						post.user?<PostContainer
							key={post._id} 
							postId={post._id}
							style={styles.textBox}
							username={post.user.username}
							userId={post.user._id}
							avatar={post.user.avatar}
							date={post.date}
							content={post.content}
							likes={post.likes}
							imgLink={post.imgLink}
							comments={post.comments}
							location={location.PROFILE} />:<div></div>
					) : ''}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.userinfo.profilePosts,
		postList: state.posts.postList
	};
};

const mapAction = {
	loadProfile: ProfileActions.loadProfile,
	loadPosts: PostActions.loadProfilePosts
};

export default connect(mapStateToProps, mapAction)(PostList);