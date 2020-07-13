import React from 'react';
import PostContainer from '../home/PostContainer';
import { connect } from 'react-redux';
import { ProfileActions } from '../../actions/profile.actions';

class PostList extends React.Component {
	constructor(props) {
		super(props);
		// this.props.loadProfile(this.props.currID);        
		// console.log("props in Postlist profile__", this.props);
		// console.log("state in Postlist profile__", this.state);
	}

	// componentDidMount() {
	// 	this.props.loadProfile(this.props.currID);
	// }

	// componentWillMount = async () =>  {
	// 	await this.props.loadProfile(this.props.currID);
	// }

	render() {
		console.log("_______Posts in ./profile/PostList__________", this.props.posts);
		return (
			<div>
				{/* {this.props.posts.map((post) =>
					<PostContainer postId={post._id}
						username={post.user.username}
						userId={post.user._id}
						date={post.date}
						content={post.content}
						likes={post.likes}
						imgLink={post.imgLink}
						comments={post.comments} />
				)} */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.userinfo.posts,
	};
};

const mapAction = {
	loadProfile: ProfileActions.loadProfile
};

export default connect(mapStateToProps, mapAction)(PostList);