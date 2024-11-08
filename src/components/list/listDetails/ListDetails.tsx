import "./ListDetails.scss";
import "../List.scss";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import ListDetailPrice from "./ListDetailPrice";
import ListDetailPerson from "./ListDetailPerson";
import ListHeader from "../ListHeader";
import { priceRepository } from "../../../repositories/price";
import { personRepository } from "../../../repositories/person";

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
  const signInUser = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const { travelName } = location.state ?? "詳細";
  const navigate = useNavigate();

  // const [priceList, setPriceList] = useState<Price[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [inputPerson, setInputPerson] = useState<string>("");
  const [pricePerPerson, setPricePerPerson] = useState<number>();
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

  const fetchPrice = async () => {
    const priceListDb = await priceRepository.getAllPrice();
    // console.log(priceListDb);
    // setPriceList(priceListDb);
    var resutlPrice: number = 0;
    priceListDb.map((price) => (resutlPrice += price.price));
    setTotalPrice(resutlPrice);
  };

  const fetchPerson = async () => {
    const personListDb = await personRepository.getAllPerson();
    setPersonList(personListDb);
    setInputPerson(personListDb[0].person_name);
  };

  const fetchPriceAndPerson = async () => {
    perPerson = 0;
    noPaiedPrice = 0;
    const priceAndPersonList = await priceRepository.getAllPriceAndPerson();
    setPriceAndPersonList(priceAndPersonList);
    priceAndPersonList.map((priceAndPerson) => {
      if (
        priceAndPerson.person.person_name ==
        priceAndPersonList[0].person.person_name
      ) {
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
    console.log(e.target.value);
    await priceRepository.updateIsPaid(e.target.value, true);
    // setIsChecked((prev) => !prev);
  };
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
        <div className="total-price-container">総費用:{totalPrice}</div>
        <div className="price-per-person-container">
          <select
            onChange={(e) => handleChangeselectPerson(e)}
            value={inputPerson}
          >
            {personList?.map((p) => {
              return <option>{p.person_name}</option>;
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
            {priceAndPersonList.map((price) =>
              price.is_paid ? (
                <s>
                  <label className="price-list-check-label">
                    <input
                      className="price-list-checkbox"
                      type="checkbox"
                      onChange={(e) => handleChengeCheck(e)}
                      value={price.price_id}
                      disabled={true}
                    />
                    {price.price + ":" + price.person.person_name}
                  </label>
                </s>
              ) : (
                <label className="price-list-check-label">
                  <input
                    className="price-list-checkbox"
                    type="checkbox"
                    onChange={(e) => handleChengeCheck(e)}
                    value={price.price_id}
                  />
                  {price.price +
                    ":" +
                    price.person.person_name +
                    ":" +
                    price.price_title}
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
