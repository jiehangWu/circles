import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
const styles = makeStyles((theme) => ({
    avatar2: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginTop: '0.5rem',
        marginDown: '0.5rem',
        marginLeft: '0rem',
        marginRight: '1rem',
    },
}));

const Contact = ({name})=>{
    const classes = styles();
    return <Grid item style = {{display: 'flex', alignItems:'center'}} className="pr-5 mr-5">
        <Avatar aria-label="profile-pic" className={classes.avatar2} alignItems="center" style = {{backgroundColor: '#e03d38'}}>
            {name.substring(0,1)}
        </Avatar>
        <div>
            {name}
        </div>
    </Grid>;
}

export default Contact;