import { React, useEffect, useState } from "react";
import { addResponseMessage, Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import socket from "./socketconfig";

const Room = (props) => {
  const [room, setRoom] = useState("");
  const [joinedRoom,setJoinedRoom] = useState("");
  
  const handleRoomMessage = (message) => {
    socket.emit("roomMessage", joinedRoom,message);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("joinRoom",room);
    setJoinedRoom(room);
    setRoom("");
  };

  useEffect(() => {
    socket.on("roomMessage", (data) => {
      addResponseMessage(data);
    });
  }, []);
  return (
    <div>
      <form>
        <label>
          Room Name :
          <br />
          <input type="text" name="name" onChange={(e) => setRoom(e.target.value)}  value={room} required/>
        </label>
        <br />
        <input className="btn btn-success" type="submit" value="Submit" onClick={handleJoinRoom}/>
      </form>
      <Widget handleNewUserMessage={handleRoomMessage} />
    </div>
  );
};

export default Room;
