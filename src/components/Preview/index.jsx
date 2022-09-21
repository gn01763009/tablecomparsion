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
      props.value.map(group => {
        const { value, added, removed } = group;
        let nodeStyles;
        if (added) nodeStyles = styles.added;
        if (removed) nodeStyles = styles.removed;
        return <span style={nodeStyles}>{value}</span>;
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
      },
      '& .removed': {
        backgroundColor: '#fec4c0',
      },
    }}
    >
      <DataGrid 
      getRowHeight={() => 'auto'}
      rows={row}
      columns={column}
      hideFooter
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
