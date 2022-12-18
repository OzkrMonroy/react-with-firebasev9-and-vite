import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const DrawerList = ({ data = [] }) => {
  return (
    <List>
      {data.map((month) => (
        <ListItem key={month} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TurnedInNot />
            </ListItemIcon>
            <Grid container>
              <ListItemText primary={month} />
              <ListItemText secondary="This is an example of a secondary text" />
            </Grid>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
