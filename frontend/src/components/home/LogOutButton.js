import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import {userActions} from "../../actions/user.actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import {blue, blueGrey} from "@material-ui/core/colors";

const styles = makeStyles((theme) => ({
    log_out: {
        background: 'dimgrey',
        color:'white',
        fontSize: '0.8rem'
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
}));



function  LogOutButton(props) {
    const classes = styles();
    return <React.Fragment >
        <Fab variant = "contained" startIcon={<PowerSettingsNewIcon/> } className={classes.log_out} size="small" onClick={props.logOut} style={{fontWeight: '500'
        ,fontSize:'0.7rem'}}>
            <PowerSettingsNewIcon className={classes.extendedIcon} />
            log out
        </Fab>
    </React.Fragment>;

}

const mapState = (state) => {
    return { message: state.message };
};

const mapAction = {
    logOut: userActions.logOut,
};

export default connect(mapState, mapAction)(LogOutButton);


