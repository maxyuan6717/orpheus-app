import { useState } from "react";
import styles from "./register.module.css";
import styled from "styled-components";
import Button from "../components/button";
import { registerUser } from "../util/api";
import { useParams, useHistory } from "react-router-dom";

const Register = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
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
        res = await registerUser(id, name, password1, password2);
        if (res.data && res.data.success) {
          history.push(`/${id}/`);
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
        <div className="header">Create Account</div>
        <div>
          <div className="subheader">First Name</div>
          <input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="subheader">Enter a Password</div>
          <input
            type="password"
            placeholder="Password"
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="subheader">Confirm Your Password</div>
          <input
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
        <div>{err.length > 0 && err}</div>
      </div>
    </div>
  );
};

export default Register;
