import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import ShopBanner from "../ShopBanner";
import ReturnDetailsRow from "./ReturnDetailsRow";

class ReturnDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: "",
      photos: [],
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios
      .get(`${SERVER_HOST}/return/${this.props.match.params.id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        this.setState({ products: res.data.products });

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
        <ShopBanner title="Return Details" />
        <div className=" container p-3">
          <h4 className="text-center mb-4">Products</h4>
          {this.state.products.map((product) => (
            <ReturnDetailsRow key={product} productSchemaId={product} />
          ))}
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
            <span>Return by: </span>
            <span className="float-right">{this.state.user}</span>
          </div>
          <div className="summary-item">
            <span>Shipping cost: </span>
            <span className="float-right">FREE</span>
          </div>

          <div className="summary-item mt-3">
            <span>Refund total: </span>
            <span className="float-right">
              €{this.props.location.state.order.amount}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ReturnDetails;
