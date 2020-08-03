import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CirclesList from './CirclesList';
import GeoCriclesList from './GeoCirclesList';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

const StyledTab = withStyles({
    root: {
        minHeight: "auto",
        minWidth: 'auto',
        padding: 0,
    }
})(Tab);

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "Bluegrey",
        width: "100%",
    },
    indicator: {
        display: 'none'
    }
}));

export default function TabList() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" style={{height: 'calc(5vh)', width: '',}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    classes={{
                        indicator: classes.indicator
                    }}
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    style={{height: 'calc(1vh)', width: '100%'}}
                    TabIndicatorProps={{style: {padding: '0', margin: '0', bottom: '0.01rem'}}}
                >
                    <StyledTab style={{height: 'calc(5vh)', width: '50%'}} label="Circles" {...a11yProps(0)} />
                    <StyledTab style={{height: 'calc(5vh)', width: '50%'}} label="Nearby" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <CirclesList/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <GeoCriclesList/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
