import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost, setEdit, updatePost } from "../redux/features/PostSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    status: "",
    gender: "",
    //male: "",
    //female: "",
  });

  const { name, email, status, gender } = user;

  const { post, body, edit } = useSelector((state) => ({ ...state.app }));

  let history = useNavigate();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   getPost;
  // }, []);

  useEffect(() => {
    const getPost = createAsyncThunk("post/getPost", async (id) => {
      return fetch(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
        },
      }).then((res) =>
        res.json().then((re) => {
          setUser(re);
        })
      );
    });
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(setEdit({ edit: true, body: post.body }));
    dispatch(
      updatePost({
        id: id,
        name: name,
        email: email,
        status: status,
        gender: gender,
      })
    );

    //getPost();

    //dispatch(setEdit({ edit: true, body: post.body }));

    // useEffect(() => {
    //   dispatch(getPost());
    // }, [dispatch]);

    console.log("EDIT DATA", id, name, email, status);
    history("/");

    // await axios
    //   .put(`https://gorest.co.in/public/v2/users/${id}`, user, {
    //     headers: {
    //       Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
    //     },
    //   })
    //   .then((resp) => {
    //     console.log("Resp", resp);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // history("/");
  };

  //   const loadUser = async () => {
  //     const result = await axios.get(
  //       `https://gorest.co.in/public/v2/users/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
  //         },
  //       }
  //     );

  //     setUser(result.data);
  //   };

  return (
    <>
      <h2>Edit User</h2>

      <div style={{ width: "30%", marginLeft: "35%", marginTop: "50px" }}>
        <form className="row g-3" onSubmit={submitForm}>
          <div>
            <label for="inputEmail4" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              name="name"
              onChange={(e) => onInputChange(e)}
              value={name}
            />
          </div>
          <div>
            <label for="inputPassword4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputPassword4"
              name="email"
              onChange={(e) => onInputChange(e)}
              value={email}
            />
          </div>

          <div>
            <label for="inputState" className="form-label">
              Status
            </label>
            <select
              id="inputState"
              name="status"
              className="form-select"
              onChange={(e) => onInputChange(e)}
              value={status}
            >
              <option selected>Choose...</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="col-12">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault1"
              onChange={(e) => onInputChange(e)}
              value="male"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="col-12">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault1"
              onChange={(e) => onInputChange(e)}
              value="female"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Female
            </label>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
