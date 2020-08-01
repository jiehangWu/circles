import React, { useState, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SearchResult from './SearchResult';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
     position: 'relative',
     borderRadius: theme.shape.borderRadius,
     backgroundColor: fade(theme.palette.common.white, 0.15),
     '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
     },
     marginRight: 0,
     width: '10%',
     [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(125),
         width: 'auto',
     },
 },
 searchIcon: {
     padding: theme.spacing(0, 2),
     height: '100%',
     position: 'relative',
     // pointerEvents: 'none',
     display: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     float: 'right'
 },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(1),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     // position: 'absolute',
//     // pointerEvents: 'none',
//     // display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '60%',
  },
}));

const SearchBox = (props) => {
  const classes = useStyles();
  const inputBase = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [content, setConent] = React.useState("");

  const clearAll = () => {
    setConent("");
    inputBase.current.value = "";
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleSearch = () => {
    if (content) {
      // this.props.search(content);
      clearAll();
    }
  }

  const handleChange = (e) => {
    setConent(
      e.target.value,
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <IconButton className={classes.searchIcon} onClick={() => { clearAll(); handleOpen(); handleSearch() }}>
          <SearchIcon />
        </IconButton>

        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => { handleChange(e) }}
          ref={inputBase}
        />

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 1000,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Search Result:</h2>
              <p id="transition-modal-description">Related posts:</p>
              <SearchResult/>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapAction = {
}

export default connect(mapStateToProps, mapAction)(SearchBox);