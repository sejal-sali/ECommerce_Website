import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import ShopBanner from "../ShopBanner";
import OrderDetailsRow from "./OrderDetailsRow";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class OrderReturn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: "",
      photos: [],
      quantity: [],
      selected: [],
      _id: "",
      redirect: false,
      returnTotal: 0,
    };
  }

  handleSelected = (e) => {
    let selected = this.state.selected;
    let index;
    if (e.target.checked) {
      selected.push(e.target.value);

      let productObj = JSON.parse(e.target.value);
      axios
        .get(`${SERVER_HOST}/products/${productObj.productId}`)
        .then((res) => {
          this.setState({
            returnTotal:
              this.state.returnTotal + productObj.quantity * res.data.price,
          });
        });
    } else {
      index = selected.indexOf(e.target.value);
      selected.splice(index, 1);

      let productObj = JSON.parse(e.target.value);
      axios
        .get(`${SERVER_HOST}/products/${productObj.productId}`)
        .then((res) => {
          this.setState({
            returnTotal:
              this.state.returnTotal - productObj.quantity * res.data.price,
          });
        });
    }
    this.setState({ selected: selected });
  };

  handleSubmit = (e) => {
    axios.defaults.withCredentials = true;
    let today = new Date();

    let returnObj = {
      orderId: this.props.match.params.id,
      products: this.state.selected,
      userId: localStorage._id,
      date: today,
      amount: this.state.returnTotal,
    };

    axios.post(`${SERVER_HOST}/return`, returnObj);
    Swal.fire({
      title: "Product return confirmed",
      text: "Your return is being processed.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    this.setState({ redirect: true });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios
      .get(`${SERVER_HOST}/orders/${this.props.match.params.id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        this.setState({ _id: res.data._id });
        let products = [];
        res.data.products.map((product, index) => {
          products[index] = product;
          this.setState({ products: products });
        });

        if (res.data.userId !== "undefined") {
          axios
            .get(`${SERVER_HOST}/users/${res.data.userId}`, {
              headers: { authorization: localStorage.token },
            })
            .then((res) => {
              this.setState({ user: res.data.email });
            });
        } else {
          this.setState({ user: "guest" });
        }
      });
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        {this.state.redirect ? <Redirect to="/" /> : null}
        <ShopBanner title="Order Return" />
        <div className="hgvcfwqx container p-3">
          <h4 className="text-center mb-4">Select items to return</h4>
          {this.state.products.map((product) =>
            product.status !== "Returned" ? (
              <div className="d-flex align-items-center">
                <input
                  onChange={this.handleSelected}
                  type="checkbox"
                  value={JSON.stringify({
                    productId: product.productId,
                    quantity: product.quantity,
                    _id: product._id,
                  })}
                  className="mr-4"
                />
                <OrderDetailsRow key={product._id} product={product} />
              </div>
            ) : null
          )}
        </div>

        <div className="bg-light p-3 order-details-summary mb-4">
          <h4 className="text-center mb-4">Summary</h4>
          <div className="summary-item">
            <span>Refund method: </span>
            <span className="float-right">
              <strong>Paypal</strong>
            </span>
          </div>
          <div className="summary-item">
            <span>Shipping cost: </span>
            <span className="float-right">FREE</span>
          </div>
          <div className="summary-item mt-3">
            <span>Refund total: </span>
            <span className="float-right">€{this.state.returnTotal}</span>
          </div>
        </div>
        <div className="d-flex flex-row m-3">
          <button
            onClick={this.handleSubmit}
            className="btn btn-success mr-3 mb-4 w-80"
            disabled={this.state.selected.length === 0}
          >
            Confirm
          </button>
          <Link
            to={{
              pathname: `/orders/${this.props.match.params.id}`,
              state: {
                order: this.props.location.state.order,
              },
            }}
          >
            <button className="btn btn-danger ml-3 mb-4 w-80">Cancel</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default OrderReturn;
