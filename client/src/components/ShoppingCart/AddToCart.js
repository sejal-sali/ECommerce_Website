import axios from "axios";
import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { SERVER_HOST, ACCESS_LEVEL_GUEST } from "../../config/global_constants";
import Swal from "sweetalert2";

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      navTo: "",
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    this.setState({ navTo: state.navTo });

    const cartObject = {
      productId: this.props.match.params.id,
      userId: localStorage._id,
      quantity: 1,
      productPrice: this.props.match.params.price,
    };

    if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
      axios
        .get(
          `${SERVER_HOST}/cart/${this.props.match.params.id}/${localStorage._id}`
        )
        .then((res) => {
          if (res.data) {
            if (this.props.match.params.stock <= res.data.quantity) {
              Swal.fire({
                title: "Product not added",
                text: "Not enough stock",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: "#123c69",
              }).then(this.setState({ redirectToHome: true }));
            } else {
              axios.put(
                `${SERVER_HOST}/cart/increaseQuantity/${res.data._id}/${this.props.match.params.id}`
              );
              Swal.fire({
                title: `Product added to shopping cart`,
                text: "The product has been added.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              this.setState({ redirectToHome: true });
            }
          } else {
            axios.post(
              `${SERVER_HOST}/cart/${this.props.match.params.id}`,
              cartObject
            );
            Swal.fire({
              title: `Product added to shopping cart`,
              text: "The product has been added.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.setState({ redirectToHome: true });
          }
        });
    } else {
      if (localStorage.cart === "null") {
        Swal.fire({
          title: `Product added to shopping cart`,
          text: "The product has been added.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => {
          this.setState({ redirectToHome: true });
          window.location.reload(false);
        });
        const cartArray = [];
        cartArray.push(cartObject);
        localStorage.cart = JSON.stringify(cartArray);
      } else {
        const curCart = JSON.parse(localStorage.cart);
        let quantity;
        curCart.forEach((item) => {
          if (item.productId === cartObject.productId) {
            quantity = item.quantity;
          }
        });
        if (this.props.match.params.stock <= quantity) {
          Swal.fire({
            title: "Product not added",
            text: "Not enough stock",
            icon: "error",
            showConfirmButton: true,
            confirmButtonColor: "#123c69",
          }).then(this.setState({ redirectToHome: true }));
        } else {
          let exist = false;
          curCart.forEach((item) => {
            if (item.productId === cartObject.productId) {
              item.quantity++;
              exist = true;
            }
          });
          if (!exist) {
            curCart.push(cartObject);
          }

          localStorage.cart = JSON.stringify(curCart);
          Swal.fire({
            title: `Product added to shopping cart`,
            text: "The product has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            this.setState({ redirectToHome: true });
            window.location.reload(false);
          });
        }
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.redirectToHome ? <Redirect to={this.state.navTo} /> : null}
      </div>
    );
  }
}

export default withRouter(AddToCart);
