import React from "react";
import axios from "axios";
import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../../config/global_constants";
import ShopBanner from "../ShopBanner";
import OrderDetailsRow from "./OrderDetailsRow";
import { Link } from "react-router-dom";

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: "",
      photos: [],
      quantity: [],
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios
      .get(`${SERVER_HOST}/orders/${this.props.match.params.id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        let products = [];
        res.data.products.map((product, index) => {
          products[index] = product;
          this.setState({ products: products });
        });

        this.setState({ user: "guest" });

        if (res.data.userId !== "undefined") {
          axios
            .get(`${SERVER_HOST}/users/${res.data.userId}`, {
              headers: { authorization: localStorage.token },
            })
            .then((res) => {
              this.setState({ user: res.data.email });
            });
        }
      });
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <ShopBanner title="Order Details" />
        <div className=" container p-3 mainarea">
          <h4 className="text-center mb-4">Products</h4>
          {this.state.products.map((product) => (
            <OrderDetailsRow key={product._id} product={product} />
          ))}
          {parseInt(localStorage.accessLevel) < ACCESS_LEVEL_ADMIN ? (
            <Link
              to={{
                pathname: `/order/return/${this.props.location.state.order._id}`,
                state: {
                  order: this.props.location.state.order,
                },
              }}
            >
              <p className="text-center m-1">
                <u>Return item?</u>
              </p>
            </Link>
          ) : null}
        </div>

        <div className="bg-light p-3 order-details-summary mb-4 sidebar">
          <h4 className="text-center mb-4">Summary</h4>
          <div className="summary-item">
            <span>Payment method: </span>
            <span className="float-right">
              <strong>Paypal</strong>
            </span>
          </div>
          <div className="summary-item">
            <span>Order by: </span>
            <span className="float-right">{this.state.user}</span>
          </div>
          <div className="summary-item">
            <span>Subtotal: </span>
            <span className="float-right">
              €{this.props.location.state.order.amount}
            </span>
          </div>
          <div className="summary-item">
            <span>Shipping cost: </span>
            <span className="float-right">
              €{this.props.location.state.order.shippingCost}
            </span>
          </div>
          <div className="summary-item mt-3">
            <span>Total: </span>
            <span className="float-right">
              €
              {this.props.location.state.order.amount +
                this.props.location.state.order.shippingCost}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetails;
