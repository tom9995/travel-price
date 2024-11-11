import React, { useEffect, useState } from "react";
import { personRepository } from "../../../repositories/person";
import "./ListDetails.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { add, deletePerson, init, update } from "../../../features/PersonSlice";
import { Button, TextField } from "@mui/material";

type Prosp = {
  travelId: number;
};

type Person = {
  person_id: number;
  person_name: string;
  created_at: string;
};

export default function ListDetailPerson(props: Prosp) {
  const dispatch = useAppDispatch();

  const [inputPerson, setInputPerson] = useState<string>("");
  const [editPerson, setEditPerson] = useState<number>(0);
  const [editPersonInput, setEditPersonInput] = useState<string>("");
  const [personList, setPersonList] = useState<Person[]>([]);

  const members = useAppSelector((state) => state.person.person);

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    const personDb = await personRepository.getAllPerson(props.travelId);
    dispatch(init(personDb));
    setPersonList(personDb);
  };

  const handleChangePerson = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputPerson(e.target.value);
  };

  const handleAddPerson = async () => {
    if (inputPerson == "") {
      window.alert("項目が入力されていません");
    } else {
      const { person_id, person_name, created_at } =
        await personRepository.create(inputPerson);
      await personRepository.creatParticipants(props.travelId, person_id);
      // console.log(addedPerson);
      dispatch(add({ person_id, person_name, created_at }));
      setInputPerson("");
    }
  };

  const handleEditPerson = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    personList.map((person) => {
      if (person.person_id == e.target.value) {
        setEditPersonInput(person.person_name);
      }
    });
    setEditPerson(e.target.value);
  };

  const handleChangePesonInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditPersonInput(e.target.value);
  };

  const handleUpdatePerson = async () => {
    const is_deleted = false;
    const person_id = editPerson;
    const person_name = editPersonInput;
    await personRepository.update(editPerson, editPersonInput, is_deleted);
    dispatch(update({ person_id, person_name, is_deleted }));
    setEditPerson(0);
  };

  const handleDeletePerson = async () => {
    const is_deleted = true;
    const person_id = editPerson;
    const person_name = editPersonInput;
    await personRepository.updateParticipants(editPerson, is_deleted);
    dispatch(deletePerson({ person_id }));

    setEditPerson(0);
  };

  return (
    <div className="list-detail-person-container">
      <div className="person-input-text">人名</div>
      <div className="person-input-container">
        <TextField
          variant="standard"
          type="text"
          placeholder="人名"
          value={inputPerson}
          onChange={(e) => handleChangePerson(e)}
          className="person-input"
        />
        <Button className="list-detail-person-button" onClick={handleAddPerson}>
          登録
        </Button>
      </div>
      {/* <input
        type="text"
        placeholder="人名"
        value={inputPerson}
        onChange={(e) => handleChangePerson(e)}
      /> */}
      {/* <button className="list-detail-person-button" onClick={handleAddPerson}>
        登録
      </button> */}
      {/* コンポーネント分割 */}
      <details className="person-list-container">
        <summary>メンバー</summary>
        <div>
          <ul>
            {members.map((member: any) =>
              member.person_id == editPerson ? (
                <div className="update-list-container">
                  <TextField
                    variant="standard"
                    type="input"
                    value={editPersonInput}
                    onChange={(e) => handleChangePesonInput(e)}
                  ></TextField>
                  {/* <input
                    type="input"
                    value={editPersonInput}
                    onChange={(e) => handleChangePesonInput(e)}
                  ></input> */}
                  <Button
                    className="person-list-edit-button"
                    onClick={handleUpdatePerson}
                  >
                    更新
                  </Button>
                  {/* <button
                    className="person-list-edit-button"
                    onClick={handleUpdatePerson}
                  >
                    更新
                  </button> */}
                  <Button
                    className="person-list-delete-button"
                    onClick={handleDeletePerson}
                  >
                    削除
                  </Button>
                  {/* <button onClick={handleDeletePerson}>削除</button> */}
                </div>
              ) : (
                <div className="member-list-container">
                  <li key={member.person_id} className="member-name">
                    {member.person_name}
                  </li>
                  <Button
                    className="member-edit-button"
                    onClick={(e) => handleEditPerson(e)}
                    value={member.person_id}
                  >
                    編集
                  </Button>
                  {/* <button
                    className="member-edit-button"
                    onClick={(e) => handleEditPerson(e)}
                    value={member.person_id}
                  >
                    編集
                  </button> */}
                </div>
              )
            )}
          </ul>
        </div>
      </details>
    </div>
  );
}
