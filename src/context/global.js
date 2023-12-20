import React, {createContext, useContext, useReducer} from "react";
import axios from "../Auth/axios";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";
const GET_FAVOURITES = "GET_FAVOURITES";

//reducer
const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false}
        case SEARCH:
            return {...state, searchResults: action.payload, loading: false}
        case GET_PICTURES:
            return {...state, pictures: action.payload, loading: false}
        case GET_FAVOURITES:
            return {...state, favourite: action.payload, loading: false}
        default:
            return state;
    }
}


export const GlobalContextProvider = ({children}) => {
    //intial state
    const intialState = {
        popularAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        favourite: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(reducer, intialState);
    const [search, setSearch] = React.useState('');


    //handle change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearch = false;
        }
    }


    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch = true;
        }else{
            state.isSearch = false;
            alert('Please enter a search term')
        }
    }

    //fetch popular anime
    const getPopularAnime = async (rendered) => {
        dispatch({type: LOADING})

        if (rendered === 'favourite') {
            try {
                const [response1, response2, response3] = await Promise.all([
                  fetch(`${baseUrl}/top/anime?filter=bypopularity`),
                  fetch(`${baseUrl}/top/anime?filter=airing`),
                  fetch(`${baseUrl}/top/anime?filter=upcoming`)
                ]);
            
                const [data1, data2, data3] = await Promise.all([
                  response1.json(),
                  response2.json(),
                  response3.json()
                ]);
            
                const mergedData = [...data1.data, ...data2.data, ...data3.data];
            
                dispatch({type: GET_POPULAR_ANIME, payload: mergedData})
            
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            // const response = await fetch(`${baseUrl}/top/anime`);
            // const data = await response.json();
        }else{
            const type = rendered === 'popular' ? 'bypopularity' : rendered
    
            const response = await fetch(`${baseUrl}/top/anime?filter=${type}`);
            const data = await response.json();
            dispatch({type: GET_POPULAR_ANIME, payload: data.data})
        }

    }

    //search anime
    const searchAnime = async (anime) => {
        dispatch({type: LOADING})
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data})
    }

    //get anime pictures
    const getAnimePictures = async (id) => {
        dispatch({type: LOADING})
        const response = await fetch(`https://api.jikan.moe/v4/characters/${id}/pictures`);
        const data = await response.json();
        dispatch({type: GET_PICTURES, payload: data.data})
    }

    const getFavouriteAnime = async () => {
        dispatch({type: LOADING})
        const response = await axios.get(`/post/favourite`);
        dispatch({type: GET_FAVOURITES, payload: response.data})
    }


    return(
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getAnimePictures ,
            getFavouriteAnime
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}