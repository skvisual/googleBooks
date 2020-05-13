// import libraries and components

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// create "App" function
function App() {
  return (
    // use Router component
    <Router>
      <div>
        {/* use Nav component */}
        <Nav />
        {/* utilze Switch and Route components to declare paths */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/saved" component={Saved} />
          {/* catch all route */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

// export "App" for use elsewhere
export default App;
