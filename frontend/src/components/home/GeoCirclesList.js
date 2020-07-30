import React from 'react';
import { connect } from 'react-redux';
import {userActions} from '../../actions/user.actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import { history } from "../../helpers/history";
import { Badge } from '@material-ui/core';


class GeoCirclesList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadGeoCirclesList();
	}

	render() {
		return (
			<React.Fragment>
				{this.props.circlesList &&
					<List dense className="classes.root">
						{this.props.circlesList.map((user) => {
							const labelId = `checkbox-list-secondary-label-${user._id}`;
							return (
								<ListItem key={user._id} button onClick={() => {
									if (history.location.pathname === '/home/profile') {
										console.log("if");
										history.push({
											state: {
												homeId: user._id,
												self: false
											}
										});
									} else {
										console.log("else");
										history.push({
											pathname: '/home/profile',
											state: {
												homeId: user._id,
												self: false
											}
										});
									}
									
								}}>
									<ListItemAvatar>
										<Avatar
											alt={user.username}
											src={user.avatar}
										/>
									</ListItemAvatar>
									<ListItemText id={labelId} primary={`${user.username}`} />
								</ListItem>
							);
						})}
					</List>}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		circlesList: state.userinfo.geoCirlesList
	};
};

const mapAction = {
	loadGeoCirclesList: userActions.loadGeoCirclesList,
};

export default connect(mapStateToProps, mapAction)(GeoCirclesList);