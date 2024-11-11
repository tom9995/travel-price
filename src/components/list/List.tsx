import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import "./List.scss";
import ListHeader from "./ListHeader";
import { travelRepository } from "../../repositories/travel";
import { Button, TextField } from "@mui/material";

type Travel = {
  travel_id: number;
  travel_name: string;
  created_at: string;
};

export default function List() {
  const [travelNameInput, setTravelNameInput] = useState("");
  const [travelList, setTravelList] = useState<Travel[]>([]);
  const signInUser = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    // 未ログインならTOPに戻る
    if (signInUser == null) {
      navigate("/");
    }
    // 過去の旅行すべて取得（ユーザーで絞っていない）
    fetchTravelList();
    // console.log("fetched");
  }, []);

  const fetchTravelList = async () => {
    const newTravelList = await travelRepository.getAllTravel();
    // console.log(newTravelList);
    setTravelList(newTravelList);
  };

  const handleListClick = (e: any) => {
    // console.log(e);
    navigate("/listDetails", {
      state: { travelId: e.target.value, travelName: e.target?.innerText },
    });
  };

  const handleChangeTravelNameInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTravelNameInput(e.target.value);
  };

  const handleAddTravel = async () => {
    await travelRepository.create(travelNameInput);
    fetchTravelList();
    // console.log(addedTravel);
    setTravelNameInput("");
  };

  return (
    <div className="list-container">
      <ListHeader name="一覧" />
      <div className="list-body-container">
        <div className="list-form-container">
          <div className="travel-name-container">
            <div className="list-from-travel-name">旅名</div>
            <TextField
              variant="standard"
              className="list-form-input"
              type="text"
              placeholder="Enter travel name"
              value={travelNameInput}
              onChange={(e) => handleChangeTravelNameInput(e)}
            />

            <Button className="list-form-button" onClick={handleAddTravel}>
              追加
            </Button>
          </div>
          {/* <input
            className="list-form-input"
            type="text"
            placeholder="旅名"
            value={travelNameInput}
            onChange={(e) => handleChangeTravelNameInput(e)}
          ></input> */}
          {/* <button className="list-form-button" onClick={handleAddTravel}>
            追加
          </button> */}
        </div>
        <div className="travel-list-container">
          <ul>
            {travelList.map((travel) => (
              <li
                key={travel.travel_id}
                value={travel.travel_id}
                onClick={(e) => handleListClick(e)}
                className="travel-list-content"
              >
                {travel?.travel_name}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
