import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { Redirect, useParams, withRouter } from "react-router-dom";
import { SERVER_HOST } from "../../config/global_constants";

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHome: false,
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    MySwal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${SERVER_HOST}/users/${this.props.match.params.id}`, {
            headers: { authorization: localStorage.token },
          })
          .then((res) => {
            if (res.data) {
              if (res.data.errorMessage) {
                console.log(res.data.errorMessage);
              } // success
              else {
                console.log("User deleted");
              }
              this.setState({ redirectToHome: true });
            } else {
              console.log("User not deleted");
              this.setState({ redirectToHome: true });
            }
          });
        MySwal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.redirectToHome ? <Redirect to="/admindashboard" /> : null}
      </div>
    );
  }
}

export default withRouter(DeleteUser);
