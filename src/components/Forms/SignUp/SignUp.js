import React, { Component } from "react";
import Background from "../../../hoc/Background/Background";
import axios from "axios";
import Recaptcha from "react-google-invisible-recaptcha";
import adggif from "../../../assets/img/adggif.gif";
import { Link } from "react-router-dom";

export class SignUp extends Component {
	state = {
		firstPage: true,
		name: "",
		regno: "",
		email: "",
		phone: "",
		yearofstudy: 1,
		password: "",
		confirmPass: "",
		github: "",
		nameError: "",
		regError: "",
		emailError: "",
		passError: "",
		confirmPassError: "",
		phoneError: "",
		gitError: "",
		err: "",
		showPass: false,
		showCPass: false,
		loading: false,
		verificationPage: false,
		cooldown: 60,
	};

	validate = () => {
		let nameError = "";
		let regError = "";
		let passError = "";
		let confirmPassError = "";
		var regPattern = /^[2][1][A-Za-z][A-Za-z][A-Za-z]\d{4}$/;
		var regPatternSoph = /^[2][0][A-Za-z][A-Za-z][A-Za-z]\d{4}$/;

		if (!this.state.name) {
			nameError = "Name cannot be left empty";
		}

		if (!this.state.regno) {
			regError = "Registration Number cannot be left empty";
		} else if (!regPattern.test(this.state.regno)) {
			regError = "Enter a valid Registration Number";
		}

		if (regPatternSoph.test(this.state.regno)) {
			this.setState({ yearofstudy: 2 });
		}

		if (!this.state.password) {
			passError = "Password cannot be left empty";
		} else if (this.state.password.length < 8) {
			passError = "Password length must be greater than 8 characters";
		}

		if (this.state.password && !this.state.confirmPass) {
			confirmPassError = "Confirm Password cannot be left empty";
		} else if (this.state.password !== this.state.confirmPass) {
			confirmPassError = "The entered passwords do not match";
		}

		if (nameError || regError || passError || confirmPassError) {
			this.setState({ nameError, regError, passError, confirmPassError });
			return false;
		}

		return true;
	};

	validate2 = () => {
		let emailError = "";
		let phoneError = "";
		let gitError = "";
		var re = /^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@vitstudent.ac.in$/;

		if (!this.state.email) {
			emailError = "Email field cannot be left empty";
		} else if (!re.test(this.state.email)) {
			emailError = "Enter a valid VIT Email ID";
		}

		if (!this.state.phone) {
			phoneError = "Enter a valid Mobile Number";
		} else if (this.state.phone.length !== 10) {
			phoneError = "Mobile Number should be 10 digits long";
		}

		if (this.state.yearofstudy === 2) {
			if (!this.state.github) {
				gitError = "GitHub Link is mandatory for 2nd year students";
			}
		}

		if (emailError || phoneError || gitError) {
			this.setState({ emailError, phoneError, gitError });
			return false;
		}

		return true;
	};

