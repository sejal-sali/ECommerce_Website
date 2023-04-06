import React from "react";
import LogOut from "../UserForms/LogOut";

class AccountTopBar extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 mt-5">
          <div className="product-topbar d-flex align-items-center justify-content-between">
            <div className="total-products">
              <p>{this.props.title}</p>
            </div>

            <div className="product-sorting d-flex">
              <LogOut />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountTopBar;
