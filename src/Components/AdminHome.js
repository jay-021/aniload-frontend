import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminHome() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const [avatarEl, setAvatarEl] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setAvatar(decoded);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:9956/users");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (itemId) => {
    navigate(`/edit-item/${itemId}`);
  };

  const handleAvatarClick = (e) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <HomepageStyled>
      <header>
        <div className="logo">
          <h1>Aniload</h1>
          <Box sx={{ marginLeft: "auto" }}>
            <Button onClick={handleAvatarClick}>
              <Avatar alt={avatar?.name} src={avatar?.name} />
            </Button>
            <Popover
              open={Boolean(avatarEl)}
              anchorEl={avatarEl}
              onClose={handleAvatarClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Log out" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
          </Box>
        </div>
        <div className="search-container">
          <h1>Hello Admin!</h1>
          <Divider />
          <div className="items-container">
            {items.map((item, index) => (
              <div key={index} className="item">
                <h2>{item.name}</h2>
                <Button color="primary" onClick={() => handleEdit(item._id)}>
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      </header>
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background-color: #ededed;
  header {
    padding: 2rem 5rem;
    width: 80%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 1530px) {
      width: 95%;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .search-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
      }
      form {
        position: relative;
        width: 100%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }
        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }
        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .items-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .item {
      width: 40vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .input-control button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #4caf50; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 4px;
      transition-duration: 0.4s;
    }

    .input-control button:hover {
      background-color: #45a049;
    }
  }
`;

export default AdminHome;
