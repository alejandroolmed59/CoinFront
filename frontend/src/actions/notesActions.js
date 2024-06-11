import axios from "axios";
import {
  NOTES_CREATE_REQUEST,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_REQUEST,
} from "../constants/notesConstants";
export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    //const { data } = await axios.get(`/api/notes`, config);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: [
        {
          _id: "asd",
          title: "HII",
          category: "byu",
          content: "sssss",
          createdAt: "2024-04-10",
        },
        {
          _id: "123",
          title: "bitcoin",
          category: "byu",
          content: "sssss",
          createdAt: "2024-04-10",
        },
      ],
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/notes/create`,
        {
          title,
          content,
          category,
        },
        config
      );
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: NOTES_LIST_FAIL,
        payload: message,
      });
    }
  };

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/notes/${id}`,
        {
          title,
          content,
          category,
        },
        config
      );
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: NOTES_LIST_FAIL,
        payload: message,
      });
    }
  };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${id}`, config);

    dispatch({ type: NOTES_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};
