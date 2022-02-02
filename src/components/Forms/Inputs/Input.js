/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import "./Input.css";
import cross from "../images/cross.svg";

function Input(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <label htmlFor={props.heading}>{props.heading}<span className="optional">{props.optional}</span></label>
      <div className="enclosing_div">
        <input
          onFocus={() => {
            setShow(true);
          }}
          onBlur={() => {
            setShow(false);
          }}
          className={props.class}
          onChange={(e) => {
            props.change(e);
          }}
          value={props.val}
          type={props.type}
          id={props.heading}
          name={props.heading}
          placeholder={props.placeholder}
          required
        />
        {/* {show && (
          <img
            className="cross"
            alt="cross"
            onClick={()=>{}}
            src={cross}
          />
        )} */}
      </div>
    </>
  );
}

export default Input;
