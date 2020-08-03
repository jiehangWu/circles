import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import {userActions} from "../../actions/user.actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
    log_out: {},

}));


function LogOutButton(props) {
    const classes = styles();
    return <React.Fragment>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <PowerSettingsNewIcon className={classes.log_out} onClick={props.logOut}/>
        </div>

    </React.Fragment>;
}


const mapState = (state) => {
    return {message: state.message};
};

const mapAction = {
    logOut: userActions.logOut,
};


export default connect(mapState, mapAction)(LogOutButton);


