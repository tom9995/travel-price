import React, { useEffect, useState } from "react";
import "./ListDetails.scss";
import { priceRepository } from "../../../repositories/price";
import { personRepository } from "../../../repositories/person";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { add } from "../../../features/PriceSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

type Person = {
  person_id: number;
  person_name: string;
  created_at: string;
};

type Props = {
  travelId: number;
};

export default function ListDetailPrice(props: Props) {
  const [inputPrice, setInputPrice] = useState<string>("");
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputMemo, setInputMemo] = useState<string>("");
  const [inputPerson, setInputPerson] = useState<string>("");
  const [personList, setPerson] = useState<Person[]>([]);

  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.person.person);
  const prices = useAppSelector((state) => state.price.price);

  useEffect(() => {
    fetchPerson();
  }, [members, prices]);

  const fetchPerson = async () => {
    const personList = await personRepository.getAllPerson(props.travelId);
    // const personList = members as Person[];
    personList.push({
      person_id: personList.length + 1,
      person_name: "",
      created_at: "",
    });
    setPerson(personList);
  };

  const handleInputPrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputPrice(e.target.value);
  };
  const handleInputMemo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputMemo(e.target.value);
  };
  const handleInputTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputTitle(e.target.value);
  };

  const handlePersonChange = (e: SelectChangeEvent<string>) => {
    // setInputPerson(selectedPersonId);
    console.log(e.target.value);
    setInputPerson(e.target.value);
  };

  const addPrice = async () => {
    if (inputPrice == "" || inputTitle == "" || inputPerson == "") {
      window.alert("項目が入力されていません");
    } else {
      const selectedPerson: Person[] = personList?.filter(
        (person) => person.person_name == inputPerson
      );
      //   const selectedPersonId = selectedPerson && selectedPerson[0].person_id;
      const selectedPersonId = selectedPerson[0].person_id;

      const {
        price_id,
        price,
        price_title,
        price_detail,
        created_at,
        is_paid,
      } = await priceRepository.create(
        inputPrice,
        inputTitle,
        inputMemo,
        selectedPersonId
      );
      dispatch(
        add({
          price_id,
          price,
          price_title,
          price_detail,
          created_at,
          is_paid,
        })
      );
      setInputPrice("");
      setInputTitle("");
      setInputMemo("");
      setInputPerson("");
    }
  };

  return (
    <div className="list-details-body-container">
      <div className="list-details-form">
        <div>費用入力フォーム</div>
        <div className="input-title-container">
          <div className="list-input-title">タイトル</div>
          <TextField
            className="input-title"
            variant="standard"
            type="text"
            placeholder="Enter title"
            value={inputTitle}
            onChange={(e) => handleInputTitle(e)}
          ></TextField>
        </div>

        <div className="input-price-container">
          <div className="list-input-price">金額</div>
          <TextField
            className="input-price"
            variant="standard"
            type="number"
            placeholder="Enter price"
            value={inputPrice}
            onChange={(e) => handleInputPrice(e)}
          ></TextField>
        </div>

        <div className="input-memo-container">
          <div className="list-input-memo">メモ</div>
          <TextField
            className="input-memo"
            variant="standard"
            placeholder="Enter memo"
            value={inputMemo}
            onChange={(e) => handleInputMemo(e)}
          ></TextField>
        </div>
        <div className="input-person-container">
          <FormControl
            className="input-person"
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel id="select-person-label">member</InputLabel>
            <Select
              onChange={(e) => handlePersonChange(e)}
              value={inputPerson}
              label="支払者"
              labelId="select-person-label"
            >
              {personList?.map((p) => {
                return (
                  <MenuItem key={p.person_id} value={p.person_name}>
                    {p.person_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="add-list-details-button">
        <Button className="add-button" onClick={addPrice}>
          登録
        </Button>
      </div>
    </div>
  );
}
