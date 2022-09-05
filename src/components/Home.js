import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deletePost } from "../redux/features/PostSlice";
import "../Styles/Home.css";

const Home = () => {
  let history = useNavigate();

  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, post } = useSelector((state) => ({ ...state.app }));

  const getPost = createAsyncThunk("post/getPost", async () => {
    return fetch(`https://gorest.co.in/public/v2/users`, {
      headers: {
        Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
      },
    }).then((res) =>
      res.json().then((re) => {
        setUser(re);
      })
    );
  });

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  //   useEffect(() => {
  //     loadUser();
  //   }, []);

  //   const loadUser = async () => {
  //     const result = await axios.get("https://gorest.co.in/public/v2/users", {
  //       headers: {
  //         Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
  //       },
  //     });

  //     setUser(result.data);
  //   };

  const deleteUser = (id) => {
    dispatch(deletePost({ id: id }));

    // await axios
    //   .delete(`https://gorest.co.in/public/v2/users/${id}`, {
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
    // loadUser();
  };

  return (
    <>
      <h2>User Page</h2>
      <div>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Gender</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>

          {user.map((data) => {
            const color =
              data.status === "active" ? "rgb(76, 178, 76)" : "#ff6fb7";
            const bgcolor =
              data.status === "active"
                ? "rgb(223, 239, 223)"
                : "rgb(239, 197, 233)";
            return (
              <>
                <tbody>
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.gender}</td>
                    <td>
                      <span
                        class="badge "
                        style={{
                          color: `${color}`,
                          backgroundColor: `${bgcolor}`,
                        }}
                      >
                        {data.status}
                      </span>
                    </td>

                    <td>
                      <Link to={`user/edit/${data.id}`}>
                        <button className="edit_button">Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="delete_button"
                        onClick={() => deleteUser(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Home;
