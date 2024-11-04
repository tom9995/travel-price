import "./ListDetails.scss";
import "../List.scss";

import { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import ListDetailPrice from "./ListDetailPrice";
import ListDetailPerson from "./ListDetailPerson";
import ListHeader from "../ListHeader";

export default function ListDetails() {
  const signInUser = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const { travelName } = location.state ?? "詳細";
  const navigate = useNavigate();
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
      <div className="list-detail-content">
        <ListDetailPrice />
        <ListDetailPerson />
      </div>
      {/* コンポーネント分割 */}
      <div className="travel-detail-container">
        <div className="total-price-container">総費用</div>
        <div className="price-per-person-container">一人当たり</div>
        <div className="price-to-be-paid">未払い</div>
      </div>
    </div>
  );
}
