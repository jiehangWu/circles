import React from 'react';
import { connect } from 'react-redux';
import { PostActions } from '../../actions/posts.actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import { history } from "../../helpers/history";
import { Badge } from '@material-ui/core';


class PostList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				{this.props.circlesList ?
					<List dense className="classes.root">
						{this.props.circlesList.map((value) => {
							const labelId = `checkbox-list-secondary-label-${value.user._id}`;
							return (
								<ListItem key={value} button>
									<ListItemAvatar>
										<Avatar
											alt={`Avatar n°${value + 1}`}
											src={`/static/images/avatar/${value + 1}.jpg`}
										/>
									</ListItemAvatar>
									<ListItemText id={labelId} primary={`${value.user.username}`} />
									<ListItemSecondaryAction>
										<Badge color = "secondary" badgeContent={0} showZero>
										<ChatIcon color = "primary" onClick={() => {
												if (history.location.pathname === '/home/profile') {
													console.log("if");
													history.push({
														pathname: '',
														state: {
															homeId: value.user._id,
															self: false
														}
													});
												} else {
													console.log("else");
													history.push({
														pathname: '/home/profile',
														state: {
															homeId: value.user._id,
															self: false
														}
													});
												}
												
											}}/>
										</Badge>
									</ListItemSecondaryAction>
								</ListItem>
							);
						})}
					</List>: ""}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state,
		circlesList: state.posts.circlesList
	};
};

const mapAction = {
	loadAllPosts: PostActions.loadAllPosts
};

export default connect(mapStateToProps, mapAction)(PostList);