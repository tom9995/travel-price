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
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

type Person = {
  person_id: number;
  person_name: string;
  created_at: string;
};

export default function ListDetails() {
  const dispatch = useAppDispatch();

  const signInUser = useAppSelector((state) => state.user.user);
  const prices = useAppSelector((state) => state.price.price);
  const member = useAppSelector((state) => state.person.person);
  const location = useLocation();
  const { travelId, travelName } = location.state ?? "詳細";
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [inputPerson, setInputPerson] = useState<string>("");
  const [pricePerPerson, setPricePerPerson] = useState<number>(0);
  const [priceAndPersonList, setPriceAndPersonList] = useState<any[]>([]);
  const [nonPaidPrice, setnonPaidPrice] = useState(0);
  const [editPrice, setEditPrice] = useState<number>(0);

  const [editTitleInput, setEditTitleInput] = useState<string>("");
  const [editPriceInput, setEditPriceInput] = useState<string>("");
  const [editPersonInput, setEditPersonInput] = useState<string>("");

  var perPerson: number = 0;
  var noPaiedPrice: number = 0;

  useEffect(() => {
    // 未ログインならTOPに戻る
    if (signInUser == null) {
      navigate("/");
    }
    fetchPrice();
    fetchPerson();
    fetchPriceAndPerson();
  }, []);

  useEffect(() => {
    fetchPriceAndPerson();
  }, [prices, member]);

  const fetchPrice = async () => {
    const priceListDb = await priceRepository.getAllPrice(travelId);
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

  const handleChangeselectPerson = (e: SelectChangeEvent<string>) => {
    setInputPerson(e.target.value);
    perPerson = 0;
    noPaiedPrice = 0;
    priceAndPersonList.map((priceAndPerson) => {
      if (priceAndPerson.person.person_name == e.target.value) {
        perPerson += priceAndPerson.price;
        if (!priceAndPerson.is_paid) {
          noPaiedPrice += priceAndPerson.price;
        }
      }
      setPricePerPerson(perPerson);
      setnonPaidPrice(noPaiedPrice);
    });
  };

  const handleChengeCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    perPerson = 0;
    noPaiedPrice = 0;
    const target = e.target.value;
    const priceId = target.substring(0, target.indexOf(":"));
    // const personId = target.substring(target.indexOf(":") + 1);

    const flg = priceAndPersonList.filter((p) => p.price_id == priceId);
    // const conf = window.confirm("変更しますか？");
    const updatedPrice = await priceRepository.updateIsPaid(
      priceId,
      !flg[0].is_paid
    );
    const { price_id, is_paid } = updatedPrice[0];
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

  const handleEditButton = (e: any) => {
    priceAndPersonList.map((p) => {
      if (p.price_id == e.target.value) {
        setEditPriceInput(p.price);
        setEditPersonInput(p.person.person_name);
        setEditTitleInput(p.price_title);
      }
    });
    setEditPrice(e.target.value);
  };

  const handleUpdatePrice = async (e: any) => {
    const price_id = e.target.value;
    const price = editPriceInput;
    const price_title = editTitleInput;
    const personIds = personList.filter(
      (person) => person.person_name == editPersonInput
    );
    console.log(personIds);
    const person_id = personIds[0].person_id.toString();
    await priceRepository.updatePriceAndPerson(
      price_id,
      false,
      price,
      price_title,
      person_id
    );
    dispatch(update({ price_id, price, price_title, person_id }));
    setEditPrice(0);
  };

  const handleChangeEditPriceInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEditPriceInput(e.target.value);
  };
  const handleChangeEditTitleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditTitleInput(e.target.value);
  };
  const handleChangeEditPersonInput = (e: SelectChangeEvent<string>) => {
    setEditPersonInput(e.target.value);
  };

  const handleDeletePrice = async (e: any) => {
    const flg = window.confirm("削除しますか？");
    if (flg) {
      const price_id = e.target.value;
      const is_deleted = true;
      await priceRepository.updatePriceAndPerson(price_id, is_deleted);
      dispatch(update({ price_id, is_deleted }));
    }
    setEditPrice(0);
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
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              onChange={(e) => handleChangeselectPerson(e)}
              value={inputPerson}
            >
              {personList?.map((p) => {
                return (
                  <MenuItem key={p.person_id} value={p.person_name}>
                    {p.person_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <div className="per-person-text">の総費用:{pricePerPerson}</div>
        </div>
        <div className="price-to-be-paid">
          {inputPerson}
          の未払い費用:
          {nonPaidPrice}
        </div>
        <div className="price-list-container">
          <div className="price-list">
            <details className="price-list-detail">
              <summary>費用一覧</summary>
              {priceAndPersonList.map((price) =>
                price.price_id == editPrice ? (
                  <div className="price-list-edit">
                    <TextField
                      variant="standard"
                      type="number"
                      placeholder="金額"
                      value={editPriceInput}
                      onChange={(e) => handleChangeEditPriceInput(e)}
                      className="price-list-edit-price"
                    ></TextField>
                    :
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <Select
                        onChange={(e) => handleChangeEditPersonInput(e)}
                        value={editPersonInput}
                        className="person-select-item"
                        labelId="select-person-label"
                        label="メンバー"
                      >
                        {personList?.map((p) => {
                          return (
                            <MenuItem key={p.person_id} value={p.person_name}>
                              {p.person_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    :
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="タイトル"
                      value={editTitleInput}
                      onChange={(e) => handleChangeEditTitleInput(e)}
                      className="price-list-edit-title"
                    />
                    <Button
                      className="price-list-edit-button"
                      onClick={(e) => handleUpdatePrice(e)}
                      value={price.price_id}
                    >
                      更新
                    </Button>
                    <Button
                      className="price-list-delete-button"
                      value={price.price_id}
                      onClick={(e) => handleDeletePrice(e)}
                    >
                      削除
                    </Button>
                  </div>
                ) : price.is_paid ? (
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
                      />
                      {price.price +
                        ":" +
                        price.person.person_name +
                        ":" +
                        price.price_title}
                      <button
                        className="price-list-check-button"
                        onClick={(e) => handleEditButton(e)}
                        value={price.price_id}
                      >
                        編集
                      </button>
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
                    <button
                      className="price-list-check-button"
                      onClick={(e) => handleEditButton(e)}
                      value={price.price_id}
                    >
                      編集
                    </button>
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
