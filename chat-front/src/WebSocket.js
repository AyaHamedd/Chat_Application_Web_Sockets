import { React, useEffect } from "react";
import { addResponseMessage, Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import io from "socket.io-client";
// import { React, useEffect, useState } from "react";
 

const BASE_URL = "http://localhost:3001";
const socket = io(BASE_URL);
 

const WebSocket = (props) => {
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    socket.emit('message',newMessage);
    
  };
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      addResponseMessage(data);
    });
  },[]);
    return (<div><Widget handleNewUserMessage={handleNewUserMessage}/></div>)
}

export default WebSocket;