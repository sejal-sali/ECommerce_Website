import React from "react";
import ProfileTopBar from "./AccountTopBar";
import Profile from "./Profile";
import Password from "./Password";

class AccountGrid extends React.Component {
  render() {
    return (
      <div className="col-12 col-md-8 col-lg-9">
        <div className="shop_grid_product_area ml-5 mr-5">
          <ProfileTopBar title={this.props.title} />
          <Profile />
          {this.props.passwordPage ? <Password /> : null}
        </div>
      </div>
    );
  }
}

export default AccountGrid;
