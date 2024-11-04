import React, { useEffect, useState } from "react";
import "./ListDetails.scss";
import { useLocation } from "react-router-dom";
import ListHeader from "../ListHeader";
import { priceRepository } from "../../../repositories/price";
import { personRepository } from "../../../repositories/person";
import { useAppSelector } from "../../../app/hooks";

type Person = {
  person_id: number;
  person_name: string;
  created_at: string;
};

export default function ListDetailPrice() {
  const [inputPrice, setInputPrice] = useState<string>("");
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputMemo, setInputMemo] = useState<string>("");
  const [inputPerson, setInputPerson] = useState<string>("");
  const [personList, setPerson] = useState<Person[]>();

  //   const people = useAppSelector((state) => state.person.person_id)

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    const personList = await personRepository.getAllPerson();
    personList.push({
      person_id: personList.length + 1,
      person_name: "",
    });
    setPerson(personList);
    // console.log(person);
  };

  const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(e.target.value);
  };
  const handleInputMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMemo(e.target.value);
  };
  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setInputPerson(e.target.value);
  };

  const addPrice = async () => {
    await priceRepository.create(inputPrice, inputTitle, inputMemo, 1);
    setInputPrice("");
    setInputTitle("");
    setInputMemo("");
    setInputPerson("");
  };

  return (
    <div className="list-details-body-container">
      <div className="list-details-form">
        <input
          type="number"
          placeholder="金額"
          value={inputPrice}
          onChange={(e) => handleInputPrice(e)}
        ></input>
        <input
          type="text"
          placeholder="タイトル"
          value={inputTitle}
          onChange={(e) => handleInputTitle(e)}
        ></input>
        <input
          type="text"
          placeholder="メモ"
          value={inputMemo}
          onChange={(e) => handleInputMemo(e)}
        ></input>
        <select onChange={(e) => handlePersonChange(e)} value={inputPerson}>
          {personList?.map((p) => {
            return <option>{p.person_name}</option>;
          })}
        </select>
      </div>
      <div className="add-list-details-button">
        <button onClick={addPrice}>登録</button>
      </div>
    </div>
  );
}
