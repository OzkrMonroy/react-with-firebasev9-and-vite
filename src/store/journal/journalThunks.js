import {
  createANote,
  deleteNote,
  getNotes,
  updateNote,
} from "../../firebase/config";
import { uploadFile } from "../../journal/helpers/uploadFile";
import {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setSaving,
  updateLocalNote,
} from "./journalSlice";

export const createNoteAction = () => async (dispatch, getState) => {
  dispatch(setSaving());
  const uid = getState().auth.uid;

  if (!uid) return;

  const note = {
    title: "",
    body: "",
    date: new Date().getTime(),
    imageUrls: [],
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

export const saveNoteAction = (note) => async (dispatch, getState) => {
  try {
    dispatch(setSaving());
    const uid = getState().auth.uid;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await updateNote(uid, noteToFirestore, note.id);
    dispatch(updateLocalNote({ ...note }));
    dispatch(setActiveNote({ ...note }));
  } catch (error) {
    console.log("An error ocurred while saving the note", error);
  }
};

export const uploadFilesAction =
  (note, files = []) =>
  async (dispatch) => {
    try {
      dispatch(setSaving());
      const uploadFilesPromises = [];
      for (const file of files) {
        uploadFilesPromises.push(uploadFile(file));
      }

      const imageUrls = await Promise.all(uploadFilesPromises);
      const oldUrls = note.imageUrls || [];
      const newNote = { ...note, imageUrls: [...oldUrls, ...imageUrls] };

      dispatch(saveNoteAction(newNote));
    } catch (error) {
      console.log("An error ocurred while saving the note images");
    }
  };

export const deleteNoteAction = () => async (dispatch, getState) => {
  dispatch(setSaving());
  try {
    const uid = getState().auth.uid;
    const { id } = getState().journal.activeNote;
    await deleteNote(uid, id);
    dispatch(deleteNoteById(id));
  } catch (error) {
    console.log("An error occurred while deleting a note", error);
  }
};
