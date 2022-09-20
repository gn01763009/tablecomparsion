import { Zoom, Box } from "@mui/material";
import Button from "@mui/material/Button";

const AnalyzeBtn = () => {
  return (
    // <Box sx={{width: '100%', display: 'block'}}>
    <Zoom
      in={true}
      sx={{
        display: 'flex',
        mt: 2,
        mb: 2,
        ml: 'auto',
        mr: 'auto',
        padding: 2,
        color: 'other.white',
        background: (theme) => theme.palette.secondary.main,
        ':hover': {
          bgcolor: '#776cff',
          color: 'other.white',}
      }}
    >
      <Button
        size='large'
      >
        開始比對...
      </Button>
    </Zoom>
    // </Box>
  )
}

export default AnalyzeBtn;
