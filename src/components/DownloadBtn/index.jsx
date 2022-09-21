import { Zoom } from "@mui/material";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";

const DownloadBtn = ({ downloadFile, contentText }) => {
  
  const downloadHandler = () => {
    (contentText === '下載 .xlsx 檔')
    ? console.log('downloading .xlsx right now', downloadFile)
    : console.log('downloading .csv right now', downloadFile)
  };

  return (
    <Zoom
      in={true}
      style={{ transitionDelay: '500ms'}}
      sx={{
        display: 'inline-block',
        width: 140,
        mt: 2,
        mb: 2,
        ml: 2,
        mr: 2,
        padding: 2,
        color: 'white',
        boxSizing: 'border-box',
        borderRadius: 2,
        background: (theme) => theme.palette.secondary.main,
        ':hover': {
          bgcolor: '#776cff',
          color: 'white',}
      }}
    >
      <Button
        size='large'
        onClick={downloadHandler}
        disabled={downloadFile === undefined || downloadFile === null}
      >
        {contentText}
      </Button>
    </Zoom>
  )
}

export default DownloadBtn;