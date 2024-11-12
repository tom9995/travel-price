import { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Button, TextField } from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    window.alert("登録は受け付けていません");
    // 登録用処理
    // await authRepository.signup(name, email, password);
    setName("");
    setEmail("");
    setPassword("");

    navigate("/");
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-header-container">
        <div className="icon-container">
          <FlightTakeoffIcon className="airplane-icon" />
        </div>
        <div className="signup-text-container">Travel Expense Manager</div>
      </div>
      <div className="signup-container-flame">
        <div className="signup-form-container">
          <div className="name-container">
            <div>name</div>
            <TextField
              className="name-input"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              variant="standard"
            ></TextField>
          </div>
          <div className="email-container">
            <div>email</div>
            <TextField
              className="email-input"
              type="text"
              placeholder="Enter your e-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="standard"
            ></TextField>
          </div>
          <div className="password-container">
            <div>password</div>
            <TextField
              className="password-input"
              type="text"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              variant="standard"
            ></TextField>
          </div>
          <Button className="signup-button" onClick={handleSignup}>
            登録
          </Button>
          <div className="top-navigater-container" onClick={handleClick}>
            ログイン画面へ
          </div>
        </div>
      </div>
    </div>
  );
}
