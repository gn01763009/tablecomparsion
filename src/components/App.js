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
      <Box sx={{ display: 'flex' }}>
        <Sidebar toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Box sx={{ mt: 4, mb: 4, width:'96%', ml:'3.9%', }}>
            <Dashboard />
          </Box>
          <Box>
            <Copyright sx={{ pt: 4 , }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}