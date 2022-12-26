import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const DrawerList = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.journal);

  const onSetActiveNote = (note) => {
    dispatch(setActiveNote(note));
  };

  return (
    <List>
      {notes.map((note) => (
        <ListItem key={note.id} disablePadding>
          <ListItemButton onClick={() => onSetActiveNote(note)}>
            <ListItemIcon>
              <TurnedInNot />
            </ListItemIcon>
            <Grid container>
              <ListItemText primary={note.title || "No title"} />
              <ListItemText secondary={note.body || "No description yet."} />
            </Grid>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
