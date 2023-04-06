import React, { Component } from "react";
import { ChevronRight } from "react-bootstrap-icons";

class PurchasesRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let date = new Date(this.props.order.date);
    let orderDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    let totalItem = 0;
    this.props.order.products.forEach((product) => {
      totalItem += product.quantity;
    });

    return (
      <div className="product border-bottom p-3">
        <div className="row">
          <div className="col-md-12">
            <div className="info">
              <div className="row">
                <div className="col-md-6 ml-4 mt-3">
                  <h6 className="mt-1">Order #{this.props.order._id}</h6>
                  <p className="mt-4">{totalItem} Items</p>
                </div>

                <div className="col-md-5 quantity mt-4">
                  <p>{orderDate}</p>
                  <p>€{this.props.order.amount}</p>
                </div>
                <div className=" mt-5">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasesRow;
