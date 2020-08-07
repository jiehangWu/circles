import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {blue} from '@material-ui/core/colors';
import {PostActions} from '../../actions/posts.actions';
import {connect} from 'react-redux';
import {displayDate} from '../../helpers/util';
import ClearIcon from '@material-ui/icons/Clear';
import Modal from '@material-ui/core/Modal';
import CommentSection from './CommentSection';
import {history} from '../../helpers/history';
import {location} from '../../helpers/util';


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
        width: '100%',
        marginLeft: '0%',
        marginRight: '20%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto'
    },
    paper: {
        position: 'absolute',
        width: '70%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        top: '10%',
        left: '15%'
    }
}));

const PostContainer = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const classes = styles();

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    );

    return (
        <div className={classes.postContainer}>
            <Card className={classes.post}>
                <CardHeader
                    avatar={
                        props.location === location.PROFILE ?
                            <Avatar aria-label="profile-pic" className={classes.avatar} src={props.avatar}>
                                {props.username}
                            </Avatar>
                            : <IconButton onClick={() => {
                                history.replace({
                                    pathname: '/home/profile',
                                    state: {
                                        homeId: props.userId,
                                        self: props.currUserId === props.userId
                                    }
                                });
                            }}>
                                <Avatar aria-label="profile-pic" alt={props.username} className={classes.avatar}
                                        src={props.avatar}/>
                            </IconButton>
                    }
                    action={
                        props.currUserId === props.userId ?
                            <IconButton aria-label="settings"
                                        onClick={() => props.deletePost(props.currUserId, props.postId, props.location)}>
                                <ClearIcon/>
                            </IconButton> : ''
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
                <IconButton aria-label="chat" onClick={openModal}>
                    <ChatBubbleOutlineOutlinedIcon color='primary'/>
                </IconButton>
                <Modal
                    open={modalIsOpen}
                    onClose={closeModal}
                    className={classes.modal}
                >
                    <div className={classes.paper}>
                        <CommentSection currUserId={props.currUserId} postId={props.postId} comments={props.comments} location={props.location}/>
                    </div>
                </Modal>
                <IconButton aria-label="like" onClick={() => props.likePost(props.currUserId, props.postId, props.location)}>
                    <FavoriteIcon color='secondary'/>
                </IconButton>
                <span>{props.likes}</span>
            </Card>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currUserId: state.userinfo.userId
    };
};

const mapAction = {
    likePost: PostActions.likePost,
    deletePost: PostActions.deletePost,
};

export default connect(mapStateToProps, mapAction)(PostContainer);