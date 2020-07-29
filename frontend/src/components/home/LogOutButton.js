import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import {userActions} from "../../actions/user.actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

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
		<div style={{display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
		<div style={{flexDirection:'row', justifyContent: 'center'}}>
		<Fab variant = "extended" className={classes.log_out} size="small" onClick={props.logOut} style={{fontWeight: '500'
			,fontSize:'0.7rem'}}>
			<PowerSettingsNewIcon className={classes.extendedIcon} />
			log out
		</Fab>
		</div>
		</div>
	</React.Fragment>;
}



const mapState = (state) => {
	return { message: state.message };
};

const mapAction = {
	logOut: userActions.logOut,
};


export default connect(mapState, mapAction)(LogOutButton);


