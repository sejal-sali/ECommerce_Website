import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="classy-navbar" id="essenceNav">
       <Link to="/">
       <a className="nav-brand">Smart Tech</a>
       </Link>
        
        <div className="classy-menu">
          <div className="classycloseIcon">
            <div className="cross-wrap">
              <span className="top"></span>
              <span className="bottom"></span>
            </div>
          </div>
          <div className="classynav">
            <ul>
              <li>
                {/* <Link to="/shop">
                  <a>Shop</a>
                </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
