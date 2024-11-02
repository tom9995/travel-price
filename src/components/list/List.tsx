import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const list = ["a", "b", "c"];

export default function List() {
  useEffect(() => {
    // 未ログインならTOPに戻る
    // navigate("/");
  }, []);

  const navigate = useNavigate();
  const handleListClick = () => {
    navigate("/ListDetails");
  };

  return (
    <div className="list-container">
      <div>一覧</div>
      <ul>
        {list.map((item, index) => (
          <li onClick={handleListClick}>{index + 1} </li>
        ))}
      </ul>
    </div>
  );
}
