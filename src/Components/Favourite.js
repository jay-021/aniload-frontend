import React, { useEffect } from 'react'
import Popular from './Popular'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import { jwtDecode } from 'jwt-decode'
import { Avatar, Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material'
import styled from 'styled-components'

function Favourite() {

  const { handleSubmit,
    search,
    handleChange,
} = useGlobalContext()
const navigate = useNavigate()


const [rendered, setRendered] = React.useState('popular')
const [avatarEl, setAvatarEl] = React.useState(null);
const [avatar, setAvatar] = React.useState(null)

useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setAvatar(decoded)
}, [])


const handleAvatarClick = (e) => {
    setAvatarEl(e.currentTarget);
};

const handleAvatarClose = () => {
    setAvatarEl(null);
};

const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")
}

  return (
    <HomepageStyled>
            <header>
                <div className="logo">
                    <h1>
                        {rendered === 'popular' ? 'Popular Anime' :
                            rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                    </h1>
                    <Box sx={{ marginLeft: 'auto'}}>
                    <Button onClick={handleAvatarClick}>
                        <Avatar alt={avatar?.name} src={avatar?.name} />
                    </Button>
                    <Popover
                        open={Boolean(avatarEl)}
                        anchorEl={avatarEl}
                        
                        onClose={handleAvatarClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        <List disablePadding>   
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/favourite')}>
                                    <ListItemText primary="Favorites" />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
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
                    <div className="filter-btn popular-filter">
                        <button onClick={() => {
                            setRendered('popular')
                            navigate('/')
                        }}>Popular<i className="fas fa-fire"></i></button>
                    </div>
                    <form action="" className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="search" placeholder="Search Anime" value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button onClick={() => {
                            setRendered('airing')
                            navigate('/')
                        }}>Airing</button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={() => {
                            setRendered('upcoming')
                            navigate('/')
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            <Popular rendered={'favourite'} />
        </HomepageStyled >
  )
}

const HomepageStyled = styled.div`
    background-color: #EDEDED;
    header{
        padding: 2rem 5rem;
        width: 80%;
        margin: 0 auto;
        transition: all .4s ease-in-out;
        @media screen and (max-width:1530px){
            width: 95%;
        }
        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .search-container{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            button{
                display: flex;
                align-items: center;
                gap: .5rem;
                padding: .7rem 1.5rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: #fff;
                cursor: pointer;
                transition: all .4s ease-in-out;
                font-family: inherit;
                border: 5px solid #e5e7eb;
            }
            form{
                position: relative;
                width: 100%;
                .input-control{
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                .input-control input{
                    width: 100%;
                    padding:.7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    background-color: #fff;
                    border: 5px solid #e5e7eb;
                    transition: all .4s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
`

export default Favourite