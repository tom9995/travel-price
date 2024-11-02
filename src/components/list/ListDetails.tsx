// import React from "react";
import "./ListDetails.scss";

import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import ListHeader from "./ListHeader";

export default function ListDetails() {
  const signInUser = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(signInUser);
    // 未ログインならTOPに戻る
    if (signInUser == null) {
      navigate("/");
    }
  }, []);
  return (
    <div className="list-details-container">
      <div className="list-details-header-container">
        <ListHeader name="詳細" />
      </div>
      <div className="list-details-body-container">ListDetails</div>
    </div>
  );
}
