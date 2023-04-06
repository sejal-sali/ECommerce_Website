import React from "react";
import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../../config/global_constants";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash } from "react-bootstrap-icons";

class CartRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: "",
      _id: "",
      quantity: this.props.item.quantity,
      totalPrice: 0,
      cartItem: "",
      stock: 0,
      photos: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/products/${this.props.item.productId}`)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              _id: res.data._id,
              productName: res.data.productName,
              price: res.data.price,
              totalPrice: res.data.price * this.state.quantity,
              stock: res.data.stock,
              photos: res.data.photos,
            });

            res.data.photos.map((photo) => {
              return axios
                .get(`${SERVER_HOST}/products/photo/${photo.filename}`)
                .then((res) => {
                  if (res.data) {
                    if (res.data.errorMessage) {
                      console.log(res.data.errorMessage);
                    } else {
                      document.getElementById(
                        photo._id
                      ).src = `data:;base64,${res.data.image}`;
                    }
                  } else {
                    console.log("Record not found");
                  }
                });
            });
          }
        } else {
          console.log(`Product not found`);
        }
      });

    if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
      axios
        .get(
          `${SERVER_HOST}/cart/${this.props.item.productId}/${localStorage._id}`
        )
        .then((res) => {
          if (res.data) {
            this.setState({ cartId: res.data._id });
            this.setState({ quantity: res.data.quantity });
          }
        });
    } else {
      JSON.parse(localStorage.cart).forEach((item) => {
        if (item.productId === this.props.item.productId) {
          this.setState({ cartId: item._id });
          this.setState({ quantity: item.quantity });
        }
      });
    }
  }

  handleIncreaseQuantity = (e) => {
    if (this.state.quantity === this.state.stock) {
      Swal.fire({
        title: "Product not added",
        text: "Not enough stock",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "#123c69",
      });
    } else {
      if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
        axios
          .put(
            `${SERVER_HOST}/cart/increaseQuantity/${this.props.item._id}/${this.state._id}`
          )
          .then((res) => {
            window.location.reload(false);
          });
      } else {
        let curCart = JSON.parse(localStorage.cart);
        curCart.forEach((item) => {
          if (item.productId === this.props.item.productId) {
            item.quantity++;
            window.location.reload(false);
          }
        });

        localStorage.cart = JSON.stringify(curCart);
      }
    }
  };

  handleDecreaseQuantity = (e) => {
    if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
      axios
        .put(
          `${SERVER_HOST}/cart/decreaseQuantity/${this.props.item._id}/${this.state._id}`
        )
        .then((res) => {
          window.location.reload(false);
        });
    } else {
      let curCart = JSON.parse(localStorage.cart);
      curCart.forEach((item) => {
        if (item.productId === this.props.item.productId) {
          item.quantity--;
          window.location.reload(false);
        }
      });
      localStorage.cart = JSON.stringify(curCart);
    }
  };

  handleRemoveItem = (e) => {
    let cartId = this.state.cartId;
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    MySwal.fire({
      title: "Remove item from shopping cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
          axios.delete(`${SERVER_HOST}/cart/${cartId}`).then((res) => {
            window.location.reload(false);
          });
        } else {
          let index = 0;
          let curCart = JSON.parse(localStorage.cart);
          curCart.forEach((item, i) => {
            if (item.productId === this.props.item.productId) {
              index = i;
            }
          });
          curCart.splice(index, 1);
          localStorage.cart = JSON.stringify(curCart);
          window.location.reload(false);
        }
      }
    });
  };

  render() {
    return (
      <div className="product border-bottom mt-5 mb-2">
        <div className="">
          <div className="col-md-3">
            {this.state.photos.map((photo, index) =>
              index === 0 ? (
                <img
                  width="200px"
                  className="rounded"
                  key={photo._id}
                  id={photo._id}
                  alt="Product"
                />
              ) : null
            )}
          </div>
          <div className="col-md-8">
            <div className="info">
              <div className="row">
                <div className="col-md-5">
                  <div>
                    <h6>{this.state.productName}</h6>
                  </div>
                </div>
                <div className="col-md-4 quantity">
                  <label>Quantity:</label>
                  <br />
                  {this.state.quantity > 1 ? (
                    <button
                      className="btn rounded-circle mr-3"
                      onClick={this.handleDecreaseQuantity}
                    >
                      -
                    </button>
                  ) : (
                    <button
                      className="btn rounded-circle mr-3"
                      onClick={this.handleRemoveItem}
                    >
                      -
                    </button>
                  )}
                  {this.state.quantity}

                  <span className="">
                    <button
                      className="btn rounded-circle ml-3"
                      onClick={this.handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </span>
                </div>
                <div className="col-md-3 price">
                  <span>
                    €
                    {(Math.round(this.state.totalPrice * 100) / 100).toFixed(2)}
                  </span>
                  <Trash
                    onClick={this.handleRemoveItem}
                    className="ml-3 cursor-pointer"
                    color="#787878"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartRow;
