import { deleteAllDBNotes } from "../../../src/firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  setSaving,
} from "../../../src/store/journal/journalSlice";
import { createNoteAction } from "../../../src/store/journal/journalThunks";

describe("Tests for JournalThunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("[createNoteAction - success] - should create a note", async () => {
    const uid = "TEST-UID";
    await getState.mockReturnValue({ auth: { uid } });
    await createNoteAction()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        title: "",
        body: "",
        date: expect.any(Number),
        imageUrls: [],
        id: expect.any(String),
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        title: "",
        body: "",
        date: expect.any(Number),
        imageUrls: [],
        id: expect.any(String),
      })
    );
    await deleteAllDBNotes(uid);
  });
});
