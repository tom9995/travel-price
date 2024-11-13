// import React from "react";
import { useState } from "react";
import "./Top.scss";
import { useAppDispatch } from "../../app/hooks";
import { signIn } from "../../features/UserSlice";
import { authRepository } from "../../repositories/auth";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export default function Top() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const currentUser = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    // ログイン
    const signInUser = await authRepository.signin(email, password);
    // stateの更新
    setEmail("");
    setPassword("");
    if (signInUser.email) {
      dispatch(
        signIn({
          email: signInUser.email,
          // password:signInUser.password,
        })
      );
      navigate("/list");
    } else {
      window.alert("ログインに失敗しました");
    }
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="top-container">
      <div className="top-header-container">
        <div className="icon-container">
          <FlightTakeoffIcon className="airplane-icon" />
        </div>
        <div className="top-text-container">Travel Expense Manager</div>
      </div>
      <div className="top-container-flame">
        <div className="form-container">
          <div className="email-container">
            <div>email</div>
            <TextField
              className="email-input"
              variant="standard"
              type="text"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            ></TextField>
          </div>
          <div className="password-container">
            <div>password</div>
            <TextField
              className="password-input"
              variant="standard"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            ></TextField>
          </div>
          <Button className="login-button" onClick={handleLogin}>
            ログイン
          </Button>
          <div className="signup-link-container" onClick={handleNavigateSignUp}>
            未登録の方はこちら
          </div>
        </div>
      </div>
    </div>
  );
}
