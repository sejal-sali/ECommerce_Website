import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import { SERVER_HOST } from "../../config/global_constants";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      selectedFile: null,
      profilePhoto: "",
    };
  }

  handleFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    axios
      .get(`${SERVER_HOST}/users/${localStorage._id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              name: res.data.name,
              email: res.data.email,
              phone: res.data.phone,
              profilePhoto: res.data.profilePhoto,
            });
          }
        } else {
          console.log(`Product not found`);
        }
      });
  }

  validateName() {
    return this.state.name !== "";
  }

  validateEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.state.email
    );
  }

  validatePhone() {
    return this.state.phone.length === 0 || this.state.phone.length >= 10;
  }

  validate() {
    return {
      name: this.validateName(),
      email: this.validateEmail(),
      phone: this.validatePhone(),
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("phone", this.state.phone);
    formData.append("profilePhoto", this.state.selectedFile);

    axios
      .put(`${SERVER_HOST}/users/${this.props.match.params.id}`, formData, {
        headers: {
          authorization: localStorage.token,
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
            Swal.fire({
              title: "Changes not saved",
              text: res.data.errorMessage,
              icon: "error",
              confirmButtonColor: "#123c69",
              showConfirmButton: true,
            });
          } else {
            console.log("Changes saved");
            if (this.state.selectedFile !== null) {
              localStorage.profilePhoto = res.data.profilePhoto;
            }

            Swal.fire({
              title: "Changes saved",
              text: "User details have been updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then((res) => {
              localStorage.name = this.state.name;
              window.location.reload(false);
            });
          }
        } else {
          console.log("Changes not saved");
          Swal.fire({
            title: "Changes not saved",
            text: "Make sure that data is valid.",
            icon: "error",
            confirmButtonColor: "#123c69",
            showConfirmButton: true,
          });
        }
      });
  };

  render() {
    const formInputsState = this.validate();
    const inputsAreAllValid = Object.keys(formInputsState).every(
      (index) => formInputsState[index]
    );

    let nameError = "";
    let emailError = "";
    let phoneError = "";

    if (!this.validateName()) {
      nameError = <p className="text-danger mt-2">User name is required.</p>;
    }
    if (!this.validateEmail()) {
      emailError = <p className="text-danger mt-2">Invalid email.</p>;
    }
    if (!this.validatePhone()) {
      phoneError = <p className="text-danger mt-2">Invalid phone number.</p>;
    }

    return (
      <Form id="contact">
        {this.state.redirectToHome ? <Redirect to="/" /> : null}
        <div className="form-floating mb-3">
          <label>Profile Picture</label>
          <br />
          {localStorage.profilePhoto !== "null" ? (
            <img
              src={`data:;base64,${this.state.profilePhoto}`}
              alt=""
              className="rounded-circle mt-2 mb-3"
              style={{ objectFit: "cover", width: "200px", height: "200px" }}
            />
          ) : null}
          <br />
          <input
            type="file"
            onChange={this.handleFileChange}
            accept="image/png, image/jpg, image/jpeg"
          />
        </div>

        <div className="form-floating mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="floatingInputUsername"
            placeholder="Enter your name"
            onChange={this.handleChange}
            value={this.state.name}
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
            value={this.state.email}
            placeholder="name@example.com"
            onChange={this.handleChange}
          />
          {emailError}
        </div>

        <div className=" mb-3">
          <label>
            Phone number <em>(optional)</em>
          </label>
          <PhoneInput
            name="phone"
            country={"ie"}
            placeholder="Enter phone number"
            value={this.state.phone}
            onChange={(phone) => this.setState({ phone })}
            inputStyle={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
            }}
          />
          {phoneError}
        </div>

        <div className="d-grid mb-2">
          <button
            className="btn btn-primary fw-bold mt-4"
            onClick={this.handleSubmit}
            disabled={!inputsAreAllValid}
          >
            Save Changes
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(Profile);
