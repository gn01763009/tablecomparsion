import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';


import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
const drawerWidth = 256;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflow: 'hidden',
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Sidebar ({toggleDrawer, open}){
  return (
      <Drawer variant="permanent" open={open}>
      <List component="nav">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{
            color: (theme) => theme.palette.primary.main,
          }}/>
        </ListItemButton>
        <Divider sx={{ my: 0.8 }} />
      </List>
      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          left:15.5,
      }}>
        <IconButton
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
        </IconButton>
      </Box>
    </Drawer>
  )
}