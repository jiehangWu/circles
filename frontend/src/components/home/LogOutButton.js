import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import {userActions} from '../../actions/user.actions';
import {connect} from 'react-redux';

class  LogOutButton extends React.Component{
	constructor(props) {
		super(props);

	}

	render() {
		return <div onClick = {()=>this.props.logOut()}><IconButton ><PowerSettingsNewIcon color='secondary'/></IconButton></div>;
	}
}

const mapState = (state) => {
	return { message: state.message };
};

const mapAction = {
	logOut: userActions.logOut,
};

export default connect(mapState, mapAction)(LogOutButton);


