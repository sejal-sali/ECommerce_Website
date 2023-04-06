import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { SERVER_HOST } from "../../config/global_constants";

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      backToHome: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${SERVER_HOST}/users/logout`).then((res) => {
      console.log("User signed out");
      localStorage.clear();

      this.setState({ isLoggedIn: false });
    });
  };

  refreshPage() {
    window.location.reload(false);
    this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <div>
        {!this.state.isLoggedIn ? (
          this.refreshPage()
        ) : localStorage.accessLevel == 0 ? (
          <Redirect to="/" />
        ) : null}

        <button className="btn btn-danger" onClick={this.handleSubmit}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default LogOut;
