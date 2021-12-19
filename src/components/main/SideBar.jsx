import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

export const SideBar = (props) => {
  const { window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: props.drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "100vh",
            width: props.drawerWidth,
          },
        }}
      >
        {props.drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
            height: "100vh",
          },
        }}
        open
      >
        {props.drawer}
      </Drawer>
    </Box>
  );
};
