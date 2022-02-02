import React, { Component } from "react";
import Background from "../../../../hoc/Background/Background";
import axios from "axios";
import Recaptcha from "react-google-invisible-recaptcha";
import adggif from "../../../../assets/img/adggif.gif";
import back_img from "../../back_img_main.svg";
import { Link } from "react-router-dom";

export class ForgotPassword extends Component {
	state = {
		firstPage: true,
		email: "",
		emailErr: "",
		otp: "",
		otpErr: "",
		newPassword: "",
		newPasswordErr: "",
		confirmPassword: "",
		confirmPasswordErr: "",
		err: "",
		cooldown: 60,
		loading: false,
	};
	forgotPasswordClickHandler = (event) => {
		event.preventDefault();
		var re = /^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@vitstudent.ac.in$/;

		if (this.state.email === "") {
			this.setState({ emailErr: "Please enter your Email ID" });
			return;
		} else if (!re.test(this.state.email)) {
			this.setState({ emailErr: "Enter a valid Email ID" });
			return;
		}
		const data = JSON.stringify({
			email: this.state.email,
		});
		const config = {
			method: "post",
			url: "https://recruitment2022.herokuapp.com/user/resetpassword",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};
		this.setState({ loading: true });

		axios(config)
			.then((response) => {
				// console.log(response.data);
				this.setState({ firstPage: false });
				this.setState({ loading: false });
			})
			.catch((error) => {
				// console.log(error.response.data);
				this.setState({ loading: false });
				this.setState({ emailErr: error.response.data.message });
			});
	};
	inputChangeHandler = (e, s) => {
		this.setState({ [s]: e.target.value });
	};
	formSubmitHandler = (e, a) => {
		e.preventDefault();

		this.setState({
			otpErr: "",
		});

		if (!this.state.otp) {
			this.setState({
				otpErr: "Enter valid OTP",
			});
		}

		if (this.state.newPassword.length < 8) {
			this.setState({
				newPasswordErr: "Password must be at least 8 characters",
			});
			this.recaptcha.reset();
			return;
		}
		if (this.state.newPassword !== this.state.confirmPassword) {
			this.setState({ confirmPasswordErr: "Passwords must match" });
			this.recaptcha.reset();
			return;
		} else {
			this.recaptcha.execute();
		}
	};
	onResolved = (a) => {
		// alert( 'Recaptcha resolved with response: ' + this.recaptcha.getResponse() );
		const data = JSON.stringify({
			// email: this.state.email,
			otp: this.state.otp,
			password: this.state.newPassword,
			// confirmPassword: this.state.confirmPassword,
		});
		const config = {
			method: "PUT",
			url: "https://recruitment2022.herokuapp.com/user/updatepassword",
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				// console.log(JSON.stringify(response.data));
				a.history.push("/login");
			})
			.catch(function (error) {
				// console.log(error);
				alert(error.response.data.message);
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
					<form
						onSubmit={(event) => {
							event.preventDefault();
						}}
					>
						{this.state.firstPage ? (
							<div className="login_page">
								<div className="left">
									<div className="main_form">
										<h1 className="heading">
											Forgot Password?
										</h1>
										<p className="para">
											Dont worry, we got your back!
										</p>
										<input
											className="input"
											type="text"
											placeholder="Enter Email"
											value={this.state.email}
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"email"
												);
											}}
										/>
										{this.state.messageErr !== "" && (
											<div className="error">
												{this.state.emailErr}
											</div>
										)}

										<div
											className="btn1"
											onClick={(event) => {
												event.preventDefault();
												this.forgotPasswordClickHandler(
													event
												);
												this.countdown();
												this.setState({ cooldown: 0 });
											}}
										>
											Send OTP
										</div>

										<p className="bottom">
											<Link to="/login">
												<span className="tosignup">
													{" "}
													Back to Login
												</span>
											</Link>
										</p>
									</div>
								</div>
								<div className="right">
									<img alt="background" src={back_img} />
								</div>
							</div>
						) : (
							<div className="login_page">
								<div className="left">
									<div className="main_form">
										<h1 className="heading">
											Change your Password
										</h1>
										{/* <p className="para">
											Just enter a few details and you are
											good!
										</p> */}
										<input
											className="input"
											type="number"
											placeholder="Enter OTP"
											value={this.state.otp}
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"otp"
												);
											}}
										/>
										{this.state.otpErr !== "" && (
											<div className="error">
												{this.state.otpErr}
											</div>
										)}

										<input
											className="input"
											type="password"
											placeholder="Enter Password"
											value={this.state.newPassword}
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"newPassword"
												);
											}}
										/>
										{this.state.newPasswordErr !== "" && (
											<div className="error">
												{this.state.newPasswordErr}
											</div>
										)}
										<input
											className="input"
											type="password"
											placeholder="Confirm Password"
											value={this.state.confirmPassword}
											onChange={(event) => {
												this.inputChangeHandler(
													event,
													"confirmPassword"
												);
											}}
										/>
										{this.state.confirmPasswordErr !==
											"" && (
											<div className="error">
												{this.state.confirmPasswordErr}
											</div>
										)}

										<div
											className="btn1"
											onClick={(event) => {
												event.preventDefault();
												this.formSubmitHandler(
													event,
													this.props
												);
											}}
										>
											Change Password
										</div>
										<br />
										<button
											disabled={!!this.state.cooldown}
											className="btn2"
											onClick={(event) => {
												event.preventDefault();
												this.setState({ cooldown: 60 });
												this.forgotPasswordClickHandler(
													event
												);
												this.countdown();
											}}
										>
											{this.state.cooldown > 0
												? this.state.cooldown
												: "Resend OTP"}
										</button>
									</div>
								</div>
								<div className="right">
									<img alt="background" src={back_img} />
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

export default ForgotPassword;
