import React, { useState } from "react";
import "./TextArea.css";
import cross from "../images/cross.svg";

function TextArea(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <label htmlFor={props.heading}>
        {props.heading}
        <span className="optional">{props.optional}</span>
      </label>
      <div className="enclosing_div">
        <textarea
          onFocus={() => {
            setShow(true);
          }}
          onBlur={() => {
            setShow(false);
          }}
          className="textarea input"
          placeholder="Enter your text here..."
          onChange={(e) => {
            props.change(e);
          }}
        ></textarea>
        {/* {show && (
            <img
              className="cross"
              alt="cross"
              onClick={(e)=>{
                ("Hi")
                e.preventDefault();}}
              src={cross}
            />
          )} */}
      </div>
    </>
  );
}

export default TextArea;
