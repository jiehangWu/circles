import React from "react";
import PostContainer from './PostContainer';
import InputArea from './InputArea';
import PreferenceBar from './PreferenceBar';
import LeftSideBar from "./LeftSideBar";
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 200;

const styles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		}
	},
	drawerPaper: {
		width: drawerWidth,
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
	avatar: {
        backgroundColor: blue[200] 
    }
}));

function Home() {
	const classes = styles();
	const theme = useTheme();

	return (
		<React.Fragment>
			<CssBaseline />
			<div className="d-flex justify-content-center">
				
					<div className={classes.root}>
						<Drawer
							className={classes.drawer}
							variant="permanent"
							classes={{
								paper: classes.drawerPaper,
							}}
							anchor="left"
						>
							<Avatar aria-label="profile-pic" className={classes.avatar}>
							W
                        </Avatar>
						</Drawer>
					</div>
				

					<main className={classes.content}>
						<InputArea />
						<PostContainer />
					</main>

				
					<div className={classes.root}>
						<Drawer
							className={classes.drawer}
							variant="permanent"
							classes={{
								paper: classes.drawerPaper,
							}}
							anchor="right"
						>
						</Drawer>
					</div>
				
			</div>
		</React.Fragment>
	);
}


export default Home;