import {
    SET_SCREAMS,
    LOADING_DATA,
    UNLIKE_SCREAM,
    LIKE_SCREAM,
    DELETE_SCREAM,
    SET_ERRORS,
    POST_SCREAM,
    CLEAR_ERRORS,
    LOADING_UI
} from "../types";
import axios from "axios";

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

// A new post
export const postScream = (newScream) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post("/scream", newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch({type: CLEAR_ERRORS});
        }).catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
}

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

// Delete a post
export const deleteScream = (screamId) => (dispatch) => {
    axios
        .delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({ type: DELETE_SCREAM, payload: screamId });
        })
        .catch((err) => console.log(err));
};
