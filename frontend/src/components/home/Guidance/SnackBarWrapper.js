import React from 'react';
import { SnackbarProvider } from 'notistack';
import { isMobile } from 'react-device-detect';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const MAX_SNACKBAR = 3;

const AUTO_HIDE_DURATION = 6000;

const POSITION = {
    vertical: 'bottom',
    horizontal: 'right'
};

export default function NotistackWrapper({children}) {
    const ref = React.createRef();
    const onClickDismiss = key => () => {
        ref.current.closeSnackbar(key);
    };

    return (
        <SnackbarProvider
            maxSnack={MAX_SNACKBAR}
            autoHideDuration={AUTO_HIDE_DURATION}
            anchorOrigin={POSITION}
            dense={isMobile}
            ref={ref}
            action={(key) => (
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClickDismiss(key)}>
                    <CloseIcon style={{fontSize:"20px"}}/>
                </IconButton>
            )}
        >
            {children}
        </SnackbarProvider>
    );
}