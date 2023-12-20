import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material'
import axios from '../Auth/axios'
import toast from 'react-hot-toast'

function Popular({ rendered }) {
    const { popularAnime, isSearch, searchResults, getFavouriteAnime, favourite, getPopularAnime } = useGlobalContext()

    const [data, setData] = useState([])

    useEffect(() => {
        if (rendered) {
            getPopularAnime(rendered)
            getFavouriteAnime()    
        }
        
    }, [rendered])
    

    useEffect(() => {
        if (popularAnime && favourite) {
            const res = popularAnime.map((item) => ({
                ...item,
                favourite: favourite.some((favItem) => Number(favItem.id) === item.mal_id)
            }));
            setData(res);
        }
    }, [popularAnime, favourite])

    const handleFavourite = async (anime, like) => {
        const resData = [...data];
        const updatedResData = resData.map((item) => {
            if (item.mal_id === anime.mal_id) {
                return { ...item, favourite: like ? true : false }
            }
            return item;
        })
        setData(updatedResData)

        const payload = {
            favourite: like,
            id: anime.mal_id
        }
        try {
            const response = await axios.post(`/post/create`, payload)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
        getFavouriteAnime()
    }

    useEffect(() => {
        if (favourite && popularAnime && rendered === 'favourite') {
            const filteredArray = popularAnime.filter(obj2 => {
                return favourite.some(obj1 => Number(obj1.id) === obj2.mal_id);
            });

            const updatedArray = filteredArray.map(item => ({
                ...item,
                favourite: true
            }));

                        setData(updatedArray);
        }
    }, [favourite, popularAnime, rendered])

    const conditionalRender = () => {
        if (!isSearch && rendered || rendered === 'favourite') {
            return  rendered === 'favourite' && data.length === 0 ? <h4 style={{ position : 'absolute', left: '40%', top : '60%'}} >Not Favorite Yet</h4> : 
              data?.map((anime, index) => {
                return (
                    <div key={index} style={{ position: 'relative' }}>
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <img src={anime.images.jpg.large_image_url} alt="popular" />
                        </Link>
                        <div style={{ cursor: 'pointer', position: 'absolute', top: '7px', right: '5px' }} >
                            {anime.favourite ? (
                                <Button onClick={() => handleFavourite(anime, false)} color="warning" >
                                    <FavoriteIcon color="warning" />
                                </Button>
                            ) : (
                                <Button onClick={() => handleFavourite(anime, true)} color="warning">
                                    <FavoriteBorderIcon color="warning" />
                                </Button>
                            )}
                        </div>
                    </div>
                )
            })
        } else {
            return searchResults.length === 0 ? <h4 style={{ position : 'absolute', left: '40%', top : '60%'}} >Not Results Yet</h4> :
             searchResults?.map((anime, index) => {
                return (
                    <div key={index} style={{ position: 'relative' }}>
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <img src={anime.images.jpg.large_image_url} alt="" />
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <PopularStyled>
            <div className="popular-anime">
                {conditionalRender()}
            </div>
            <Sidebar />
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    display: flex;
    .popular-anime{
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 5rem;
        padding-right: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;
        a{
            height: 500px;
            border-radius: 7px;
            border: 5px solid #e5e7eb;
        }
        a img{
            width: 100%;
            // height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }
`;

export default Popular