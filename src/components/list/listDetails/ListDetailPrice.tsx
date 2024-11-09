import React, { useEffect, useState } from "react";
import "./ListDetails.scss";
import { priceRepository } from "../../../repositories/price";
import { personRepository } from "../../../repositories/person";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { add } from "../../../features/PriceSlice";

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
    // console.log(selectedPerson && selectedPerson[0].person_id);
    // console.log(selectedPersonId);
    // setInputPerson(selectedPersonId);
    setInputPerson(e.target.value);
    // console.log(inputPerson);
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
        <input
          type="text"
          placeholder="タイトル"
          value={inputTitle}
          onChange={(e) => handleInputTitle(e)}
        ></input>
        <input
          type="number"
          placeholder="金額"
          value={inputPrice}
          onChange={(e) => handleInputPrice(e)}
        ></input>
        <input
          type="text"
          placeholder="メモ"
          value={inputMemo}
          onChange={(e) => handleInputMemo(e)}
        ></input>
        <select onChange={(e) => handlePersonChange(e)} value={inputPerson}>
          {personList?.map((p) => {
            return <option key={p.person_id}>{p.person_name}</option>;
          })}
        </select>
      </div>
      <div className="add-list-details-button">
        <button onClick={addPrice}>登録</button>
      </div>
    </div>
  );
}
