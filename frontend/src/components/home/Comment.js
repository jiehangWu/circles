import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { displayDate } from '../../helpers/util';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles((theme) => ({
	post: {
		marginTop: '0.5rem',
		marginBottom: '0.5rem'
	},
	avatar: {
		backgroundColor: blue[200]
	},
	CommentContainer: {
		width: '100%',
		marginLeft: '20%',
		marginRight: '20%'
	},
}));

const Comment = (props) => {
	const classes = styles();
	return (
	// <div className={classes.CommentContainer}>
		<div>
			<Card className={classes.post} >
				<CardHeader
					avatar={
						<Avatar aria-label="profile-pic" className={classes.avatar} src={props.avatar}>
							{props.username}
						</Avatar>
					}
					title={props.username}
					subheader={displayDate(props.date)}
				>
				</CardHeader>
				<CardContent>
					<Typography variant="body2" color="textPrimary" component="p">
						{props.content}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default Comment;
