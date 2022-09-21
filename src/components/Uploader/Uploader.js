import { useState, forwardRef } from "react";
import './Uploader.css';
import * as XLSX from "xlsx";
import { FileUploader } from "react-drag-drop-files";

//MUI
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

// MUI-icon
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';

const fileTypes = ["xlsx", "csv", "xls"];

const generateAlphabet = (capital = true) => {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
};

const Uploader = forwardRef(({data, setData}, ref) => {
  const {fileName, id, rows, cols, status} = data;

  const fileHandler = async (file) => {
    const alphabet = generateAlphabet();
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const colsHandler = (jsonData) => {
      const demoCols = [];
      jsonData.forEach((data, idx) => {
        if (jsonData[1][idx] === undefined) return;
        demoCols.push({
          field: alphabet[idx],
          headerName: alphabet[idx],
          width: 100
        });
      });
      return demoCols;
    }
  
    const rowsHandler = (jsonData) => {
      // rows hanlder
      const demoRows = [];
      jsonData.forEach((data, index) => {
          let nestRows = {
            id: index
          };
          data.forEach((ele, idx) => {
            nestRows = {
              ...nestRows,
              [alphabet[idx]]: ele
            };
          });
          demoRows.push(nestRows);
        });
        return demoRows;
      };
      const fileData = {
        id,
        fileName: file.name,
        rows: rowsHandler(jsonData),
        cols: colsHandler(jsonData),
        status: 'DONE',
      };
    setData((prv)=> prv.map(dt => id === dt.id ? {...dt, ...fileData} : {...dt}))
  };

  const errorHandler = () => {
    setData((prv)=> prv.map(dt => id === dt.id ? {id, status: 'ERROR'} : {...dt}))
  }

  return (
    <Box
    ref={ref}
    sx={{
      textAlign: 'center',
      minWidth: '250px',
      maxWidth: '700px',
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
      <FileUploader
        handleChange={fileHandler}
        name="file"
        types={fileTypes}
        hoverTitle="拖曳至此"
        classes="card"
        onTypeError={errorHandler}
      >
        <div className="droparea">
          <div className="iconWrapper">
          {
          status !== 'DONE' ? (
            status === 'ERROR' ? (
              <ErrorIcon
                fontSize='large'
                style={{
                  color: 'red',
                }}
              />
            ) : (
              <UploadRoundedIcon
                fontSize='large'
                style={{
                  color: 'black',
                }}
              />
            )
          ) : (
            <DoneIcon
            fontSize='large'
            style={{
              color: 'green',
            }}
          />
          )}
          </div>
          <h3>
            拖曳到此即可，支援 xlsx, csv, xls 檔案
          </h3>
          {status === 'ERROR' ? (
            <Typography sx={{width: '100%', wordBreak: 'break-all', color: 'red'}}>不支援目前檔案或有錯誤，請試著重新整理！</Typography>
          ): null}
          <Typography sx={{width: '100%', wordBreak: 'break-all'}}>{fileName ? `${fileName}` : "尚未上傳檔案"}</Typography>
        </div>
      </FileUploader>
      </Box>
    </Box>
    );
});

export default Uploader;
