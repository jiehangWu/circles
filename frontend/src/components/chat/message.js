import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import ImageIcon from '@material-ui/icons/Image';
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { PostActions } from '../../actions/posts.actions';
import { connect } from 'react-redux';
import './message.css'

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
        this.setState({left : true});
      } else {
        this.setState({left : false});
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
      );
      }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userinfo.userId
    };
}

const mapAction = {

}

export default connect(mapStateToProps, mapAction)(Message);