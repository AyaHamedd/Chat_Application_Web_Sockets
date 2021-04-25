import { React, useEffect, useState } from "react";
import { addResponseMessage, Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import socket from "./socketconfig";

const Private = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserMessage = (message) => {
    socket.emit("sendPrivate", selectedUser, message);
  };

  const selectUser = (e) => {
    e.preventDefault();
    setSelectedUser(e.target.value);
  };

  useEffect(() => {
    socket.emit("getUsers");
    socket.on("getUsers", (users) => {
      setUsers(users);
    });
    socket.on("sendPrivate", (data) => {
      addResponseMessage(data);
    });
  }, []);
  return (
    <div>
      <form>
        <label>User :</label>
        <br />
        <select
          onChange={selectUser}
          className="form-control"
          id="exampleFormControlSelect1"
        >
          <option disabled selected hidden>Choose a User</option>
          {users.map((user, index) => {
            return <option key={user}>{user}</option>;
          })}
        </select>{" "}
      </form>
      <Widget handleNewUserMessage={handleUserMessage} />
    </div>
  );
};

export default Private;
