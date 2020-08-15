import {
    SET_SCREAMS,
    LOADING_DATA,
    UNLIKE_SCREAM,
    LIKE_SCREAM,
} from "../types";
import axios from 'axios';

// get all posts
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get("/screams")
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_SCREAMS,
                payload: [],
            });
        });
};

// Like a post
export const likeScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

// Unlike a post
export const unlikeScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};
