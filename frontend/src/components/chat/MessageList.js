import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { initChat } from '../../actions/chat.actions';
import InputArea from './InputArea';
import Message from './Message';

class MessageList extends React.Component {
     constructor(props) {
          super(props);
     }

     componentDidMount = async () => {
     }

     initAllChat() {
          // for testing
          this.props.initChat(["a", "b", "c"]);
     }

     render() {
          console.log("---------" + this.props.messages);
          this.initAllChat();

          return (
               <div id="contentside" className="panel">
                    <div>
                         {this.props.messages.map((msg) =>
                              // {messagesLi.map((msg) => 
                              <Message content={msg} />)}

                    </div>
                    <InputArea />
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return { messages: state.chatMessage.messages, }
}

const mapDispatchToProps = dispatch => {
     return bindActionCreators(
          {
               initChat
          },
          dispatch
     );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);




