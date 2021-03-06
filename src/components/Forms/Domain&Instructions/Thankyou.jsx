import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.module.css";
import "../../Quiz/Quiz.css";
import Background from "../../../hoc/Background/Background";
import instagram from "../../../assets/img/instagram.png";

const ThankYou = () => {
  const [tech, setTech] = useState(true);
  const [man, setMan] = useState(true);
  const [des, setDes] = useState(true);
  useEffect(() => {
    var config = {
      headers: {
        "auth-token": sessionStorage.getItem("Token"),
      },
    };
    axios
      .get("https://recruitment2022.herokuapp.com/user/getuser", config)
      .then(function (response) {
        // console.log(response.data);
        setTech(response.data.userDetails.attemptedTechnical);
        setMan(response.data.userDetails.attemptedManagement);
        setDes(response.data.userDetails.attemptedDesign);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }, []);
  if (tech && man && des) {
    return (
      <Background>
        <div className="wrapper">
          <h2>You have attempted all the tests</h2>
          <div className='sub-heading'>Stay connected to know your result</div>
          <hr></hr>
          <div className="iconContainer">
            <p>For regular updates, follow us on:</p>
           
            <a
              className='social-url'
              rel='noreferrer'
              target='_blank'
              href='https://www.instagram.com/adgvit'>
               <img src={instagram} alt='instagram' className="icons" />
              <p>@adgvit</p>
            </a>
          </div>
        </div>
      </Background>
    );
  } else {
    return (
      <Background>
        <div className="wrapper">
          <h2>Your responses have been saved!</h2>
          <div className='sub-heading'>
            You can attempt a quiz from other domains if you haven't
          </div>
          <Link to='/selection'>
            <button className="btn1">
              Attempt another quiz
            </button>
          </Link>
        </div>
      </Background>
    );
  }
};
export default ThankYou;
