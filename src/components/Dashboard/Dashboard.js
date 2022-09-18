import { Box } from '@mui/material';
import Uploader from '../Uploader/Uploader';
import style from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.card}>
        <Uploader />
      </Box>
      <Box className={style.card}>
        <Uploader />
      </Box>
    </Box>
  );
};

export default Dashboard;
