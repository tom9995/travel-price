import React, { useState } from "react";
import { personRepository } from "../../../repositories/person";
import "./ListDetails.scss";

export default function ListDetailPerson() {
  const [inputPerson, setInputPerson] = useState<string>("");

  const handleChangePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPerson(e.target.value);
  };

  const handleAddPerson = async () => {
    await personRepository.create(inputPerson);
    setInputPerson("");
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
      <div className="person-list-container">メンバー一覧</div>
    </div>
  );
}
