import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { blue } from '@material-ui/core/colors';

const mockData = {
    userID: 'Jerome',
    time: '20 h',
    content: `Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit. 
    Curabitur at elementum ligula. 
    Morbi id mauris tempor elit congue bibendum vitae id ex. 
    Nulla facilisi. Vivamus vulputate non sem quis consectetur. 
    Integer et euismod elit. Proin fermentum suscipit ipsum, eget blandit lacus rutrum ac. 
    Morbi aliquet tincidunt dui in imperdiet. Integer ornare, tellus vitae feugiat maximus, 
    risus odio viverra erat, ut dapibus massa erat sit amet nisi. Sed a semper eros. 
    Mauris sit amet lorem tellus. Quisque sed neque eget erat hendrerit venenatis vitae in ipsum.`
};

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

const PostContainer = () => {
    const classes = styles();

    return (
        <div className={classes.postContainer}>
             <Card className={classes.post} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="profile-pic" className={classes.avatar}>
                            {mockData.userID}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={mockData.userID}
                    subheader={mockData.time}
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {mockData.content}
                    </Typography>
                </CardContent>
                <IconButton aria-label="chat">
                    <ChatBubbleIcon />
                </IconButton>
                <IconButton aria-label="like">
                    <FavoriteIcon />
                </IconButton>
            </Card>

            <Card className={classes.post}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="profile-pic" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={mockData.userID}
                    subheader={mockData.time}
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {mockData.content}
                    </Typography>
                </CardContent>
                <IconButton aria-label="chat">
                    <ChatBubbleIcon />
                </IconButton>
                <IconButton aria-label="like">
                    <FavoriteIcon />
                </IconButton>
            </Card>
        </div>
    );
};

export default PostContainer;