import { useNavigate } from "react-router-dom";
import { authRepository } from "../../repositories/auth";
import { useAppDispatch } from "../../app/hooks";
import { signOut } from "../../features/UserSlice";

type Props = {
  name: string;
};

export default function ListHeader(props: Props) {
  const navigate = useNavigate();
  const reLoad = () => {
    navigate("/list");
  };
  const dispatch = useAppDispatch();

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
      <p className="sign-out-button" onClick={handelSignout}>
        サインアウト
      </p>
    </div>
  );
}
