/* eslint-disable react/button-has-type */
import React from "react";
import "./Button.css";

function Button(props) {
	return (
		<>
			{props.loading ? (
				<button className={props.class} disabled={props.disable}>
					<i class="fa fa-circle-o-notch fa-spin"></i>
				</button>
			) : (
				<button className={props.class} disabled={props.disable}>
					{props.heading}
				</button>
			)}
		</>
	);
}

export default Button;
