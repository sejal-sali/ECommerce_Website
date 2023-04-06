import React from "react";
import { Person, Key, Bag, Arrow90degLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class AccountSidebar extends React.Component {
  render() {
    return (
      <div className="shop_sidebar_area ml-3 mr-3 mt-3">
        <div className="widget catagory mb-50">
          <h6 className="widget-title mb-30 text-capitalize">
            {`Welcome, ${localStorage.name.split(" ")[0]}!`}
          </h6>

          <div className="catagories-menu">
            <ul id="menu-content2" className="menu-content collapse show">
              <Link to={`/account/${localStorage._id}`}>
                <li>
                  <a className="text-dark">
                    <Person className="mr-2 " />
                    Profile
                  </a>
                </li>
              </Link>
              <Link to="/password">
                <li>
                  <a className="text-dark">
                    <Key className="mr-2 mb-0" />
                    Change Password
                  </a>
                </li>
              </Link>
              <Link to="/purchases">
                <li>
                  <a className="text-dark">
                    <Bag className="mr-2 mb-0" />
                    Purchases
                  </a>
                </li>
              </Link>
              <Link to="/returns">
                <li>
                  <a className="text-dark">
                    <Arrow90degLeft className="mr-2 mb-0" />
                    Returns
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountSidebar;
