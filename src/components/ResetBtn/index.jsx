import { Zoom } from "@mui/material";
import Button from "@mui/material/Button";

const ResetBtn = ({resetClick, setResetClick}) => {

  const clickHandler = () => setResetClick(!resetClick);

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
        background: (theme) => theme.palette.primary.red,
        ':hover': {
          bgcolor: '#ce467b',
          color: 'other.white',}
      }}
    >
      <Button
        size='large'
        onClick={clickHandler}
      >
        重置Table
      </Button>
    </Zoom>
  )
}

export default ResetBtn