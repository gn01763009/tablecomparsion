import * as React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard/Dashboard';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Theme from '../Theme.js';

export default function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: 'flex', backgroundColor: '#F5F6F8', height: '100vh'}}>
        <Sidebar toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} />
        <Dashboard />
      </Box>
    </ThemeProvider>
  );
}