import "bootstrap/dist/css/bootstrap.css";
import { React } from "react";
import 'react-chat-widget/lib/styles.css';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import BroadCast from "./Broadcast";
import Private from "./Private";
import Room from "./Room";
import "./style.css";
const BASE_URL = "http://localhost:3001";
const socket = io(BASE_URL);
 
export default function App() {
  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item nav-link active">
                <Link to="/private">Private</Link>
              </li>
              <li class="nav-item nav-link">
                <Link to="/room">Room</Link>
              </li>
              <li class="nav-item nav-link">
                <Link to="/broadcast">broadcast</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/private">
            <Private socket="socket" />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
          <Route path="/broadcast">
            <BroadCast />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
