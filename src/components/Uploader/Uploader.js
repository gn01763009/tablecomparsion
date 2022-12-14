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
import { DataGrid } from '@mui/x-data-grid';

const fileTypes = ["xlsx", "csv", "xls"];

const generateAlphabet = (capital = true) => {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
};

const Uploader = ({data, setData}) => {
  const {fileName, id, status, rows, cols} = data;

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
        if(alphabet[idx] === 'B'){
          demoCols.push({
            field: alphabet[idx],
            headerName: alphabet[idx],
            width: 400,
          });
          return;
        }
        demoCols.push({
          field: alphabet[idx],
          headerName: alphabet[idx],
          width: 80,
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
    sx={{
      textAlign: 'center',
      minWidth: '250px',
      maxWidth: '700px',
      height: '600px',
      maxHeight: '500px',
      flexGrow: 1,
      boxSizing: 'border-box',
      background: 'transparent',
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
        overflow: 'hidden',
      }}
      >
        {status === 'DONE' ? (
          <DataGrid 
            getRowHeight={() => 'auto'}
            rows={rows}
            columns={cols}
            hideFooter
            height={'100%'}
            sx={{
              fontSize: "14px",
              position:'relative',
              top: '-56px',
              height:'569px',
              borderRadius: 2,
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
        ): (
          <FileUploader
          handleChange={fileHandler}
          name="file"
          types={fileTypes}
          hoverTitle="????????????"
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
              ??????????????????????????? xlsx, csv, xls ??????
            </h3>
            {status === 'ERROR' ? (
              <Typography sx={{width: '100%', wordBreak: 'break-all', color: 'red'}}>????????????????????????????????????????????????????????????</Typography>
            ): null}
            <Typography sx={{width: '100%', wordBreak: 'break-all'}}>{fileName ? `${fileName}` : "??????????????????"}</Typography>
          </div>
        </FileUploader>
      )}
      </Box>
    </Box>
    );
};

export default Uploader;
