import Uploader from '../Uploader/Uploader';
//MUI
import { Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 1500,
        overflow: 'hidden',
      }}
    >
      <Uploader />
      <Uploader />
    </Box>
  );
};

export default Dashboard;
