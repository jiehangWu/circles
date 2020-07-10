import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { blue } from '@material-ui/core/colors';
import { PostActions } from '../../actions/posts.actions';
import { connect } from 'react-redux';
import { displayDate } from '../../helpers/util';
import ClearIcon from '@material-ui/icons/Clear';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const styles = makeStyles((theme) => ({
    post: {
        margin: '1rem'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
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
    return (
        <div className={classes.postContainer}>
            <Card className={classes.post} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="profile-pic" className={classes.avatar} onClick={console.log("a")}>
                            {props.username}
                            <Link to="profile" className="btn btn-link"></Link>
                        </Avatar>
                    }
                    action={
                        props.currUserId === props.userId ?
                            <IconButton aria-label="settings">
                                <ClearIcon onClick={() => props.deletePost(props.postId)} />
                            </IconButton> : ""
                    }
                    title={props.username}
                    subheader={displayDate(props.date)}
                >
                </CardHeader>
                {props.imgLink
                    && <CardMedia
                        className={classes.media}
                        image={props.imgLink}
                    />}
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {props.content}
                    </Typography>
                </CardContent>
                <IconButton aria-label="chat">
                    <ChatBubbleOutlineOutlinedIcon color='primary' />
                </IconButton>
                <IconButton aria-label="like" onClick={() => props.likePost(props.postId)}>
                    <FavoriteIcon color='secondary' />
                </IconButton>
                <span>{props.likes}</span>
            </Card>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currUserId: state.userinfo.userId
    };
}

const mapAction = {
    likePost: PostActions.likePost,
    deletePost: PostActions.deletePost,
}

export default connect(mapStateToProps, mapAction)(PostContainer);