import React from 'react'
import "./Chat.css";
import { useContext } from 'react';
import { MyContext } from './MyContext';

function Chat() {
  const {newChat} = useContext(MyContext);
  return (
    <>
      {newChat && <h1> Start a new Chat!</h1>}
      <div className="chats">

      </div>
    
    </>
  )
}

export default Chat;