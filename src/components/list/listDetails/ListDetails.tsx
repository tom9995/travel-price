import "./ListDetails.scss";
import "../List.scss";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import ListDetailPrice from "./ListDetailPrice";
import ListDetailPerson from "./ListDetailPerson";
import ListHeader from "../ListHeader";
import { priceRepository } from "../../../repositories/price";
import { personRepository } from "../../../repositories/person";
import { initPrice, update } from "../../../features/PriceSlice";

// type Price = {
//   price_id: number;
//   price: number;
//   price_title: string;
//   price_detail: string;
//   person_id: number;
//   created_at: string;
// };

type Person = {
  person_id: number;
  person_name: string;
  created_at: string;
};

export default function ListDetails() {
  const dispatch = useAppDispatch();

  const signInUser = useAppSelector((state) => state.user.user);
  const prices = useAppSelector((state) => state.price.price);
  const location = useLocation();
  const { travelId, travelName } = location.state ?? "詳細";
  const navigate = useNavigate();

  // const [priceList, setPriceList] = useState<Price[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [inputPerson, setInputPerson] = useState<string>("");
  const [pricePerPerson, setPricePerPerson] = useState<number>(0);
  const [priceAndPersonList, setPriceAndPersonList] = useState<any[]>([]);
  // const [isChecked, setIsChecked] = useState<boolean>(false);
  const [nonPaidPrice, setnonPaidPrice] = useState(0);

  var perPerson: number = 0;
  var noPaiedPrice: number = 0;

  useEffect(() => {
    // console.log(signInUser);
    // 未ログインならTOPに戻る
    if (signInUser == null) {
      navigate("/");
    }
    fetchPrice();
    fetchPerson();
    fetchPriceAndPerson();
  }, []);

  useEffect(() => {
    // fetchPerson;
    fetchPriceAndPerson();
  }, [prices]);

  const fetchPrice = async () => {
    const priceListDb = await priceRepository.getAllPrice(travelId);
    // console.log(priceListDb);
    // setPriceList(priceListDb);
    var resutlPrice: number = 0;
    priceListDb.map((price) => (resutlPrice += price.price));
    setTotalPrice(resutlPrice);
    dispatch(initPrice(priceListDb));
  };

  const fetchPerson = async () => {
    const personListDb = await personRepository.getAllPerson(travelId);
    setPersonList(personListDb);
    setInputPerson(personListDb[0].person_name);
  };

  const fetchPriceAndPerson = async () => {
    perPerson = 0;
    noPaiedPrice = 0;
    const priceAndPersonList = await priceRepository.getAllPriceAndPerson(
      travelId
    );
    setPriceAndPersonList(priceAndPersonList);
    // console.log(inputPerson);
    const p = inputPerson
      ? inputPerson
      : priceAndPersonList[0].person.person_name;
    priceAndPersonList.map((priceAndPerson) => {
      if (priceAndPerson.person.person_name == p) {
        perPerson += priceAndPerson.price;
        if (!priceAndPerson.is_paid) {
          noPaiedPrice += priceAndPerson.price;
        }
      }
    });
    setPricePerPerson(perPerson);
    setnonPaidPrice(noPaiedPrice);
  };

  const handleChangeselectPerson = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInputPerson(e.target.value);
    // console.log(e.target.value);
    // console.log(priceAndPersonList);
    perPerson = 0;
    noPaiedPrice = 0;
    priceAndPersonList.map((priceAndPerson) => {
      if (priceAndPerson.person.person_name == e.target.value) {
        perPerson += priceAndPerson.price;
        if (!priceAndPerson.is_paid) {
          noPaiedPrice += priceAndPerson.price;
        }
      }
      // console.log(perPerson);
      setPricePerPerson(perPerson);
      setnonPaidPrice(noPaiedPrice);
    });
  };

  const handleChengeCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    perPerson = 0;
    noPaiedPrice = 0;
    // console.log(e.target.value);
    const target = e.target.value;
    const priceId = target.substring(0, target.indexOf(":"));
    const personId = target.substring(target.indexOf(":") + 1);
    // console.log(priceId);
    // console.log(personId);

    const flg = priceAndPersonList.filter((p) => p.price_id == priceId);
    // const conf = window.confirm("変更しますか？");
    const updatedPrice = await priceRepository.updateIsPaid(
      priceId,
      !flg[0].is_paid
    );
    const { price_id, is_paid } = updatedPrice[0];
    // setIsChecked((prev) => !prev);
    dispatch(update({ price_id, is_paid }));
    priceAndPersonList.map((priceAndPerson) => {
      if (priceAndPerson.person.person_name == inputPerson) {
        perPerson += priceAndPerson.price;
        if (!priceAndPerson.is_paid) {
          noPaiedPrice += priceAndPerson.price;
        }
      }
    });
  };
  return (
    <div className="list-details-container">
      <div className="list-details-header-container">
        <ListHeader name={travelName} />
      </div>
      <div className="list-detail-content">
        <ListDetailPrice travelId={travelId} />
        <ListDetailPerson travelId={travelId} />
      </div>
      {/* コンポーネント分割 */}
      <div className="travel-detail-container">
        <div className="total-price-container">総費用:{totalPrice}</div>
        <div className="price-per-person-container">
          <select
            onChange={(e) => handleChangeselectPerson(e)}
            value={inputPerson}
          >
            {personList?.map((p) => {
              return <option key={p.person_id}>{p.person_name}</option>;
            })}
          </select>
          の総費用:{pricePerPerson}
        </div>
        <div className="price-to-be-paid">
          {inputPerson}
          の未払い費用:
          {nonPaidPrice}
        </div>
        <div className="price-list-container">
          <div className="price-list">
            費用一覧
            <details>
              <summary>一覧</summary>
              {priceAndPersonList.map((price) =>
                price.is_paid ? (
                  <s>
                    <label
                      key={price.price_id}
                      className="price-list-check-label"
                    >
                      <input
                        className="price-list-checkbox"
                        type="checkbox"
                        onChange={(e) => handleChengeCheck(e)}
                        value={price.price_id + ":" + price.person_id}
                        checked={price.is_paid}
                        // disabled={true}
                      />
                      {price.price +
                        ":" +
                        price.person.person_name +
                        ":" +
                        price.price_title}
                    </label>
                  </s>
                ) : (
                  <label className="price-list-check-label">
                    <input
                      className="price-list-checkbox"
                      type="checkbox"
                      onChange={(e) => handleChengeCheck(e)}
                      value={price.price_id + ":" + price.person_id}
                      checked={price.is_paid}
                    />
                    {price.price +
                      ":" +
                      price.person.person_name +
                      ":" +
                      price.price_title}
                  </label>
                )
              )}
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
