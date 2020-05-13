import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Declares the Nac Class Component, which has state key values of open and width, and several methods
class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };
// This changes this.state.open to false if it is currently true, and this.width > 991
  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  // This changes the this.state.open to the opposite of what it is currently
  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  // Adds a listener when component is rendered that fires off the updateWidth() method when the window is resized 
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  // Removes that listener when componenet is not rendered to the screen
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  
  render() {
    return (
        // in navbar, we first link to the root route
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        <Link className="navbar-brand" to="/">
          Google Books
        </Link>
        {/* This button fires off toggleNav()  */}
        <button
          onClick={this.toggleNav}
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* If this.state.open is true, the class name is "", else it is "collapse" */}
        <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* Link component to go to the Search books page */}
              <Link
                // When the Link is clicked, run the toggleNav method
                onClick={this.toggleNav}
                // Dynamic class depending on if the current path is on the root or not, if so make this Link active
                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                to="/"
              >
                Search
              </Link>
            </li>
            <li className="nav-item">
              {/* Link component to go to the Saved books page */}
              <Link
                // When the Link is clicked, run the toggleNav method
                onClick={this.toggleNav}
                // Dynamic class depending on if the current path is on saved or not, if so make this Link active
                className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                to="/saved"
              >
                Saved
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

// export Nav for use elsewhere
export default Nav;
