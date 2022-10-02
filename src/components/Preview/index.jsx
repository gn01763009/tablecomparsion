import React, { useState, useLayoutEffect } from 'react'

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
  newAdded: {
    color: "green",
    backgroundColor: "#b5efdb",
    fontSize: "16px",
    opacity: "50%",
  },
  oldRemoved: {
    color: "red",
    backgroundColor: "#fec4c0",
    fontSize: "16px",
    opacity: "50%",
  },
};

const DiffCell = ({props, index}) => {
  return (
    <span>{typeof props.value !== 'object'? (props.value) : (
      props.value.map((group, idx) => {
        const { value, added, removed } = group;
        let nodeStyles;
        if(index === 0) {
          if (added) nodeStyles = styles.newAdded;
          if (removed) nodeStyles = styles.removed;
        }
        if(index === 1) {
          if (added) nodeStyles = styles.added;
          if (removed) nodeStyles = styles.oldRemoved;
        }

        return <span key={idx} style={nodeStyles}>{value}</span>;
      })
    )}</span>
  );
};

const Preview = ({dataPreview, index}) => {
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);

  useLayoutEffect(() => {
    const {cols, rows} = dataPreview;
    let newCol = cols;
    let newRow = rows;
    newCol = newCol.map((col)=> {
      return {...col, renderCell: (props)=> <DiffCell props={props} index={index}/>}
    })
    setColumn(newCol)
    setRow(newRow)
  }, [dataPreview])
  return (
    <Box
    sx={{
      minWidth: '250px',
      flexGrow: 1,
      boxSizing: 'border-box',
      overflow: 'hidden',
      borderRadius: 2,
      '& .added': {
        backgroundColor: '#b5efdb',
        background: "linear-gradient(45deg, green 25%,#b5efdb 25%, #b5efdb 50%, green 50%, green 75%, #b5efdb 75%)",
        backgroundSize:"20px 20px",
        color: 'transparent',
        opacity: '10%',
      },
      '& .removed': {
        backgroundColor: '#fec4c0',
        background: "linear-gradient(45deg, red 25%,#fec4c0 25%, #fec4c0 50%, red 50%, red 75%, #fec4c0 75%)",
        backgroundSize:"20px 20px",
        color: 'transparent',
        opacity: '10%',
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
        disableColumnMenu
        sx={{
          position:'relative',
          top: '-56px',
          height:'569px',
          borderRadius: 2,
          fontSize: "14px",
          '& .MuiDataGrid-cell':{
            textAlign: 'center'
          }
        }}
        getCellClassName={(params) => {
          if(!params.value) return;
          if(params.row.modified) {
            return params.row.modified
          }
        }}
        />
    </Box>
  )
}

export default Preview