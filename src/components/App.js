import * as React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard/Dashboard';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Theme from '../Theme.js';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: 'flex', backgroundColor: '#F5F6F8', height: '100vh'}}>
        <Sidebar toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            mx:'auto',
            p: 2,
            flexGrow: 1,
            overflow: 'auto',
            maxWidth: 1500,
          }}
        >
          <Box>
            <Dashboard />
          </Box>
          <Box>
            <Copyright sx={{ mt: 4 }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}