import React from 'react'
import "./ChatWindow.css";
import Chat from "./Chat.jsx";

function ChatWindow() {
  return (
    <div className="chatWindow">
      <div className="navbar">
          <span className='brand-select'>
            SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>
          <div className="userIconDiv">
            <span><i className="fa-solid fa-user"></i></span>
          </div>
      </div>
      <Chat></Chat>

      <div className="chatInput">
        <div className="userInput">
          <input type="text" placeholder='Ask Anything'></input>
          <div id='submit'><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
          SigmaGPT can make mistake. Check important info. See Cookie Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;







