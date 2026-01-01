import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import InputGlobal from "../globalComps/InputGlobal";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import {
  selectError,
  selectMessage,
  selectStatus,
} from "../features/authSlice.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../thunks/authThunk.js";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const message = useSelector(selectMessage);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/home");
    }
  }, [status, navigate]);

  const dispatch = useDispatch();

  const handleChangeUserName = (e) => setUserName(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin({ userName, password }));
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <InputGlobal
        key="userName"
        label="User Name"
        onChange={handleChangeUserName}
        value={userName}
      />
      <InputGlobal
        key="password"
        label="Password"
        onChange={handleChangePassword}
        value={password}
        type="password"
      />
      <ButtonGlobal type="submit">submit</ButtonGlobal>
      {status === "loading" && <CircularProgress />}
      {status === "succeeded" && <Typography>{message}</Typography>}
      {status === "failed" && (
        <Typography sx={{ color: "red" }}>{error}</Typography>
      )}
    </Box>
  );
};

export default Login