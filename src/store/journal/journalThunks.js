import { createANote, getNotes } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
} from "./journalSlice";

export const createNoteAction = () => async (dispatch, getState) => {
  dispatch(setSaving());
  const uid = getState().auth.uid;

  if (!uid) return;

  const note = {
    title: "",
    body: "",
    date: new Date().getTime(),
  };

  try {
    const docRef = await createANote(uid, note);
    dispatch(addNewEmptyNote({ id: docRef.id, ...note }));
    dispatch(setActiveNote({ id: docRef.id, ...note }));
  } catch (error) {
    console.log("An error ocurred while a note was created", error);
  }
};

export const loadNotesAction = () => async (dispatch, getState) => {
  try {
    const uid = getState().auth.uid;
    const notes = await getNotes(uid);

    dispatch(setNotes(notes));
  } catch (error) {
    console.log("An error ocurred while getting the notes", error);
  }
};
