import React from "react";
import { People, Shop, Arrow90degLeft } from "react-bootstrap-icons";
import ShopBanner from "../components/ShopBanner";
import DashboardGrid from "../components/AdminDashboard/DashboardGrid";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "all users",
      profilePage: true,
      allPurchasesPage: false,
      returnPage: false,
    };
  }

  handleProfileClick = (e) => {
    this.toggleProfile();
  };

  toggleProfile() {
    this.setState({ title: "users" });
    this.setState({ profilePage: true });
    this.setState({ allPurchasesPage: false });
    this.setState({ returnPage: false });
    this.setState({ passwordPage: false });
  }

  handlePasswordClick = (e) => {
    this.togglePassword();
  };

  togglePassword() {
    this.setState({ title: "password" });
    this.setState({ profilePage: false });
    this.setState({ allPurchasesPage: false });
    this.setState({ passwordPage: true });
    this.setState({ returnPage: false });
  }

  handleAllPurchasesClick = (e) => {
    this.togglePurchases();
  };

  togglePurchases() {
    this.setState({ title: "All Purchases" });
    this.setState({ profilePage: false });
    this.setState({ allPurchasesPage: true });
    this.setState({ passwordPage: false });
    this.setState({ returnPage: false });
  }

  handleReturnsClick = (e) => {
    this.toggleReturns();
  };

  toggleReturns() {
    this.setState({ title: "Returns" });
    this.setState({ profilePage: false });
    this.setState({ allPurchasesPage: false });
    this.setState({ passwordPage: false });
    this.setState({ returnPage: true });
  }

  render() {
    return (
      <main>
        <ShopBanner title="Admin Dashboard" />
        <section>
          <div className="container">
            <div className="">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="shop_sidebar_area ml-3 mr-3">
                  <div className="widget catagory mb-50">
                    <h6 className="widget-title mb-30 text-capitalize">
                      {`Welcome, ${localStorage.name.split(" ")[0]}!`}
                    </h6>

                    <div className="catagories-menu">
                      <ul
                        id="menu-content2"
                        className="menu-content collapse show"
                      >
                        <li onClick={this.handleProfileClick}>
                          <a>
                            <People className="mr-2 " />
                            All Users
                          </a>
                        </li>
                        <li onClick={this.handleAllPurchasesClick}>
                          <a>
                            <Shop className="mr-2 mb-0" />
                            All Purchases
                          </a>
                        </li>
                        <li onClick={this.handleReturnsClick}>
                          <a>
                            <Arrow90degLeft className="mr-2 mb-0" />
                            All Returns
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <DashboardGrid
                title={this.state.title}
                profilePage={this.state.profilePage}
                allPurchasesPage={this.state.allPurchasesPage}
                returnPage={this.state.returnPage}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default AdminDashboard;
