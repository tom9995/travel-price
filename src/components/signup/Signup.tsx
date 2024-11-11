import { useState } from "react";
import { authRepository } from "../../repositories/auth";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    console.log("signup");
    await authRepository.signup(name, email, password);
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
      <div className="sign-up-image-container">
        <img src="./icon.png" />
      </div>
      <div className="signup-form-container">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <button onClick={handleSignup}>登録</button>
      </div>
      <div className="top-navigater-container" onClick={handleClick}>
        ログイン画面へ
      </div>
    </div>
  );
}
