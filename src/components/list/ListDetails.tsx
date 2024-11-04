// import React from "react";
import "./ListDetails.scss";
import "./List.scss";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import ListHeader from "./ListHeader";

export default function ListDetails() {
  const location = useLocation();
  const signInUser = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { travelName } = location.state ?? "詳細";
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
        <ListHeader name={travelName} />
      </div>
      <div className="list-details-body-container">ListDetails</div>
    </div>
  );
}
