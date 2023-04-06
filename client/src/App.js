import { Switch, BrowserRouter, Route } from "react-router-dom";
import { ACCESS_LEVEL_GUEST } from "./config/global_constants";
import "./App.css";
import "./css/core-style.css";


// Components import
import Header from "./components/Header/Header";
import Shop from "./pages/Shop";
import React from "react";
import ShoppingCart from "./pages/ShoppingCart";
import AddProduct from "./components/ProductForms/AddProduct";
import DeleteProduct from "./components/ProductForms/DeleteProduct";
import Register from "./components/UserForms/Register";
import EditProduct from "./components/ProductForms/EditProduct";
import SingleProduct from "./pages/SingleProduct";
import LogIn from "./components/UserForms/LogIn";
import AdministratorRoute from "./components/AdministratorRoute";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
import DeleteUser from "./components/AdminDashboard/DeleteUser";
import AddToCart from "./components/ShoppingCart/AddToCart";
import OrderDetails from "./components/Purchases/OrderDetails";
import OrderReturn from "./components/Purchases/OrderReturn";
import ReturnDetails from "./components/Purchases/ReturnDetails";
import Purchases from "./pages/Purchases";
import Returns from "./pages/Returns";
import ChangePassword from "./pages/ChangePassword";

if (typeof localStorage.accessLevel === "undefined") {
  localStorage.name = "GUEST";
  localStorage.accessLevel = ACCESS_LEVEL_GUEST;
  localStorage.token = null;
  localStorage.cart = null;
  localStorage.profilePhoto = null;
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/shoppingcart" component={ShoppingCart} />
          <Route exact path="/product/:id" component={SingleProduct} />
          <AdministratorRoute exact path="/addproduct" component={AddProduct} />
          <AdministratorRoute
            exact
            path="/deleteproduct/:id"
            component={DeleteProduct}
          />
          <AdministratorRoute
            exact
            path="/editproduct/:id"
            component={EditProduct}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/account/:id" component={Account} />
          <AdministratorRoute
            exact
            path="/admindashboard"
            component={AdminDashboard}
          />
          <AdministratorRoute
            exact
            path="/deleteuser/:id"
            component={DeleteUser}
          />
          <Route
            exact
            path="/addtocart/:id/:price/:stock"
            component={AddToCart}
          />
          <Route exact path="/orders/:id" component={OrderDetails} />
          <Route exact path="/order/return/:id" component={OrderReturn} />
          <Route exact path="/return/:id" component={ReturnDetails} />
          <Route exact path="/purchases" component={Purchases} />
          <Route exact path="/returns" component={Returns} />
          <Route exact path="/password" component={ChangePassword} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
