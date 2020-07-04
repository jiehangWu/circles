import React from 'react';
import ReactEmoji from 'react-emoji';

import './message.css';

let Message = React.createClass({
  getDefaultProps() {
    return {
      text: "foo bar :100: :)",
    };
  },
 
  mixins: [
    ReactEmoji
  ],
 
  render() {
    return (
      <div>
        <span>{ this.emojify(this.props.text) }</span>
        <span>{ ReactEmoji.emojify(this.props.text) }</span> // or can be used no mixin way
      </div>
    );
  }
});

export default Message;
