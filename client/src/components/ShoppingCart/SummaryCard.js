import React from "react";
import Checkout from "./Checkout";

class SummaryCard extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="summary">
          <h3>Summary</h3>
          <div className="summary-item">
            <span className="text">Subtotal</span>
            <span className="price">
              €{(Math.round(this.props.subtotal * 100) / 100).toFixed(2)}
            </span>
          </div>
          <div className="summary-item">
            <span className="text">Shipping</span>
            <span className="price">
              €{(Math.round(this.props.shipping * 100) / 100).toFixed(2)}
            </span>
          </div>
          <div className="summary-item mt-3">
            <span className="text">Total</span>
            <span className="price">
              €{(Math.round(this.props.total * 100) / 100).toFixed(2)}
            </span>
          </div>
          <br />
          <br />
          <Checkout
            amount={this.props.subtotal}
            shippingCost={this.props.shipping}
            cartItems={this.props.cartItems}
          />
        </div>
      </div>
    );
  }
}

export default SummaryCard;
