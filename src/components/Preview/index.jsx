import React from 'react'

//MUI
import { Box } from "@mui/material";

const Preview = () => {
  return (
    <Box
    sx={{
      margin: 1,
      marginBottom: 2,
      borderRadius: '18px',
      padding: 2.5,
      boxShadow: '0px 6px 10px 0px #00000040',
      textAlign: 'center',
      minWidth: '250px',
      height: '600px',
      maxHeight: '500px',
      flexGrow: 1,
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
