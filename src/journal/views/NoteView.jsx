import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../hooks";
import {
  deleteNoteAction,
  saveNoteAction,
  uploadFilesAction,
} from "../../store/journal";
import { ImageGallery } from "../components";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote, messageSaved, isSaving } = useSelector(
    (state) => state.journal
  );
  const { title, body, date, onInputChange, formState } = useForm(activeNote);
  const inputRef = useRef();

  console.log({ messageSaved });
  useEffect(() => {
    console.log({ messageSaved });
    if (messageSaved.trim().length > 0) {
      Swal.fire("Updated note", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    if (isSaving) return;
    dispatch(saveNoteAction({ ...formState }));
  };

  const onFileChange = ({ target }) => {
    const files = target.files || [];

    if (files.length === 0) return;
    dispatch(uploadFilesAction({ ...formState }, files));
  };

  const onDelete = () => {
    dispatch(deleteNoteAction());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Grid item>
        <Typography fontSize={40} fontWeight="light">
          {date}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileChange}
          hidden
          ref={inputRef}
        />
        <IconButton
          disabled={isSaving}
          color="primary"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          <UploadFileOutlined />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button sx={{ mt: 2 }} onClick={onDelete} color="error">
          <DeleteOutline /> Delete
        </Button>
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
