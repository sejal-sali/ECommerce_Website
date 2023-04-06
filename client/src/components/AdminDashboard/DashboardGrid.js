import React from "react";
import ProfileTopBar from "../Account/AccountTopBar";
import Password from "../Account/Password";
import AllPurchases from "../Purchases/AllPurchases";
import AllReturns from "../Purchases/AllReturns";
import AllUsers from "./AllUsers";

class DashboardGrid extends React.Component {
  render() {
    return (
      <div className="col-12 col-md-8 col-lg-9">
        <div className="shop_grid_product_area ml-5 mr-5 mt-5">
          <ProfileTopBar title={this.props.title} />
          {this.props.profilePage ? <AllUsers /> : null}
          {this.props.passwordPage ? <Password /> : null}
          {this.props.allPurchasesPage ? <AllPurchases /> : null}
          {this.props.returnPage ? <AllReturns /> : null}
        </div>
      </div>
    );
  }
}

export default DashboardGrid;
