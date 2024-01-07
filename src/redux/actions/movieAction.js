import axios from "axios";
import { options } from "../../constant";
import { ActionTypes } from "../actionTypes";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const getPopular = () => (dispatch) => {

    dispatch({
        type: ActionTypes.SET_MOVIES_LOADING
    })


  axios
    .get("/movie/popular", options)
    .then((res) =>
      dispatch({ type: ActionTypes.SET_MOVIES, payload: res.data.results })
    )
    .catch((err) => dispatch({type: ActionTypes.SET_MOVIES_ERROR, payload: err.message}))
};


export const getCategories = () => (dispatch) => {

    dispatch({
        type: ActionTypes.SET_GENRES_LOADING
    })

    axios.get("/genre/movie/list", options)
    .then((res) => dispatch({type: ActionTypes.SET_GENRES, payload: res.data.genres}))
    .catch((err) => dispatch({type: ActionTypes.SET_GENRES_ERROR, payload: err.message}))
}