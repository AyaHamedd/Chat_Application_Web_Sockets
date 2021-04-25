import "bootstrap/dist/css/bootstrap.css";
import { React } from "react";
import "react-chat-widget/lib/styles.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import BroadCast from "./Broadcast";
import Private from "./Private";
import Room from "./Room";
import "./style.css";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ml-auto">
              <li className="nav-item nav-link active">
                <Link to="/private">Private</Link>
              </li>
              <li className="nav-item nav-link">
                <Link to="/room">Room</Link>
              </li>
              <li className="nav-item nav-link">
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
