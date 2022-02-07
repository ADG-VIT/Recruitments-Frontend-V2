import Background from "../../../../hoc/Background/Background";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Recaptcha from "react-google-invisible-recaptcha";
import adggif from "../../../../assets/img/adggif.gif";
import adglogo from "../../../../assets/img/adg_logo.svg";
import back_img from "../../back_img_main.svg";
// import Button from "../../Inputs/Button";
// import Input from "../../Inputs/Input";

export class Login extends Component {
	state = {
		regno: "",
		password: "",
		regError: "",
		passError: "",
		showPass: false,
		err: "",
		value: "",
		loading: false,
	};

	validate = () => {
		let regError = "";
		let passError = "";
		var regPattern = /^[2][01][A-Z][A-Z][A-Z]\d{4}$/;
		console.log(this.state.regno);
		// console.log(this.state.regno);
		console.log(this.state.password);
		if (!this.state.regno) {
			regError = "Enter Registration Number";
		} else if (!regPattern.test(this.state.regno.trim())) {
			regError = "Enter a valid Registration Number";
		}

		if (!this.state.password) {
			passError = "Enter Password";
		}

		if (regError || passError) {
			this.setState({ regError, passError });
			return false;
		}

		return true;
	};

	inputChangeHandler = (e, s) => {
		this.setState({ [s]: e.target.value });
	};
	formSubmitHandler = (e, a) => {
		this.validate();
		this.setState({ regError: "", passError: "" });
		if (this.validate()) {
			this.recaptcha.execute();
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
	onResolved = (a) => {
		// alert("Recaptcha resolved with response: " + this.recaptcha.getResponse());
		const data = JSON.stringify({
			regno: this.state.regno.trim(),
			password: this.state.password,
		});

		// console.log(data);
		var config = {
			method: "post",
			url: "https://recruitment2022.herokuapp.com/user/login",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			data: data,
			// onUploadProgress: function (progressEvent) {
			//   // let percentCompleted = Math.round(
			//   //   (progressEvent.loaded * 100) / progressEvent.total
			//   // );
			//   // console.log("onUploadProgress", percentCompleted);
			// },
		};

		this.setState({ loading: true });
		axios(config)
			.then((response) => {
				sessionStorage.setItem("Token", response.data.Token);
				// console.log(response.data);
				this.setState({ loading: false });
				a.history.push("/selection");
			})
			.catch((error) => {
				alert(error?.response?.data?.message);
				this.setState({ loading: false });
				// console.log(error);
			});
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
					<div className="login_page">
						<div className="left">
							<div className="main_form">
								<h1 className="heading">Login</h1>
								<p className="para">
									Login with your VIT Registration Number
								</p>
								<input
									className="input"
									type="text"
									placeholder="Enter Registration Number in Uppercase"
									onChange={(event) => {
										this.inputChangeHandler(event, "regno");
									}}
								/>
								{this.state.regError ? (
									<div className="error">
										{this.state.regError}
									</div>
								) : null}
								<input
									className="input"
									type={`${
										this.state.showPass
											? "text"
											: "password"
									}`}
									placeholder="Enter Your Password"
									style={{
										marginBottom: 10,
										position: "relative",
									}}
									onChange={(event) => {
										this.inputChangeHandler(
											event,
											"password"
										);
									}}
								/>
								{this.state.passError ? (
									<div className="error">
										{this.state.passError}
									</div>
								) : null}
								<Link to="/forgotPassword" className="forgot">
									Forgot Password?
								</Link>
								<div
									className="btn1"
									onClick={(event) => {
										this.formSubmitHandler(
											event,
											this.props
										);
									}}
								>
									Log In
								</div>
								<p className="bottom">
									Don’t have an account?{" "}
									<Link to="/signup">
										<span className="tosignup">
											{" "}
											Create One
										</span>
									</Link>
								</p>
							</div>
						</div>
						<div className="right">
							<img alt="background" src={back_img} />
						</div>
					</div>
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

export default Login;
