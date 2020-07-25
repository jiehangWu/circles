import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { userActions } from "../../actions/user.actions";
import { connect } from "react-redux";
import Fab from '@material-ui/core/Fab';

const styles = {
	log_out: {
		background: 'grey',
		color: 'white',
		width: "66%",
		marginLeft: "25%"
	},
	extendedIcon: {
		padding: 10,
		color: 'white',
		fontSize: '0.80rem',
		fontWeight: ('bold', '900')
	},
	powerIcon: {
		padding: 0,
		color: 'secondary',
		fontSize: '1.36rem',
	},
};

class LogOutButton extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return <Fab variant="contained" startIcon={<PowerSettingsNewIcon />} size="small"
			style={styles.log_out}>
			<div onClick={() => this.props.logOut()}>
				<IconButton style={styles.extendedIcon}>
					<PowerSettingsNewIcon color="secondary" style={styles.powerIcon} />  &nbsp; LOG OUT
				</IconButton>

			</div>
		</Fab>
	}
}

const mapState = (state) => {
	return { message: state.message };
};

const mapAction = {
	logOut: userActions.logOut,
};

export default connect(mapState, mapAction)(LogOutButton);