	createAccountClickHandler = (event) => {
		event.preventDefault();
		this.validate();
		if (this.validate()) {
			this.setState({
				firstPage: false,
				nameError: "",
				confirmPassError: "",
				passError: "",
				regError: "",
			});
		}
	};
	inputChangeHandler = (e, s) => {
		this.setState({ [s]: e.target.value });
	};
	formSubmitHandler = (e, a) => {
		this.validate2();

		// console.log(this.state.yearofstudy);

		if (this.validate2()) {
			this.recaptcha.execute();
			this.setState({ verificationPage: true });
		} else {
			this.recaptcha.reset();
		}
	};
	componentDidMount() {
		if (sessionStorage.getItem("Token")) {
			this.props.history.replace("/selection");
		}
	}
	eyeClickHandler = () => {
		this.setState({ showPass: !this.state.showPass });
	};
	eyeClickHandlerC = () => {
		this.setState({ showCPass: !this.state.showCPass });
	};
	onResolved = (a) => {
		// alert( 'Recaptcha resolved with response: ' + this.recaptcha.getResponse() );
		const data = JSON.stringify({
			name: this.state.name,
			regno: this.state.regno,
			email: this.state.email,
			phone: this.state.phone,
			yearofstudy: this.state.yearofstudy,
			password: this.state.password,
			githubLink: this.state.github,
		});
		var config = {
			method: "post",
			url: "https://recruitment2022.herokuapp.com/user/signup",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		this.setState({ loading: true });
		axios(config)
			.then((response) => {
				// console.log(JSON.stringify(response.data));
				this.setState({ loading: false });
				// a.history.push("/login");
			})
			.catch((error) => {
				alert(error.response.data.message);
				this.setState({ loading: false });
				// console.log(error.success);
			});
	};

	resendVerification = () => {
		const data = JSON.stringify({
			email: this.state.email,
		});
		var config = {
			method: "post",
			url: "https://recruitment22.herokuapp.com/user/resendverification",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios(config)
			.then((response) => {
				// console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				alert(error?.response?.data?.message);
				// console.log(error.success);
			});
	};

	countdown = () => {
		let cooldownTimer = setInterval(() => {
			this.setState({ cooldown: this.state.cooldown - 1 });
			if (this.state.cooldown <= 0) {
				this.setState({ cooldown: 0 });
				clearInterval(cooldownTimer);
			}
		}, 1000);
	};

	render() {
		const loader = (
			<div className="loader">
				<img src={adggif} alt="ADG gif loader" />
			</div>
		);
		if (this.state.loading) {
			return <Background>{loader}</Background>;
		}
		return (
			<>
				<Background>
					<form autoComplete="false">
						{!this.state.verificationPage ? (
							this.state.firstPage ? (
								<div>
									<div className="heading">Sign Up</div>
									<div className="input-grp">
										<label>Name</label>

										<input
											className="input name-input"
											type="text"
											value={this.state.name}
											placeholder="Enter your name"
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"name"
												);
											}}
										/>
									</div>
									{this.state.nameError ? (
										<div className="error">
											{this.state.nameError}
										</div>
									) : null}
									<div className="input-grp ">
										<label>Registration Number</label>
										<input
											autoComplete="off"
											onFocus={this.onFocus}
											className="input t-uc"
											value={this.state.regno}
											type="text"
											placeholder="Enter Registration Number"
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"regno"
												);
											}}
										/>
									</div>
									{this.state.regError ? (
										<div className="error">
											{this.state.regError}
										</div>
									) : null}
									<div className="input-grp">
										<label>Password</label>
										<input
											className="input"
											type={`${
												this.state.showPass
													? "text"
													: "password"
											}`}
											style={{
												marginBottom: 10,
												position: "relative",
											}}
											value={this.state.password}
											placeholder="Enter Your Password"
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"password"
												);
											}}
										/>
										<div
											className={`lgn-eye ${
												this.state.showPass
													? "lgn-eye-t"
													: null
											}`}
											onClick={this.eyeClickHandler}
										>
											<i className={`fas fa-eye  `}></i>
										</div>
									</div>
									{this.state.passError ? (
										<div className="error">
											{this.state.passError}
										</div>
									) : null}
									<div className="input-grp">
										<label>Confirm Password</label>
										<input
											className="input"
											type={`${
												this.state.showCPass
													? "text"
													: "password"
											}`}
											style={{
												marginBottom: 10,
												position: "relative",
											}}
											value={this.state.confirmPass}
											placeholder="Confirm Password"
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"confirmPass"
												);
											}}
										/>
										<div
											className={`lgn-eye ${
												this.state.showCPass
													? "lgn-eye-t"
													: null
											}`}
											onClick={this.eyeClickHandlerC}
										>
											<i className={`fas fa-eye  `}></i>
										</div>
									</div>
									{this.state.confirmPassError ? (
										<div className="error">
											{this.state.confirmPassError}
										</div>
									) : null}
									<div
										className="btn btn-blue lgn-btn"
										onClick={this.createAccountClickHandler}
									>
										Next
									</div>
								</div>
							) : (
								<div>
									<div className="heading">Sign Up</div>
									<div className="input-grp">
										<label>Phone Number</label>
										<input
											className="input"
											type="text"
											value={this.state.phone}
											placeholder="Enter Your Phone Number"
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"phone"
												);
											}}
										/>
									</div>
									{this.state.phoneError ? (
										<div className="error">
											{this.state.phoneError}
										</div>
									) : null}
									<div className="input-grp">
										<label>VIT Email</label>
										<input
											className="input"
											type="text"
											value={this.state.email}
											placeholder="Enter Your VIT Email"
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"email"
												);
											}}
										/>
									</div>
									{this.state.emailError ? (
										<div className="error">
											{this.state.emailError}
										</div>
									) : null}
									<div className="input-grp">
										<label>
											GitHub Link (Mandatory for 2nd year
											students)
										</label>
										<input
											className="input"
											type="text"
											value={this.state.github}
											placeholder="Enter Your GitHub Handle"
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"github"
												);
											}}
										/>
									</div>
									{this.state.gitError ? (
										<div className="error">
											{this.state.gitError}
										</div>
									) : null}
									<div style={{ display: "flex" }}>
										<div
											className="btn btn-blue lgn-btn"
											onClick={(event) => {
												this.formSubmitHandler(
													event,
													this.props
												);
												this.setState({ cooldown: 0 });
											}}
										>
											Sign Up
										</div>
										<div
											className="btn btn-blue lgn-btn"
											onClick={() =>
												this.setState({
													firstPage: true,
													emailError: "",
													phoneError: "",
													gitError: "",
												})
											}
										>
											{/* <i
                      className="fas fa-arrow-left"
                      style={{ marginRight: "0.5em" }}></i> */}
											Go Back
										</div>
									</div>
								</div>
							)
						) : (
							<div>
								<div className="heading">You are all set</div>
								<div className="sub-heading">
									Verification mail sent
								</div>
								<div style={{ display: "flex" }}>
									<button
										disabled={!!this.state.cooldown}
										type="button"
										className="btn btn-blue lgn-btn"
										onClick={(event) => {
											this.setState({ cooldown: 60 });
											this.resendVerification();
											this.countdown();
										}}
									>
										{this.state.cooldown > 0
											? this.state.cooldown
											: "Resend mail"}
									</button>
									<Link
										to="/login"
										className="btn btn-blue lgn-btn"
									>
										Log In
									</Link>
								</div>
							</div>
						)}
					</form>
				</Background>
				<Recaptcha
					ref={(ref) => (this.recaptcha = ref)}
					sitekey="6LerFBIaAAAAAPrLv6zWVFAZ7VQYGE8DfbUXyt8r
"
					onResolved={() => this.onResolved(this.props)}
					onError={() => {
						alert(
							"Captcha Error : Please refresh site and try again"
						);
					}}
				/>
			</>
		);
	}
}

export default SignUp;
