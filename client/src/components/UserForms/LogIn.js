import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      backToHome: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios
      .post(
        `${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`
      )
      .then((res) => {
        localStorage._id = res.data._id;
        localStorage.name = res.data.name;
        localStorage.token = res.data.token;
        localStorage.accessLevel = res.data.accessLevel;
        localStorage.profilePhoto = res.data.profilePhoto;
        this.setState({ isLoggedIn: true });
      })
      .catch((err) => {
        Swal.fire({
          title: "User not signed in",
          text: err.response.data,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#123c69",
        });
      });
  };

  validateEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.state.email
    );
  }

  validatePassword() {
    return this.state.password !== "";
  }

  validate() {
    return this.validateEmail() && this.validatePassword();
  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    let emailError = "";
    let passwordError = "";

    if (!this.validateEmail()) {
      emailError = <p className="text-danger mt-2">Invalid email.</p>;
    }

    if (!this.validatePassword()) {
      passwordError = <p className="text-danger mt-2">Enter a password.</p>;
    }

    return (
      <div className="container">
        {this.state.isLoggedIn ? (
          Swal.fire({
            title: "User signed in",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => this.refreshPage())
        ) : localStorage.accessLevel != 0 ? (
          <Redirect to="/" />
        ) : null}
        <div className="">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-body p-4 p-sm-5">
                <h3 className="text-center mb-3">Sign In</h3>
                <Form action="post" id="contact">
                  <div className="form-floating mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      onChange={this.handleChange}
                    />
                    {emailError}
                  </div>

                  <hr />

                  <div className="form-floating mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                    {passwordError}
                  </div>

                  <div className="d-grid mb-2">
                    <Button
                      className="btn btn-block btn-primary btn-login fw-bold text-uppercase"
                      onClick={this.handleSubmit}
                      disabled={!this.validate()}
                    >
                      Sign In
                    </Button>
                  </div>

                  <p className="d-block text-center mt-3 ">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
