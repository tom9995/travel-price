import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import "./List.scss";
import ListHeader from "./ListHeader";

const list = ["a", "b", "c"];

export default function List() {
  const signInUser = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(signInUser);
    // 未ログインならTOPに戻る
    if (signInUser == null) {
      navigate("/");
    }
  }, []);

  const handleListClick = () => {
    navigate("/ListDetails");
  };

  return (
    <div className="list-container">
      <ListHeader name="一覧" />
      <div className="list-body-container">
        <div className="list-form-container">
          <input
            className="list-form-input"
            type="text"
            placeholder="name"
          ></input>
          <button className="list-form-button">追加</button>
        </div>
        <ul>
          {list.map((item, index) => (
            <li onClick={handleListClick}>{index + 1} </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
