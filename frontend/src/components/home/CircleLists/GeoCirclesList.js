import React from 'react';
import {connect} from 'react-redux';
import {userActions} from '../../../actions/user.actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {history} from "../../../helpers/history";
import Grid from '@material-ui/core/Grid';

class GeoCirclesList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadGeoCirclesList();
    }

    render() {
        return (
            <React.Fragment>
                {this.props.geoList &&
                <List dense className="classes.root">
                    {this.props.geoList.map((user) => {
                        let splited = user.username.split('_', 3);
                        user.username = splited[0].concat("_" + splited[1]);
                        const labelId = `checkbox-list-secondary-label-${user._id}`;
                        return (
                            <ListItem key={user._id} button onClick={() => {
                                if (history.location.pathname === '/home/profile') {
                                    console.log("if");
                                    history.push({
                                        state: {
                                            homeId: user._id,
                                            self: false,
                                            name: user.username
                                        }
                                    });
                                } else {
                                    console.log("else");
                                    history.push({
                                        pathname: '/home/profile',
                                        state: {
                                            homeId: user._id,
                                            self: false,
                                            name: user.username
                                        }
                                    });
                                }
                            }}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={user.username}
                                        src={user.avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`${user.username}`}/>

                                <Grid item style={{alignSelf: 'flex-end'}}>
                                    <Grid container direction='row-reverse'>
                                        <div style={{color: '#00008B', fontSize: 0.001}} className="mr-2">
                                            {user.geoDistance !== null ? `${user.geoDistance}km` : ''}
                                        </div>
                                    </Grid>
                                </Grid>

                            </ListItem>
                        );
                    })}
                </List>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        geoList: state.userinfo.geoCirlesList
    };
};

const mapAction = {
    loadGeoCirclesList: userActions.loadGeoCirclesList,
};

export default connect(mapStateToProps, mapAction)(GeoCirclesList);