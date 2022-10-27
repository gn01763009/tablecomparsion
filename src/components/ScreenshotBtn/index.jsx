import React, {useRef, useState, useEffect} from 'react';
import html2canvas from 'html2canvas';

//comonepent
import Preview from '../Preview';

//MUI
import { Zoom } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from "@mui/material";

const ScreenshotBtn = ({previewRef, dataPreview2}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasEle = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleClickOpen = () => {
    setLoading(true);
    setOpen(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if(!open) return;
    if(loading) return;
    var previewEle = previewRef.current;
    previewEle.id = 'real';

    setTimeout(() => {
      html2canvas(previewEle).then(function(canvas) {
        canvasEle.current.appendChild(canvas);
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        setImageUrl(image)
      });
      previewEle.remove();
    }, 500);
    document.body.appendChild(previewEle);
  }, [loading])

  const handleClose = () => {
    setOpen(false);
  };

  const onScreen = () => {
    window.location.href = imageUrl;
  }

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
      <div>
        <Button
          size='large'
          onClick={handleClickOpen}
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
          下載 .png 檔
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
            {"確認下載預覽圖？"}
          </DialogTitle>
          <DialogContent>
            <Box ref={canvasEle}><Preview dataPreview={dataPreview2} index={1} previewRef={previewRef} /></Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={onScreen} autoFocus>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Zoom>
  )
}

export default ScreenshotBtn
