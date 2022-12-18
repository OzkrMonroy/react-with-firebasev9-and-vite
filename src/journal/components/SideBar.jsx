import { Divider, Drawer, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DrawerList } from "./DrawerList";

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="p">
            Oscar Monroy
          </Typography>
        </Toolbar>
        <Divider />
        <DrawerList data={["January", "February", "March", "April"]} />
      </Drawer>
    </Box>
  );
};
