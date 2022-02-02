import React from "react";
import { Link } from "react-router-dom";
import Portal from "../Portal.svg";
import Button from "../Inputs/Button";
import back_img from "../back_img_main.svg";
import Background from "../../../hoc/Background/Background";

const Landing = (props) => {
	if (sessionStorage.getItem("Token")) {
		props.history.replace("/selection");
	}
	return (
		<Background>
			<div className="landing_page">
				<div className="left">
					<div className="info">
						<h1>ADG VIT</h1>
						<p className="heading1">Recruitments</p>
						<img src={Portal} alt="Portal" className="portal_img" />
						<p className="para">
							Have a dream to become techie? Let's begin now.
						</p>
						<Link to="/signup">
							<Button class="btn1" heading="Create an Account" />
						</Link>
						<Link to="/login">
							<Button class="btn2" heading="Login" />
						</Link>
					</div>
				</div>
				<div className="right">
					{/* <p className="hi">hi</p> */}
					<img alt="background" src={back_img} />
				</div>
			</div>
		</Background>
	);
};
export default Landing;
