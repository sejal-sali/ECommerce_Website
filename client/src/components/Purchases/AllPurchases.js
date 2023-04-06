import React from "react";
import axios from "axios";
import {
  ACCESS_LEVEL_ADMIN,
  ACCESS_LEVEL_NORMAL_USER,
  SERVER_HOST,
} from "../../config/global_constants";
import PurchasesRow from "./PurchasesRow";
import { EmojiFrown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class AllPurchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios.defaults.withCredentials = true;

    if (parseInt(localStorage.accessLevel) === ACCESS_LEVEL_ADMIN) {
      axios
        .get(`${SERVER_HOST}/orders`, {
          headers: { authorization: localStorage.token },
        })
        .then((res) => {
          if (res.data) {
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage);
            } else {
              console.log("Orders record read");
              this.setState({ orders: res.data });
            }
          } else {
            console.log("Orders record not found");
          }
        });
    } else if (
      parseInt(localStorage.accessLevel) === ACCESS_LEVEL_NORMAL_USER
    ) {
      axios
        .get(`${SERVER_HOST}/orders/user/${localStorage._id}`, {
          headers: { authorization: localStorage.token },
        })
        .then((res) => {
          if (res.data) {
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage);
            } else {
              console.log("Orders record read");
              this.setState({ orders: res.data });
            }
          } else {
            console.log("Orders record not found");
          }
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.orders.length !== 0 ? (
          this.state.orders.map((order) => (
            <Link
              to={{
                pathname: `/orders/${order._id}`,
                state: {
                  order: order,
                },
              }}
            >
              <PurchasesRow order={order} />
            </Link>
          ))
        ) : (
          <div className="container text-center">
           
            <h3 className="mt-3 ">No purchases</h3>
          </div>
        )}
      </div>
    );
  }
}

export default AllPurchases;
