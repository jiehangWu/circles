import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {initChat} from '../../actions/chat.actions';
import InputArea from './InputArea';
import Message from "./message"

class MessageList extends React.Component {
     constructor(props) {
          super(props);
          // this.state = {messages: ["a"]}
     }

     componentDidMount= async () => {
     }

     initChat() {
          this.props.initChat([]);
     }

     render() {
          console.log("---------"+this.props);
          this.initChat();
          const listItems = () => {
               this.props.messages.map((msg) =>
               <li  className = 'mainList'>
 
                    <Message content = {msg}/>

               </li>);}

          return (
               <div id="contentside" className="panel">
				<center><h2>Message List</h2></center>
                    <div>

                         <span> {listItems} </span>
                    
                    </div>
                    <InputArea/>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return { messages: state.messages,}
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




