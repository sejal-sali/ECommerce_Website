import React from "react";
import { PersonCircle, Cart3 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import {
  SERVER_HOST,
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_NORMAL_USER,
  ACCESS_LEVEL_ADMIN,
} from "../../config/global_constants";
import axios from "axios";

class MetaData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
    };
  }
  componentDidMount() {
    if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
      axios.get(`${SERVER_HOST}/cart/${localStorage._id}`).then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              size: res.data.map((a) => a.quantity).reduce((a, b) => a + b, 0),
            });
          }
        }
      });
    } else {
      if (localStorage.cart !== "null") {
        const curCart = JSON.parse(localStorage.cart);
        let size = curCart
          .map((a) => parseInt(a.quantity))
          .reduce((a, b) => a + b, 0);
        this.setState({
          size: size,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (localStorage.accessLevel > parseInt(ACCESS_LEVEL_GUEST)) {
      axios.get(`${SERVER_HOST}/cart/${localStorage._id}`).then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              size: res.data.map((a) => a.quantity).reduce((a, b) => a + b, 0),
            });
          }
        }
        if (this.state.size !== prevState.size) {
          this.setState({ size: this.state.size });
        }
      });
    } else {
      const curCart = JSON.parse(localStorage.cart);
      let size = curCart.map((a) => a.quantity).reduce((a, b) => a + b, 0);
      if (this.state.size !== size) {
        this.setState({ size: size });
      }
    }
  }
  render() {
    return (
      <div className="header-meta d-flex clearfix justify-content-end">
        <div className="user-login-info">
          {parseInt(localStorage.accessLevel) === ACCESS_LEVEL_GUEST ? (
            <Link to="/login">
              <a>
                <PersonCircle size={25} className="icon" />
                <p className="cart_size">SIGN IN</p>
              </a>
            </Link>
          ) : parseInt(localStorage.accessLevel) ===
            ACCESS_LEVEL_NORMAL_USER ? (
            <Link to={"/account/" + localStorage._id}>
              <a>
                {localStorage.profilePhoto !== "null" ? (
                  <img
                    src={`data:;base64,${localStorage.profilePhoto}`}
                    alt=""
                    className="rounded-circle"
                    style={{
                      objectFit: "cover",
                      width: "22px",
                      height: "22px",
                    }}
                  />
                ) : (
                  <PersonCircle size={25} className="icon" />
                )}
                <p className="text-capitalize cart_size">
                  {localStorage.name.split(" ")[0]}
                </p>
              </a>
            </Link>
          ) : (
            <Link to={"/admindashboard"}>
              <a>
                {localStorage.profilePhoto !== "null" ? (
                  <img
                    id="profilePhoto"
                    src={`data:;base64,${localStorage.profilePhoto}`}
                    alt=""
                    width="25px"
                    className="rounded-circle"
                  />
                ) : (
                  <PersonCircle size={25} className="icon" />
                )}

                <p className="text-capitalize cart_size">
                  {localStorage.name.split(" ")[0]}
                </p>
              </a>
            </Link>
          )}
        </div>
        {localStorage.accessLevel < ACCESS_LEVEL_ADMIN ? (
          <div className="cart-area">
            <Link to="/shoppingcart">
              <a>
                <Cart3 size={25} className="icon" />
                <h6 className="mb-3 cart_size">{this.state.size}</h6>
              </a>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MetaData;
