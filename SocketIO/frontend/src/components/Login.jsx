import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const authCtx = useContext(AuthContext);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    authCtx.login(formData);
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        width: "100%",
      }}
    >
      <Card sx={{ minWidth: 390 }}>
        <CardContent>
          <Typography
            sx={{
              m: 2,
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Login
          </Typography>

          <form action="" onSubmit={submitFormHandler}>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                sx={{ m: 1, width: "38ch" }}
                onChange={onChangeHandler}
                required
              />
              <TextField
                sx={{ m: 1, width: "38ch" }}
                id="outlined-basic"
                label="Password"
                name="password"
                size="small"
                variant="outlined"
                onChange={onChangeHandler}
                required
              />
              <Button variant="contained" sx={{ m: 1 }} type="submit">
                Login
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
