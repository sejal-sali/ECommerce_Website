import React from "react";
import AccountGrid from "../components/Account/AccountGrid";
import ShopBanner from "../components/ShopBanner";
import AccountSidebar from "../components/Account/AccountSidebar";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "profile",

    };
  }

  render() {
    return (
      <main>
        <ShopBanner title="My Account" />
        <section>
          <div className="container">
          <div className="sidebar col-12 col-md-4 col-lg-3">
                <AccountSidebar />
            </div>
            <div className="mainarea">
             
              <AccountGrid
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Account;
