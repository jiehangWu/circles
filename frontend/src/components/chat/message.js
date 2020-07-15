import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { connect } from 'react-redux';
<<<<<<< HEAD
// import './message.css'

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    this.state = {
      content: "",
      left: true
    };
  }

  initState = (bol) => {
    if (bol) {
      this.setState({ left: true });
    } else {
      this.setState({ left: false });
    }
  }

  render() {

    const msg = this.props.content;

    if (this.state.left) {
      return (
        <div className="messageLeft">
          <span>User1 </span>
          <Card className="input-area my-3">
            <div className="row">
              <div className="col-lg-2">
                <Avatar aria-label="avatar" className="input-area-avatar mx-3 my-3">
                  R
                            </Avatar>
              </div>

              <span>{msg} </span>


            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="messageRight">
          <span>User1 </span>
          <Card className="input-area my-3">
            <div className="row">
              <div className="col-lg-2">
                <Avatar aria-label="avatar" className="input-area-avatar mx-3 my-3">
                  R
                          </Avatar>
              </div>

              <span>Message </span>


            </div>
          </Card>
        </div>
=======
import './message.css'
import Contact from "./Contact";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.state = {
            content: "",
        };
    }

    render() {
        const msg = this.props.content;
        if (this.props.left) {
        return (
            <Grid container className="messageLeft, mt-1" direction="row" spacing={0} style={{float: "left"}}>
                <Grid item>
                <Contact name={this.props.name} displayName = {false}  online = {true}/>
                </Grid>
                <Grid item className="mt-1">
                <Paper className="mt-2" >
                    <p style={{maxWidth:"300px", padding: "5px", height: "auto",
                        wordWrap:"break-word",
                        wordBreak:"break-all",
                        overflow: "hidden"}}>
                        {msg}
                    </p>
                </Paper>
                </Grid>
            </Grid>
        );
      } else {
        return (
            <Grid container className="messageRight, mt-1" direction="row-reverse" spacing={0} style={{float:"right"}}>


                <Grid item>
                    <Contact name={this.props.name} displayName = {false}/>
                </Grid>
                <Grid item className="mt-1">
                    <Paper className="mt-2" style={{background:"#ADD8E6"}}>
                        <p style={{maxWidth:"300px", padding: "5px", height: "auto",
                            wordWrap:"break-word",
                            wordBreak:"break-all",
                            overflow: "hidden"}}>
                            {msg}
                        </p>
                    </Paper>
                </Grid>

            </Grid>

>>>>>>> origin/chat_temp
      );
    }
  }
}

const mapStateToProps = (state) => {
<<<<<<< HEAD
  return {
    userId: state.userinfo.userId
  };
=======
    return {
        userId: state.userinfo.userId,
    };
>>>>>>> origin/chat_temp
}

const mapAction = {

}

export default connect(mapStateToProps, mapAction)(Message);