import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "react-bootstrap-icons";
import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../../config/global_constants";
import axios from "axios";

export default class ProductBox extends React.Component {
  componentDidMount() {
    this.props.product.photos.map((photo) => {
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
  render() {
    return (
      <div className="col-12 col-sm-6 col-lg-4">
        <div className="single-product-wrapper">
          <div className="product-img">
            {this.props.product.photos.map((photo, index) => {
              if (index === 0) {
                return <img key={photo._id} alt="Product" id={photo._id} />;
              } else if (index === 1) {
                return (
                  <img
                    key={photo._id}
                    alt="Product"
                    id={photo._id}
                    className="hover-img"
                  />
                );
              } else {
                return null;
              }
            })}
          </div>

          <div className="product-description">
            <span>
              {this.props.product.categories.map((g, i, l) =>
                i + 1 === l.length ? (
                  <span key={g}> {g} </span>
                ) : (
                  <span key={g}> {g} |</span>
                )
              )}
            </span>
            <Link
              to={{
                pathname: "/product/" + this.props.product._id,
                state: { product: this.props.product },
              }}
            >
              <a>
                <h6>{this.props.product.productName}</h6>
              </a>
            </Link>

            <span>Stock: {this.props.product.stock}</span>

            <p className="product-price">
              €{(Math.round(this.props.product.price * 100) / 100).toFixed(2)}
            </p>
            {parseInt(localStorage.accessLevel) === ACCESS_LEVEL_ADMIN ? (
              <div className="icons-in-box">
                <Link to={"/editproduct/" + this.props.product._id}>
                  <Pencil className="mr-2" color="#787878" size={20} />
                </Link>
                <Link to={"/deleteproduct/" + this.props.product._id}>
                  <Trash className="mr-1" color="#787878" size={20} />
                </Link>
              </div>
            ) : null}

            <div className="hover-content">
              {parseInt(localStorage.accessLevel) < ACCESS_LEVEL_ADMIN ? (
                <div className="add-to-cart-btn">
                  <Link
                    to={{
                      pathname:
                        "/addtocart/" +
                        this.props.product._id +
                        "/" +
                        this.props.product.price +
                        "/" +
                        this.props.product.stock,
                      state: { navTo: "/" },
                    }}
                  >
                    <button
                      onClick={this.addToCart}
                      className="btn essence-btn"
                    >
                      Add to Cart
                    </button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
