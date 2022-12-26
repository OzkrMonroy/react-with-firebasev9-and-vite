import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  activeNote: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState: { ...initialState },
  reducers: {
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
    clearNotes: (state) => {},
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  clearNotes,
} = journalSlice.actions;
