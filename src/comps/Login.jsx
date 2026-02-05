import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import InputGlobal from "../globalComps/InputGlobal";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import {
  selectError,
  selectMessage,
  selectStatus,
} from "../features/authSlice.js";
import { fetchLogin } from "../thunks/authThunk.js";

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const message = useSelector(selectMessage);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/home");
    }
  }, [status, navigate]);


  const handleChangeUserName = ({target: {value}}) => setUserName(value);
  const handleChangePassword = ({target: {value}}) => setPassword(value);

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
        label="User Name"
        onChange={handleChangeUserName}
        value={userName}
        autoFocus={true}
      />
      <InputGlobal
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