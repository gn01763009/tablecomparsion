import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from "@mui/material";
import style from './Uploader.module.css';
import * as XLSX from "xlsx";

const fileTypes = ["xlsx", "jpeg", "xls"];

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

  const card = style.card;

return (
  <>
    <FileUploader
      handleChange={fileHandler}
      name="file"
      types={fileTypes}
      hoverTitle=" "
      classes={card}
      children={
        <div className={style.droparea}>
          <div className={style.iconWrapper}>
            <UploadFileIcon 
              fontSize='large'
              style={{
                color: 'white',
              }}
            />
          </div>
          <h3 className={style.description}>
            拖曳到此即可，只支援 xlsx(excel) 檔案
          </h3>
          <Button
            variant="contained"
            disableElevation
            size="large"
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              mt: '19.52%',
            }}
          >
            拖曳或上傳檔案
          </Button>
        </div>
      }
    />
    {/* <p>{file ? `${fileName}` : "尚未上傳檔案"}</p> */}
  </>
  );
};

export default Uploader;
