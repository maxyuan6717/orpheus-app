import { useState } from "react";
import styles from "./register.module.css";
import styled from "styled-components";
import Button from "../components/button";
import { registerUser } from "../util/api";
import { useHistory } from "react-router-dom";
import { StyledInput } from "../common/styledcomponents";
import ReactGA from "react-ga";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");
  const history = useHistory();
  const handleSubmit = async () => {
    if (name.length === 0 || password1.length === 0 || password2.length === 0) {
      setErr("Please fill in all fields");
      setTimeout(() => {
        setErr("");
      }, 2000);
    } else if (!email.includes("@")) {
      setErr("Please enter a valid email");
      setTimeout(() => {
        setErr("");
      }, 2000);
    } else if (password1 !== password2) {
      setErr("Make sure your passwords match");
      setTimeout(() => {
        setErr("");
      }, 2000);
    } else if (password1.length < 6) {
      setErr("Password needs to be at least 6 characters long");
      setTimeout(() => {
        setErr("");
      }, 2000);
    } else {
      let res;
      try {
        res = await registerUser(email, name, password1, password2);
        if (res.data && res.data.success) {
          ReactGA.event({
            category: "Register",
            action: "Registered",
          });
          history.push(`/`);
        }
      } catch (error) {
        setErr(error.response.data.err);
        setTimeout(() => {
          setErr("");
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="header mb-5">Create Account</div>
        <div className="mb-3">
          <div className="subheader">Email</div>
          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <div className="subheader">First Name</div>
          <StyledInput
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <div className="subheader">Enter a Password</div>
          <StyledInput
            type="password"
            placeholder="Password"
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <div className="subheader">Confirm Your Password</div>
          <StyledInput
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <Button
          type="link"
          height="3rem"
          text="Create"
          onClick={handleSubmit}
        />
        <div>{err && err.length > 0 ? err : null}</div>
      </div>
    </div>
  );
};

export default Register;
