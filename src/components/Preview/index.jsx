import React from 'react'

//MUI
import { Box } from "@mui/material";

const Preview = () => {
  return (
    <Box
    sx={{
      minWidth: '250px',
      height: '600px',
      maxHeight: '500px',
      flexGrow: 1,
      boxSizing: 'border-box',
    }}
    >
      <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        border: '2px #c0c0c0 dashed',
        borderRadius: 4,
        position: 'relative',
      }}
      >

      </Box>
    </Box>
  )
}

export default Preview
