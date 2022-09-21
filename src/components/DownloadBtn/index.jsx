import { Zoom } from "@mui/material";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";

const generateAlphabet = (capital = true) => {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
};

const DownloadBtn = ({ dataDownload, contentText }) => {
  
  const downloadHandler = () => {
    (contentText === '下載 .xlsx 檔')
    ? xlsxHandler('xlsx')
    : xlsxHandler('csv')
  };

  const xlsxHandler = (fileType) => {
    const alphabet = generateAlphabet();
    if (dataDownload.rows === []) return;
    const colsLen = dataDownload.cols.length;
    const exportData = [];
    dataDownload.rows.forEach((row, idx) => {
      let data = row;
      delete data.id;
      if(idx === 0) return;
      exportData.push(data)
    })
    const headerData = [];
    alphabet.forEach((alp, idx) =>{
      if (idx >= colsLen) return;
        headerData.push(dataDownload.rows[0][alp] ? dataDownload.rows[0][alp] : '')
    })
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.sheet_add_aoa(ws, [headerData], { origin: "A1" });

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, `MySheet1.${fileType}`);
  }

  return (
    <Zoom
      in={true}
      style={{ transitionDelay: '500ms'}}
      sx={{
        display: 'inline-block',
        width: 140,
        mt: 2,
        mb: 2,
        ml: 2,
        mr: 2,
        padding: 2,
        color: 'white',
        boxSizing: 'border-box',
        borderRadius: 2,
        background: (theme) => theme.palette.secondary.main,
        ':hover': {
          bgcolor: '#776cff',
          color: 'white',}
      }}
    >
      <Button
        size='large'
        onClick={downloadHandler}
        disabled={dataDownload === undefined || dataDownload === null}
      >
        {contentText}
      </Button>
    </Zoom>
  )
}

export default DownloadBtn;