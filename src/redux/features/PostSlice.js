import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk("post/getPost", async () => {
  return fetch(`https://gorest.co.in/public/v2/users`, {
    headers: {
      Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
    },
  }).then((res) => res.json());
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id }) => {
    return fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "DELETE",
      headers: {
        //Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
      },
    }).then((res) => res.json());
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ user }) => {
    return fetch(`https://gorest.co.in/public/v2/users`, {
      method: "POST",
      headers: {
        //Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        status: user.status,
        gender: user.gender,
      }),
    }).then((res) => res.json());
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, name, email, status, gender }) => {
    //console.log("EDIT IDD", id, name);
    return fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: "PUT",
      headers: {
        //Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer c46c8176c189a01803d43cac358c36f5f778aff6736d80dd6e0199445626e3fb`,
      },
      body: JSON.stringify({
        name,
        email,
        status,
        gender,
      }),
    })
      .then((res) => res.json())
      .then((re) => console.log("UPDATE RES", re));
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    post: [],
    error: null,
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.body = action.payload.body;
      state.edit = action.payload.edit;
    },
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setEdit } = PostSlice.actions;
export default PostSlice.reducer;
