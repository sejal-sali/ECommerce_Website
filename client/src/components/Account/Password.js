import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import { SERVER_HOST } from "../../config/global_constants";
import Swal from "sweetalert2";

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  }

  validatePassword() {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*]).{8,}$/.test(
      this.state.newPassword
    );
  }

  validateConfirmPassword() {
    return this.state.confirmNewPassword === this.state.newPassword;
  }

  validate() {
    return {
      password: this.validatePassword(),
      confirmPassword: this.validateConfirmPassword(),
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    const passwordObject = {
      password: this.state.newPassword,
    };

    axios
      .put(
        `${SERVER_HOST}/users/${localStorage._id}/${this.state.oldPassword}`,
        passwordObject,
        { headers: { authorization: localStorage.token } }
      )
      .then((res) => {
        console.log("Password changed");
        Swal.fire({
          title: "Password changed",
          text: "Password has been changed.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.setState({ redirectToHome: true });
      })
      .catch((err) => {
        console.log("Password not changed");
        Swal.fire({
          title: "Password not changed",
          text: err.response.data,
          icon: "error",
          confirmButtonColor: "#123c69",
          showConfirmButton: true,
        });
      });
  };

  render() {
    const formInputsState = this.validate();
    const inputsAreAllValid = Object.keys(formInputsState).every(
      (index) => formInputsState[index]
    );

    let passwordError = "";
    let confirmPasswordError = "";

    if (!this.validatePassword()) {
      let errorData = [];

      if (this.state.newPassword.length < 8) {
        errorData.push({
          id: 0,
          message: "Password must be at least 8 characters long.",
        });
      }
      if (!this.state.newPassword.match(/(?=.*[0-9])/)) {
        errorData.push({
          id: 1,
          message: "Password must contain at least one digit (0-9).",
        });
      }
      if (!this.state.newPassword.match(/[a-z]+/)) {
        errorData.push({
          id: 2,
          message: "Password must contain at least one lowercase character.",
        });
      }
      if (!this.state.newPassword.match(/[A-Z]+/)) {
        errorData.push({
          id: 3,
          message: "Password must contain at least one uppercase character.",
        });
      }
      if (!this.state.newPassword.match(/(?=.*[£!#€$%^&*])/)) {
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
      <Form id="contact">
        {this.state.redirectToHome ? <Redirect to="/shop" /> : null}
        <div className="form-floating mb-3">
          <label>Current password</label>
          <input
            type="password"
            name="oldPassword"
            className="form-control"
            placeholder="Enter current password"
            onChange={this.handleChange}
            value={this.state.oldPassword}
            required
            autoFocus
          />
        </div>

        <div className="form-floating mb-3">
          <label>New password</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            placeholder="Enter new password"
            onChange={this.handleChange}
            value={this.state.newPassword}
          />
          {passwordError}
        </div>

        <div className="form-floating mb-3">
          <label>Confirm new password</label>
          <input
            type="password"
            name="confirmNewPassword"
            className="form-control"
            value={this.state.confirmNewPassword}
            placeholder="Confirm new password"
            onChange={this.handleChange}
          />
          {confirmPasswordError}
        </div>
        <div className="d-grid mb-2">
          <button
            className="btn btn-primary fw-bold mt-4"
            onClick={this.handleSubmit}
            disabled={!inputsAreAllValid}
          >
            Change Password
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(Password);
