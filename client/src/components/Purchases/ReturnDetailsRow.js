import React from "react";
import { SERVER_HOST } from "../../config/global_constants";
import axios from "axios";

class ReturnDetailsRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: 0,
      photos: [],
      quantity: 0,
    };
  }
  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/orders/product/${this.props.productSchemaId}`)
      .then((res) => {
        let returnedProduct = res.data[0].products.filter(
          (item) => item._id === this.props.productSchemaId
        )[0];

        this.setState({
          quantity: returnedProduct.quantity,
        });

        axios
          .get(`${SERVER_HOST}/products/${returnedProduct.productId}`)
          .then((res) => {
            this.setState({
              productName: res.data.productName,
              price: res.data.price,
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
          });
      });
  }

  render() {
    let totalPrice = this.state.price * this.state.quantity;
    return (
      <div className="ml-2 mt-0 mb-2 d-flex align-items-center justify-contents-center p-2 order-details-row">
        <div className="row">
          {this.state.photos.map((photo, index) =>
            index === 0 ? (
              <img
                className="rounded "
                key={photo._id}
                id={photo._id}
                alt="Product"
                width="200"
              />
            ) : null
          )}

          <div className=" d-flex align-items-center justify-content-center w-80">
            <div className="info details-row">
              <div className="row ">
                <div className="col-md-5 ml-4">
                  <div>
                    <h6>{this.state.productName}</h6>
                  </div>
                </div>
                <div className="ml-2 w-30 quantity-details">
                  <label>Quantity:</label>

                  <span> {this.state.quantity}</span>
                </div>
                <div className="ml-5 quantity-details">
                  <span>
                    €{(Math.round(totalPrice * 100) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReturnDetailsRow;
