import React from "react";
import NavBar from "./NavBar";
import MetaData from "./MetaData";

class Header extends React.Component {
  render() {
    return (
      <header className="header_area">
        <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
          <NavBar />
          <MetaData />
        </div>
      </header>
    );
  }
}

export default Header;
