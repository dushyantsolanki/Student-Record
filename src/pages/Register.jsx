import React, { useState } from "react";
import { Grid, TextField, Button, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3035/api/user/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...formData }),
      });
      if (res.ok === true) {
        toast.success("You are registerd....");
        navigate("/");
      } else {
        toast.error("You are not registerd....");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something went to wrong....");
      console.log("error :: register.js / handleSubmite-function", error);
      setLoading(false);
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
            <h1 style={{ fontSize: "40px" }}>Welcome to Register</h1>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: "1rem 0" }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
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
                navigate("/");
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Register;
