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

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const authCtx = useContext(AuthContext);

  const submitFormHandler = (e) => {
    e.preventDefault();
    authCtx.signup(formData);
    navigate("/");
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            Register
          </Typography>
          <FormControl>
            <form onSubmit={submitFormHandler}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiTextField-root": { width: "38ch" },
                }}
              >
                <TextField
                  sx={{ m: 1, width: "38ch" }}
                  id="outlined-basic"
                  label="Name"
                  name="name"
                  size="small"
                  variant="outlined"
                  onChange={onChangeHandler}
                  required
                />
                <TextField
                  sx={{ m: 1, width: "38ch" }}
                  id="outlined-basic"
                  label="Email"
                  name="email"
                  variant="outlined"
                  size="small"
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
                  Register
                </Button>
              </Box>
            </form>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
