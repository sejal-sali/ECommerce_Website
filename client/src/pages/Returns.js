import React from "react";
import ShopBanner from "../components/ShopBanner";
import AccountSidebar from "../components/Account/AccountSidebar";
import AllReturns from "../components/Purchases/AllReturns";

class Returns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "profile",
      profilePage: true,
      allPurchasesPage: false,
      passwordPage: false,
      returnPage: false,
    };
  }

  render() {
    return (
      <main>
        <ShopBanner title="Returns" />
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <AccountSidebar />
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                <div className="shop_grid_product_area ml-5 mr-5">
                  <AllReturns />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Returns;
