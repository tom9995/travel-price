import { useNavigate } from "react-router-dom";
import { authRepository } from "../../repositories/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../features/UserSlice";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";

type Props = {
  name: string;
};

export default function ListHeader(props: Props) {
  // const [userName,setUserName] = useState("");
  const signInUser = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  const reLoad = () => {
    navigate("/list");
  };
  const dispatch = useAppDispatch();

  //   useEffect(()=>{

  //   },[])

  const handelSignout = async () => {
    await authRepository.signOut();
    dispatch(signOut());
    navigate("/");
  };
  return (
    <div className="list-header-container">
      <img
        className="header-icon"
        src="./icon.png"
        alt="icon"
        onClick={reLoad}
      />
      <p className="header-title">{props.name}</p>
      <div className="header-left">
        <div className="header-user-email">{signInUser?.email}</div>
        <p className="sign-out-button" onClick={handelSignout}>
          <PersonIcon />
        </p>
      </div>
    </div>
  );
}
