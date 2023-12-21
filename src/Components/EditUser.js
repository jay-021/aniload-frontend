import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Params, useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";

function EditItem() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    axios.get(`http://localhost:9956/users/${id}`).then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
    });
  }, [id]);

  useEffect(() => {
    // Fetch posts associated with the user ID when the component mounts
    axios
      .get(`http://localhost:9048/posts/createdBy/${id}`)
      .then((response) => {
        setPosts(response.data);
      });
  }, [id]);

  const handleSave = () => {
    // Send a PUT request to the API with the updated user data
    axios.patch(`http://localhost:9956/users/${id}`, { name, email, password });
  };

  const handleDelete = (postId) => {
    // Send a DELETE request to the API to delete the post
    axios.delete(`http://localhost:9048/posts/${postId}`).then(() => {
      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post._id !== postId));
    });
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "60px",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} handleDelete={handleDelete} />
        ))}
      </div>

      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}

export default EditItem;
