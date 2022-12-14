import React from 'react'
import {Zoom} from "react-awesome-reveal";
import './index.css';
//MUI
import { Box } from "@mui/material";

const Bouncing = ({children, deplay}) => {
  return (
    <Zoom duration={500} delay={deplay*300} triggerOnce className="react-reveal">
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
          {children}
      </Box>
    </Zoom>
  )
}

export default Bouncing
