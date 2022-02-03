import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Domain.css";
import Background from "../../../hoc/Background/Background";
import axios from "axios";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Redirect } from "react-router-dom";

const DomainPage = (props) => {
  // let secondYr;

  if (!sessionStorage.getItem("Token")) {
    props.history.replace("/");
  }
  const [userDetails, setUserDetails] = useState("");
  const [domain, setDomain] = useState(false);
  const [tech, setTech] = useState(true);
  const [man, setMan] = useState(true);
  const [des, setDes] = useState(true);
  const [tech2, setTech2] = useState(false);
  const [man2, setMan2] = useState(false);
  const [des2, setDes2] = useState(false);

  let domainValue = (event) => {
    if (
      userDetails["userDetails"]["yearofstudy"] === 2 &&
      event.target.value === "Technical"
    ) {
      setDomain("Technical2");
    } else setDomain(event.target.value);
    // secondYr= false;
  };

  const linkTo = {
    pathname: "/instructions",
    param: domain,
  };

  useEffect(() => {
    var config = {
      headers: {
        "auth-token": sessionStorage.getItem("Token"),
      },
    };
    axios
      .get("https://recruitment2022.herokuapp.com/user/getuser", config)
      .then(function (response) {
        console.log(response);
        setUserDetails(response.data);
        setTech(response.data.userDetails.attemptedTechnical);
        setMan(response.data.userDetails.attemptedManagement);
        setDes(response.data.userDetails.attemptedDesign);
        setTech2(response.data.userDetails.attemptedTechnical);
        setMan2(response.data.userDetails.attemptedManagement);
        setDes2(response.data.userDetails.attemptedDesign);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }, []);

  // console.log(props);
  if(tech2 && man2 && des2 ){
    return(
      <Redirect to="/thank-you" />
    )
  } else {
    return (
      <Background>
        <div className="domainPage">
        <div className="mainForm">
          <h1 className="heading">Choose a Domain</h1>
          <p className="para">Select a domain and Start Test for Round 1</p>
          <div className="domains">
            <div onChange={domainValue}>
                <div className={tech ? 'domainRowDead' : 'domainRow'}>
                  <PrecisionManufacturingIcon style={{ fontSize: 55 }} />
                  <div className="info">
                    <h1 className="heading">Technical</h1>
                    <p className="para">10 Questions . 10 mins . Objective Type</p>
                  </div>
                    <input
                      type='radio' value='Technical' name='selection' id='technical' disabled={tech}></input>
                </div>
                
                <div className={man ? 'domainRowDead' : 'domainRow'}>
                    <AssessmentIcon style={{ fontSize: 55 }} />
                  <div className="info">
                    <h1 className="heading">Management</h1>
                    <p className="para">5 Questions . No Time . Subjective Type</p>
                  </div>
                    <input
                      type='radio'
                      value='Management'
                      name='selection'
                      id='management'
                      disabled={man}
                      className="input"></input>
                </div>
                <div className={des ? 'domainRowDead' : 'domainRow'}>
                  <ColorLensIcon style={{ fontSize: 55 }} />
                  <div className="info">
                    <h1 className="heading">Design</h1>
                    <p className="para">10 Questions . 10 mins . Objective Type</p>
                  </div>
                   <input
                      type='radio'
                      value='Design'
                      name='selection'
                      id='design'
                      disabled={des}
                      className="input"></input>
                    </div>
                
            
            
          </div>
          </div>
         
          <Link
            to={linkTo}
            className={`domainbtn1 ${domain ? "" : "btn1_disabled"}`}>
            Start Quiz
            </Link>
             </div>
          </div>
         
      </Background>
    );
  }
};
export default DomainPage;
