import React from "react";
import CartRow from "./CartRow";
import { EmojiFrown } from "react-bootstrap-icons";

class CartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
    };
  }

  render() {
    return (
      <div className="col-md-12 col-lg-8">
        <div className="items">
          {this.props.cartItems.length > 0 ? (
            this.props.cartItems.map((item) =>
              item.quantity > 0 ? <CartRow key={item._id} item={item} /> : null
            )
          ) : (
            <div className="container text-center">
              
              <h3 className="mt-3 ">No items in shopping cart</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CartCard;
