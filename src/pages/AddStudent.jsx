import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import { data, hobbies } from "../utils/Data";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    gender: "female",
    address: "",
    countrys: "",
    state: "",
    city: "",
  });
  const [hobby, setHobby] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // create for multiple checkbox value fetch
  const handleChangeHobbies = (e) => {
    const { value, checked } = e.target;

    setHobby((prevHobbies) => {
      if (checked) {
        return [...prevHobbies, value];
      } else {
        return prevHobbies.filter((item) => item !== value);
      }
    });
  };

  // Create a function for form validation.
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!formData.countrys) tempErrors.country = "Country is required";
    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.address) tempErrors.address = "Address is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  // form submite functionality
  const handleSubmiteForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3035/api/data/student", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("authentication"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          hobby,
        }),
      });
      setLoading(false);
      if (res.ok === true) {
        toast.success("Your Data is Added ....");

        navigate("/list");
      } else {
        toast.error("Something went to ....");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="center-content">
      <form onSubmit={handleSubmiteForm}>
        <Grid
          container
          sx={{
            margin: "0 0 5rem 0",
            backgroundColor: "white",
            width: "100vw",
            height: "100vh",
            padding: "3.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <Grid item lg={5} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <TextField
              id="outlined-basic"
              label="Name"
              className="input-name"
              name="Name"
              variant="outlined"
              fullWidth
              // required
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </Grid>
          <Grid item lg={5} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <TextField
              id="outlined-basic"
              label="Surname"
              className="input-surname"
              name="surname"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setFormData({ ...formData, surname: e.target.value });
              }}
            />
          </Grid>
          <Grid item lg={5} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              className="input-email"
              name="email"
              variant="outlined"
              fullWidth
              // required
              // required
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </Grid>
          <Grid item lg={5} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                sx={{ display: "flex", flexDirection: "row" }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="gender"
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={10} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <FormLabel id="demo-radio-buttons-group-label">Hobbies</FormLabel>
            <div
              className="hobb"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {hobbies.map((hob) => (
                <div key={hob}>
                  <input
                    style={{ margin: "8px" }}
                    type="checkbox"
                    name={hob}
                    value={hob}
                    onChange={handleChangeHobbies}
                  />
                  {hob}
                </div>
              ))}
            </div>
          </Grid>
          <Grid item lg={10} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <FormControl variant="outlined" fullWidth name="dropdown">
              <InputLabel id="demo-simple-select-outlined-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlind"
                name="country"
                value={formData.countrys}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    countrys: e.target.value,
                    state: "",
                    city: "",
                  });
                }}
                label="Option"
                error={!!errors.country}
              >
                {data.countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={!!errors.country}>
                {errors.country}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={10} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <FormControl variant="outlined" fullWidth name="dropdown">
              <InputLabel id="demo-simple-select-outlined-label">
                State
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  setFormData({ ...formData, state: e.target.value, city: "" });
                }}
                label="Option"
                error={!!errors.state}
              >
                {data?.states[formData.countrys] ? (
                  data.states[formData.countrys].map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">Select the Country</MenuItem>
                )}
              </Select>
              <FormHelperText error={!!errors.state}>
                {errors.country}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={10} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <FormControl variant="outlined" fullWidth name="dropdown">
              <InputLabel id="demo-simple-select-outlined-label">
                City
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="state"
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                }}
                label="Option"
                error={!!errors.city}
              >
                {data?.citys[formData.state] ? (
                  data.citys[formData.state].map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">Select the City</MenuItem>
                )}
              </Select>
              <FormHelperText error={!!errors.city}>
                {errors.city}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={10} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Address"
                multiline
                rows={6}
                name="address"
                variant="outlined"
                // required
                value={formData.address}
                error={!!errors.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                }}
              />
              <FormHelperText error={!!errors.address}>
                {errors.address}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={10} sm={12} xs={12} sx={{ margin: "0.5rem" }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={20} /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddStudent;
