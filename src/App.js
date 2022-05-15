import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import React, { useState } from "react";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

function App() {
  const [getState, setState] = useState(true);
  const [getNo, setNo] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyBjmao3OGcbWLFxeOEucG70CoYWucDumtA",
    authDomain: "tali-ad785.firebaseapp.com",
    projectId: "tali-ad785",
    storageBucket: "tali-ad785.appspot.com",
    messagingSenderId: "416320356626",
    appId: "1:416320356626:web:39b85226866d3232bbb3cb",
    measurementId: "G-FEBYK9905B",
  };

  const app = initializeApp(firebaseConfig);

  const clickHandle = () => {
    setState(false);
    const auth = getAuth();
    auth.languageCode = "en";

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          console.log(response);
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );

    const phoneNumber = "+" + getNo;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log(confirmationResult);
        let code = prompt("Enter OTP Code", "");
        confirmationResult
          .confirm(code)
          .then((res) => {
            console.log(res);
            alert("Phone Number is verified");
            window.location.reload();
          })
          .catch((error) => {
            alert("Something Went Worng");
          });
        // ...
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Worng");
        // Error; SMS not sent
        // ...
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Phone Number Verfication OTP Testing</p>

        {getState == true ? (
          <div className="d-block">
            <div className = "mb-3">
              <input className="form-control" placeholder = "(Country Code) Phone Number" type = "number" onChange = {(e) => {setNo(e.target.value)}}/>
            </div>

            <div className="mb-3">
              <button className="btn btn-success" onClick={clickHandle}>
                Click Here for Recaptcha Verification
              </button>
            </div>
          </div>
        ) : null}

        <div id="recaptcha-container"></div>
      </header>
    </div>
  );
}

export default App;
