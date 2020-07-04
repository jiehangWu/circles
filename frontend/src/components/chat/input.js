import React from 'react';

import './input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type message.."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === 'Enter' ? sendMessage(event) : null
      }
    />
    <button
      className="send-btn"
      onClick={(event) => sendMessage(event)}
    >Send</button>
  </form>
);

export default Input;
