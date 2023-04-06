import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isRegistered: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    this.setState({ wasSubmittedAtLeastOnce: true });

    axios.defaults.withCredentials = true;

    axios
      .post(
        `${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`
      )
      .then((res) => {
        Swal.fire({
          title: "User registered",
          text: "User has been registered, you can now log in.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.setState({ isRegistered: true });
      })
      .catch((err) => {
        Swal.fire({
          title: "User not registered",
          text: err.response.data,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#123c69",
        });
      });
  };

  validateName() {
    return this.state.name !== "";
  }

  validateEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.state.email
    );
  }

  validatePassword() {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*]).{8,}$/.test(
      this.state.password
    );
  }

  validateConfirmPassword() {
    return this.state.confirmPassword === this.state.password;
  }

  validate() {
    return {
      name: this.validateName(),
      email: this.validateEmail(),
      password: this.validatePassword(),
      confirmPassword: this.validateConfirmPassword(),
    };
  }

  render() {
    const formInputsState = this.validate();
    const inputsAreAllValid = Object.keys(formInputsState).every(
      (index) => formInputsState[index]
    );

    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (!this.validateName()) {
      nameError = <p className="text-danger mt-2">User name is required.</p>;
    }
    if (!this.validateEmail()) {
      emailError = <p className="text-danger mt-2">Invalid email.</p>;
    }
    if (!this.validatePassword()) {
      let errorData = [];

      if (this.state.password.length < 8) {
        errorData.push({
          id: 0,
          message: "Password must be at least 8 characters long.",
        });
      }
      if (!this.state.password.match(/(?=.*[0-9])/)) {
        errorData.push({
          id: 1,
          message: "Password must contain at least one digit (0-9).",
        });
      }
      if (!this.state.password.match(/[a-z]+/)) {
        errorData.push({
          id: 2,
          message: "Password must contain at least one lowercase character.",
        });
      }
      if (!this.state.password.match(/[A-Z]+/)) {
        errorData.push({
          id: 3,
          message: "Password must contain at least one uppercase character.",
        });
      }
      if (!this.state.password.match(/(?=.*[£!#€$%^&*])/)) {
        errorData.push({
          id: 4,
          message:
            "Password must contain at least one of the characters £!#€$%^&*",
        });
      }

      passwordError = (
        <ul className="text-danger mt-2">
          {errorData.map((e) => (
            <li key={e.id} className="error">
              {e.message}
            </li>
          ))}
        </ul>
      );
    }
    if (!this.validateConfirmPassword()) {
      confirmPasswordError = (
        <p className="text-danger mt-2">Passwords must match.</p>
      );
    }

    return (
      <div className="container">
        {this.state.isRegistered ? <Redirect to="/" /> : null}
        <div className="">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-body p-4 p-sm-5">
                <h3 className="text-center mb-3">Register</h3>
                <Form id="contact">
                  <div className="form-floating mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="floatingInputUsername"
                      placeholder="Enter your name"
                      onChange={this.handleChange}
                      required
                      autoFocus
                    />
                    {nameError}
                  </div>

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

                  <div className="form-floating mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      id="floatingConfirmPassword"
                      placeholder="Confirm Password"
                      onChange={this.handleChange}
                    />
                    {confirmPasswordError}
                  </div>

                  <div className="d-grid mb-2">
                    <Button
                      className="btn btn-block btn-primary btn-login fw-bold text-uppercase"
                      onClick={this.handleSubmit}
                      disabled={!inputsAreAllValid}
                    >
                      Register
                    </Button>
                  </div>

                  <p className="d-block text-center mt-3 ">
                    Have an account? <Link to="/login">Sign In</Link>
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

export default Register;
