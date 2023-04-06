import React from "react";
import { Table } from "react-bootstrap";
import { EmojiFrown } from "react-bootstrap-icons";
import UserRow from "./UserRow";
import { SERVER_HOST } from "../../config/global_constants";
import axios from "axios";

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios
      .get(`${SERVER_HOST}/users`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log("Users record read");
            this.setState({ users: res.data });
          }
        } else {
          console.log("Users record not found");
        }
      });
  }
  render() {
    const ADMIN_EMAIL = "admin@milkysky.com";
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.users !== undefined ? (
            this.state.users.map((user, i) =>
              user.email !== ADMIN_EMAIL ? (
                <UserRow key={user._id} user={user} index={i} />
              ) : null
            )
          ) : (
            <div className="container text-center">
              <EmojiFrown className="mt-2" size="50" color="black" />
              <h3 className="mt-3 ">No users found</h3>
            </div>
          )}
        </tbody>
      </Table>
    );
  }
}

export default AllUsers;
