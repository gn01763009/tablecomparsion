import { useState } from "react";
import './Uploader.css';
import * as XLSX from "xlsx";
import { FileUploader } from "react-drag-drop-files";

//MUI
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

// MUI-icon
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';

const fileTypes = ["xlsx", "csv", "xls"];

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState();
  const [sheetData, setSheetData] = useState([]);

  const fileHandler = async (files) => {
    setFile(files);
    setFileName(files.name);
    // setFile(URL.createObjectURL(files));
    const data = await files.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    setSheetData(jsonData);
  };

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
      maxWidth: '600px',
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
      <FileUploader
        handleChange={fileHandler}
        name="file"
        types={fileTypes}
        hoverTitle="拖曳至此"
        classes="card"
        onDrop={(file) => console.log(file)}
        onTypeError={(err) => console.log(err)}
      >
        <div className="droparea">
          <div className="iconWrapper">
            <UploadRoundedIcon
              fontSize='large'
              style={{
                color: 'black',
              }}
            />
          </div>
          <h3>
            拖曳到此即可，支援 xlsx, csv, xls 檔案
          </h3>
        <Typography sx={{width: '100%', wordBreak: 'break-all'}}>{file ? `${fileName}` : "尚未上傳檔案"}</Typography>
        </div>
      </FileUploader>
      </Box>
    </Box>
    );
};

export default Uploader;
