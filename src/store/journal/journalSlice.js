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
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateLocalNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          note = { ...payload };
        }
        return note;
      });
      state.messageSaved = `${payload.title} has been updated successfully`;
    },
    deleteNoteById: (state, action) => {},
    clearNotes: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateLocalNote,
  deleteNoteById,
  clearNotes,
} = journalSlice.actions;
