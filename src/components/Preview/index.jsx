import React, { useState, useEffect } from 'react'

//MUI
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const styles = {
  added: {
    color: "green",
    backgroundColor: "#b5efdb",
    fontSize: "20px",
  },
  removed: {
    color: "red",
    backgroundColor: "#fec4c0",
    fontSize: "20px",
  },
};

const DiffCell = ({props}) => {
  return (
    <span>{typeof props.value !== 'object'? (props.value) : (
      props.value.map((group, idx) => {
        const { value, added, removed } = group;
        let nodeStyles;
        if (added) nodeStyles = styles.added;
        if (removed) nodeStyles = styles.removed;
        return <span key={idx} style={nodeStyles}>{value}</span>;
      })
    )}</span>
  );
};

const Preview = ({dataPreview}) => {
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);

  useEffect(() => {
    const {cols, rows} = dataPreview;
    let newCol = cols;
    let newRow = rows;
    newCol = newCol.map((col)=> {
      return {...col, renderCell: (props)=> <DiffCell props={props}/>}
    })
    setColumn(newCol)
    setRow(newRow)
  }, [dataPreview])
  return (
    <Box
    sx={{
      minWidth: '250px',
      height: '600px',
      maxHeight: '500px',
      flexGrow: 1,
      boxSizing: 'border-box',
      overflow: 'auto',
      borderRadius: 2,
      '& .added': {
        backgroundColor: '#b5efdb',
        background: "linear-gradient(45deg, green 25%,#b5efdb 25%, #b5efdb 50%, green 50%, green 75%, #b5efdb 75%)",
        backgroundSize:"20px 20px",
        color: 'transparent',
        opacity: '30%',
      },
      '& .removed': {
        backgroundColor: '#fec4c0',
        background: "linear-gradient(45deg, red 25%,#fec4c0 25%, #fec4c0 50%, red 50%, red 75%, #fec4c0 75%)",
        backgroundSize:"20px 20px",
        color: 'transparent',
        opacity: '30%',
      },
      '& .new': {
        backgroundColor: '#b5efdb',
      },
      '& .old': {
        backgroundColor: '#fec4c0',
      },
    }}
    >
        <DataGrid 
        getRowHeight={() => 'auto'}
        rows={row}
        columns={column}
        hideFooter
        height={'100%'}
        sx={{
          fontSize: "16px",
          '& .MuiDataGrid-cell':{
            textAlign: 'center'
          }
        }}
        getCellClassName={(params) => {
          if(!params.value) return;
          if(params.row.className) {
            return params.row.className
          }
        }}
        />
    </Box>
  )
}

export default Preview