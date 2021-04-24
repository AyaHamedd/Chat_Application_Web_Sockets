import { React, useEffect } from "react";
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import socket from "./socketconfig";
 
const BroadCast = (props) => {
  const handleNewUserMessage = (newMessage) => {
    socket.emit('broadcastMessage',newMessage);
  };
  useEffect(() => {
    socket.on("broadcastMessage", (data) => {
      addResponseMessage(data);
    });
  },[]);
    return (<div><Widget handleNewUserMessage={handleNewUserMessage}/></div>)
}

export default BroadCast;