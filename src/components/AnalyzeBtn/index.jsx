import { Zoom } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";

const AnalyzeBtn = ({checkedClick, setCheckedClick}) => {
  
  const clickHandler = () => setCheckedClick(!checkedClick);

  return (
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
        borderRadius: 2,
        background: (theme) => theme.palette.secondary.main,
        ':hover': {
          bgcolor: '#776cff',
          color: 'other.white',}
      }}
    >
      <Button
        size='large'
        onClick={clickHandler}
      >
        開始比對...
      </Button>
    </Zoom>
  )
}

export default AnalyzeBtn;
