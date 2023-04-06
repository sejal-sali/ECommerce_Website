import React from "react";
import { Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class UserRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.email}</td>
        {this.props.user.phone !== undefined &&
        this.props.user.phone.length !== 0 ? (
          <td>+{this.props.user.phone}</td>
        ) : (
          <td></td>
        )}
        <td className="text-center">
          <Link to={"/deleteuser/" + this.props.user._id}>
            <Trash size={20} />
          </Link>
        </td>
      </tr>
    );
  }
}

export default UserRow;
