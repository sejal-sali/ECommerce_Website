import React from "react";
import axios from "axios";
import {
  ACCESS_LEVEL_ADMIN,
  ACCESS_LEVEL_NORMAL_USER,
  SERVER_HOST,
} from "../../config/global_constants";
import { EmojiFrown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ReturnsRow from "./ReturnsRow";

class AllReturns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returns: [],
    };
  }
  componentDidMount() {
    axios.defaults.withCredentials = true;

    if (parseInt(localStorage.accessLevel) === ACCESS_LEVEL_ADMIN) {
      axios
        .get(`${SERVER_HOST}/return`, {
          headers: { authorization: localStorage.token },
        })
        .then((res) => {
          if (res.data) {
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage);
            } else {
              console.log("Returns record read");
              this.setState({ returns: res.data });
            }
          } else {
            console.log("Returns record not found");
          }
        });
    } else if (
      parseInt(localStorage.accessLevel) === ACCESS_LEVEL_NORMAL_USER
    ) {
      axios
        .get(`${SERVER_HOST}/return/user/${localStorage._id}`, {
          headers: { authorization: localStorage.token },
        })
        .then((res) => {
          if (res.data) {
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage);
            } else {
              console.log("Returns record read");
              this.setState({ returns: res.data });
            }
          } else {
            console.log("Returns record not found");
          }
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.returns.length !== 0 ? (
          this.state.returns.map((order) => (
            <Link
              to={{
                pathname: `/return/${order._id}`,
                state: {
                  order: order,
                },
              }}
            >
              <ReturnsRow order={order} />
            </Link>
          ))
        ) : (
          <div className="container text-center">
          
            <h3 className="mt-3 ">No returns</h3>
          </div>
        )}
      </div>
    );
  }
}

export default AllReturns;
