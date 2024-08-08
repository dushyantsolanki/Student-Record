import React, { useState } from "react";
import { TextField, Button, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/authContext.js";

const Login = () => {
  const { storageItem, setStorageItem } = useAuthContext();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3035/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const resData = await res.json();
      if (res.ok) {
        localStorage.setItem("authentication", `Bearer ${resData?.token}`);

        toast.success("You are Loged In !!! ");
        setStorageItem(`Bearer ${resData?.token}`);
        navigate("/");
      }
      setLoading(false);
      console.log("login sucessfully ........", resData);
    } catch (error) {
      setLoading(false);
      toast.error("Invalid password or email....");
      console.log("Error :: login :: handleSubmite-function ::", error);
    }
  };

  return (
    <>
      <form
        style={{ margin: "auto 2rem", width: "50%" }}
        onSubmit={handleSubmite}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              margin: "1rem 0 2.5rem 0",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>Welcome to Login</h1>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: "1rem 0" }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              required
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            sx={{ margin: "1.5rem 1rem 0 0" }}
          >
            <Button
              type="sumite"
              variant="contained"
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "blue" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            sx={{ margin: "1.5rem 1rem 1rem 0" }}
          >
            <Button
              variant="outlined"
              fullWidth
              disabled={loading}
              onClick={(e) => {
                navigate("register");
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
