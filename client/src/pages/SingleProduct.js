import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants.js";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

export default class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.location.state.product.photos.map((photo) => {
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
      <section className="h-100 single_product_details_area d-flex align-items-center">
        <div className="single_product_thumb clearfix">
          <div className="product_thumbnail_slides ">
            <Carousel nextLabel="" prevLabel="" indicators={false}>
              {this.props.location.state.product.photos.map((photo) => {
                return (
                  <Carousel.Item key={photo._id}>
                    <img id={photo._id} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>

        <div className="single_product_desc clearfix">
          <span className="d-flex">
            {this.props.location.state.product.categories.map((g, i, l) =>
              i + 1 === l.length ? (
                <span className="ml-1" key={g}>
                  {" "}
                  {g}{" "}
                </span>
              ) : (
                <span key={g}> {g} | </span>
              )
            )}
          </span>
          <a>
            <h2>{this.props.location.state.product.productName}</h2>
          </a>
          <p className="product-price">
            €{this.props.location.state.product.price}
          </p>
          <p className="product-desc">
            {this.props.location.state.product.description}
          </p>

          <form className="cart-form clearfix">
            <div className="cart-fav-box d-flex align-items-center">
              {" "}
              <Link
                to={{
                  pathname:
                    "/addtocart/" +
                    this.props.location.state.product._id +
                    "/" +
                    this.props.location.state.product.price +
                    "/" +
                    this.props.location.state.product.stock,
                  state: {
                    navTo: `/`,
                  },
                }}
              >
                <button name="addtocart" className="btn essence-btn">
                  Add to cart
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
