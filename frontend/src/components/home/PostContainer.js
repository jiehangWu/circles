import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { blue } from '@material-ui/core/colors';
import { likePost } from '../../actions/posts.actions';
import { connect } from 'react-redux';

const styles = makeStyles((theme) => ({
    post: {
        margin: '1rem'
    },
    media: {
        color: 'white',
        fontSize: '0.8rem'
    },
    avatar: {
        backgroundColor: blue[200]
    },
    postContainer: {
        width: "60%",
        marginLeft: "20%",
        marginRight: "20%"
    }
}));

const PostContainer = (props) => {
    const classes = styles();
    const postID = props.postID;
    return (
        <div className={classes.postContainer}>
            <Card className={classes.post} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="profile-pic" className={classes.avatar}>
                            {props.userID}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.userID}
                    subheader={props.time}
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {props.content}
                    </Typography>
                </CardContent>
                <IconButton aria-label="chat">
                    <ChatBubbleOutlineOutlinedIcon  color='primary' />
                </IconButton>
                <IconButton aria-label="like" onClick={() => props.likePost(postID)}>
                    <FavoriteIcon color='secondary' />
                </IconButton>
                <span>{props.likes}</span>
            </Card>
        </div>
    );
}

const matchDispatchToProps = dispatch => {
    return {
        likePost: (postID) => dispatch(likePost(postID)),
    };
}

export default connect(null, matchDispatchToProps)(PostContainer);