import React from "react";
import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../../config/global_constants";
import { PayPalButton } from "react-paypal-button-v2";
import Swal from "sweetalert2";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
    };
  }
  onSuccess = (paymentData) => {
    console.log("PayPal payment was successful:", paymentData);

    let url = `${SERVER_HOST}/orders`;

    let orderDetails = new Object();
    orderDetails.paymentId = paymentData.id;
    orderDetails.amount = this.props.amount;
    orderDetails.shippingCost = this.props.shippingCost;
    orderDetails.userId = localStorage._id;
    orderDetails.products = [];

    this.props.cartItems.map((item, index) => {
      orderDetails.products[index] = {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    let today = new Date();
    orderDetails.date = today;

    axios.post(url, orderDetails);

    localStorage.cart = "null";

    Swal.fire({
      title: "PayPal payment was successful",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: "#123c69",
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.reload(false);
        this.setState({ redirectToHome: true });
      }
    });
  };

  onError = (errorData) => {
    console.log("PayPal error:", errorData);
    Swal.fire({
      title: "PayPal error",
      text: "No items in shopping cart",
      icon: "error",
      showConfirmButton: true,
      confirmButtonColor: "#123c69",
    }).then((res) => {
      if (res.isConfirmed) {
      }
    });
  };

  onCancel = (cancelData) => {
    // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
    console.log("Payment cancelled by user:", cancelData);
    Swal.fire({
      title: "Payment cancelled by user",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  render() {
    const client_id = SANDBOX_CLIENT_ID;

    return (
      <div>
        {this.state.redirectToHome ? <Redirect to="/" /> : null}
        <PayPalButton
          options={{
            clientId: client_id,
            currency: "EUR",
          }}
          amount={this.props.amount}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
