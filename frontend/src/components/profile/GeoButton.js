import React, {useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import RoomIcon from '@material-ui/icons/Room';
import MapContainer from './GeoMap';

export default function GeoButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
    }, [props.id, props.name])

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <RoomIcon/>
            </IconButton>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        height: "50ch",
                        width: "50ch",
                    },
                }}
            >
                <MapContainer id={props.id} name={props.name}/>

            </Menu>
        </div>
    );
}
