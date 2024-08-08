import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgress, Grid, TextField } from "@mui/material";

const ListStudent = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3035/api/data/student?page=${page}&limit=${8}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("authentication"),
          },
        }
      );
      const resData = await res.json();

      if (!res.ok) {
        setLoading(false);
        setData([]);
      } else {
        setData((prevData) => [...prevData, ...resData]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error / ListStudent / fetchData function:", error);
    }
  };

  const deleteStudent = async (id) => {
    const res = await fetch(`http://localhost:3035/api/data/student/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authentication"),
      },
    });
    if (res.ok) {
      toast.success("Data Deleted Successfully...");
      setData((prevData) => prevData.filter((student) => student._id !== id));
    } else {
      toast.error("Data not deleted...");
    }
  };

  useEffect(() => {
    if (!search) {
      if (page > 1) fetchData(page);
    }
  }, [page]);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  const getSearchData = async (value) => {
    setSearchLoading(true);
    if (value) {
      try {
        const res = await fetch(
          `http://localhost:3035/api/data/student/search?name=${value}`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("authentication"),
            },
          }
        );
        const responseData = await res.json();
        if (res.ok) {
          setSearchData(data);
          setData(responseData);
        } else {
          setData(searchData);
          setSearchData([]);
        }
        setSearchLoading(false);
      } catch (error) {
        setSearchLoading(false);
        console.log(
          "Error :: pages / ListStudent - function  / getSearchData ::  ",
          error
        );
      }
    } else {
      setData([]);
      setPage(page);
      setSearchLoading(false);
    }
  };

  const debouncedGetData = useCallback(
    debounce((value) => getSearchData(value), 1000),
    []
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debouncedGetData(e.target.value);
  };

  useEffect(() => {
    const obsr = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !search) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (targetRef.current) {
      obsr.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        obsr.unobserve(targetRef.current);
      }
    };
  }, [targetRef, search]);

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1.5rem auto 2rem auto",
          width: { xs: "20rem", sm: "30rem", md: "40rem" },
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{
              width: { xs: "20rem", sm: "30rem", md: "40rem" },
            }}
            onChange={handleSearch}
            value={search}
          />
        </Grid>
      </Grid>

      <div className="list-student-page">
        {searchLoading ? (
          <div style={{ textAlign: "center", paddingTop: "2rem" }}>
            <CircularProgress size={30} />
          </div>
        ) : (
          <>
            {data.length !== 0 ? (
              data.map((student, index) => (
                <div className="card" key={index}>
                  <div className="card-header">{student.name} Information</div>
                  <div className="card-body">
                    <p>
                      <strong>Name:</strong> {student.name}
                    </p>
                    <p>
                      <strong>Surname:</strong>{" "}
                      {student.surname || "Not Defined"}
                    </p>
                    <p>
                      <strong>Email:</strong> {student.email}
                    </p>
                    <p>
                      <strong>Gender:</strong> {student.gender}
                    </p>
                    <p>
                      <strong>Hobbies:</strong> {student.hobby || "Not Defined"}
                    </p>
                    <p>
                      <strong>Country:</strong> {student.country}
                    </p>
                    <p>
                      <strong>State:</strong> {student.state}
                    </p>
                    <p>
                      <strong>City:</strong> {student.city}
                    </p>
                    <p>
                      <strong>Address:</strong> {student.address}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button
                      variant="contained"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                    <button
                      variant="contained"
                      onClick={() => navigate(`/edit/${student._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h3 style={{ textAlign: "center", paddingTop: "2rem" }}>
                {" "}
                NO RECORD
              </h3>
            )}
          </>
        )}
      </div>

      <div
        className="loader"
        ref={targetRef}
        style={{
          textAlign: "center",
          margin: "2rem 0 4rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && (
          <>
            <CircularProgress size={30} sx={{ marginRight: "13px" }} /> Loading
            .....
          </>
        )}
      </div>
    </>
  );
};

export default ListStudent;
