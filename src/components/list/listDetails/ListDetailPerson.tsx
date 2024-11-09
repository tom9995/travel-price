import React, { useEffect, useState } from "react";
import { personRepository } from "../../../repositories/person";
import "./ListDetails.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { add, init } from "../../../features/PersonSlice";

type Prosp = {
  travelId: number;
};

export default function ListDetailPerson(props: Prosp) {
  const dispatch = useAppDispatch();

  const [inputPerson, setInputPerson] = useState<string>("");
  //   const [memberDb, setMemberDb] = useState<InitialPersonState[]>([]);

  const members = useAppSelector((state) => state.person.person);

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    const personDb = await personRepository.getAllPerson(props.travelId);
    dispatch(init(personDb));
  };

  const handleChangePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <details className="person-list-container">
        <summary>メンバー</summary>
        <div>
          <ul>
            {members.map((member: any) => (
              <li key={member.person_id}>{member.person_name}</li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
