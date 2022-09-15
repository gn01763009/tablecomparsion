import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
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
        <Divider sx={{ my: 1 }} />
      </List>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'absolute',
          width: '100%',
          bottom: 0,
          left:0,
        }}
      >
        <IconButton
          aria-label="open drawer"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </Drawer>
  )
}