import React from "react";
import ShopBanner from "../components/ShopBanner";
import CartCard from "../components/ShoppingCart/CartCard";
import SummaryCard from "../components/ShoppingCart/SummaryCard";
import axios from "axios";
import { SERVER_HOST, ACCESS_LEVEL_GUEST } from "../config/global_constants";
import { Spinner } from "react-bootstrap";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      subtotal: 0,
      shipping: 0,
      total: 0,
      loading: true,
    };
  }

  componentDidMount() {
    if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
      axios.get(`${SERVER_HOST}/cart/${localStorage._id}`).then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({ cartItems: res.data });
            const totalPrice = res.data
              .map((a) => a.productPrice * a.quantity)
              .reduce((a, b) => a + b, 0);

            this.setState({ subtotal: totalPrice });
            this.setState({
              shipping: 9,
            });
            this.setState({ total: this.state.subtotal + this.state.shipping });
            this.setState({ cartLength: res.data.length });
            this.setState({ loading: false });
          }
        }
      });
    } else {
      this.setState({ loading: false });
      if (localStorage.cart !== "null") {
        const cartItems = JSON.parse(localStorage.cart);
        this.setState({ cartItems: cartItems });
        const totalPrice = cartItems
          .map((a) => a.productPrice * a.quantity)
          .reduce((a, b) => a + b, 0);

        this.setState({ subtotal: totalPrice });
        let shipping =
          totalPrice.subtotal >= 30 || totalPrice.subtotal === 0 ? 0 : 9;
        this.setState({ shipping: shipping });
        let total = totalPrice + shipping;
        this.setState({ total: total });
      }
    }
  }

  render() {
    return this.state.loading ? (
      <Spinner animation="border" role="status">
        <span className="visually-hidden"></span>
      </Spinner>
    ) : (
      <main>
        {console.log(this.state.cartItems)}
        <ShopBanner title="Shopping Cart" />
        <section className="shopping-cart">
          <div className="container pl-5 pr-5 pt-3 pb-3">
            <div className="content">
              <div className="container">
                <div className="mainarea">

                <CartCard cartItems={this.state.cartItems} />
                </div>
                <div className="sidebar">
                <SummaryCard
                  cartItems={this.state.cartItems}
                  subtotal={this.state.subtotal}
                  shipping={this.state.shipping}
                  total={this.state.total}
                />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default ShoppingCart;
