// import React from "react";
import { useEffect, useState } from "react";
import "./Top.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signIn } from "../../features/UserSlice";
import { authRepository } from "../../repositories/auth";
import { useNavigate } from "react-router-dom";

export default function Top() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    // ログイン
    const signInUser = await authRepository.signin(email, password);
    console.log(signInUser);
    // stateの更新
    setEmail("");
    setPassword("");
    if (signInUser.userName) {
      dispatch(
        signIn({
          email: signInUser.email,
          // password:signInUser.password,
        })
      );
      // console.log("clicked");
      navigate("/list");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="top-container">
      <div className="image-container">
        <img src="./icon.png" />
      </div>
      <div className="form-container">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
        ></input>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        ></input>
        <button className="login-button" onClick={handleLogin}>
          ログイン
        </button>
      </div>
      <div className="signup-link-container" onClick={handleNavigateSignUp}>
        未登録の方はこちら
      </div>
    </div>
  );
}
