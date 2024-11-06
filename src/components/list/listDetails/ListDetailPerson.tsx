import React, { useEffect, useState } from "react";
import { personRepository } from "../../../repositories/person";
import "./ListDetails.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { add, init } from "../../../features/PersonSlice";
import { InitialPersonState } from "../../../../Types";

export default function ListDetailPerson() {
  const dispatch = useAppDispatch();

  const [inputPerson, setInputPerson] = useState<string>("");
  //   const [memberDb, setMemberDb] = useState<InitialPersonState[]>([]);

  const members = useAppSelector((state) => state.person.person);

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    const personDb = await personRepository.getAllPerson();
    dispatch(init(personDb));
  };

  const handleChangePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPerson(e.target.value);
  };

  const handleAddPerson = async () => {
    const { person_id, person_name, created_at } =
      await personRepository.create(inputPerson);
    // console.log(addedPerson);
    dispatch(add({ person_id, person_name, created_at }));
    // setInputPerson("");
  };

  return (
    <div className="list-detail-person-container">
      <input
        type="text"
        placeholder="人名"
        value={inputPerson}
        onChange={(e) => handleChangePerson(e)}
      />
      <button className="list-detail-person-button" onClick={handleAddPerson}>
        登録
      </button>
      {/* コンポーネント分割 */}
      <div className="person-list-container">
        <ul>
          {members.map((member: any) => (
            <li key={member.person_id}>{member.person_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
