import { useState, useEffect, createRef } from 'react';
import Uploader from '../Uploader/Uploader';
import Preview from '../Preview';
import * as diff from "diff";
import AnalyzeBtn from '../AnalyzeBtn';
import DownloadBtn from '../DownloadBtn';

import { v4 as uuidv4 } from 'uuid';

// bouncing animation
import Bouncing from '../Bouncing/';

//MUI
import { Box } from '@mui/material';

const generateAlphabet = (capital = true) => {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
};

const Dashboard = () => {
  const [dataPreview, setDataPreview] = useState({cols:[], rows:[]});
  const [dataDownload, setDataDownload] = useState({cols:[], rows:[]});
  const [checkedClick, setCheckedClick] = useState(false);
  const [downloadFile, setDownloadFile] = useState();
  const [data, setData] = useState(()=>{
      const init = (num) => {
        let initData = [];
        for (let idx = 0; idx < num; idx++) {
          initData.push({
            id: uuidv4(),
            fileName: '',
            rows: [],
            cols: [],
          })
        }
        return initData;
      }
      return init(2);
  })
  useEffect(() => {
    if (data.find((ele)=>ele.status !== 'DONE')) return;
    const alphabet = generateAlphabet();
    const data1 = data[0];
    const data2 = data[1];
    const id = uuidv4();
    const rows1 = data1.rows;
    const cols1 = data1.cols;
    const rows2 = data2.rows;
    const cols2 = data2.cols;
    const longerCols = cols1.length > cols2.length ? cols1 : cols2; 

    // header handler A col
    const rowsComparsion = (download = false) => {
      const newDatas = [];
      const longerRows = rows1.length > rows2.length ? rows1 : rows2; 
      longerRows.forEach((row, index) => {
        const ro1 = rows1[index] ? rows1[index]['A'] ? rows1[index]['A'] : '' : ''
        const ro2 = rows2[index] ? rows2[index]['A'] ? rows2[index]['A'] : '' : ''
        const diffProps = diff.diffWordsWithSpace(ro1,ro2)
        diffProps.forEach(diffprop => {
          const { value, added, removed } = diffprop;
          //ro2 => added
          if(added) {
            newDatas.push({
              ...rows2[index],
              className: "added",
            })
          }
          //ro1 => removed
          if(removed) {
            if(download) return;
            newDatas.push({
              ...rows1[index],
              className: "removed",
            })
          }
          if (!added && !removed) {
            let sameRow = {};
            alphabet.forEach(alph =>{
              const row1 = rows1[index] ? rows1[index][alph] === undefined ? undefined : rows1[index][alph] : '';
              const row2 = rows2[index] ? rows2[index][alph] === undefined ? undefined : rows2[index][alph] : '';
              if (row1 === undefined && row2 === undefined) {
                return;
              }
              let newValue = '';
              let objValue = diff.diffWordsWithSpace(row1.toString(),row2.toString());
              diff.diffWordsWithSpace(row1.toString(),row2.toString()).forEach(dif => {
                const { value, added, removed } = dif;
                if(added){
                    newValue = newValue ? `${newValue} | 紅色：${value} |` : `| 紅色：${value} |`;
                }
                // row1 = removed
                if(removed){
                    newValue = newValue ? `${newValue} | 綠色：${value} |` : `| 綠色：${value} |`;
                }
                // same
              if (!added && !removed) {
                    newValue = newValue + value;
                }
              })
              if(download){
                sameRow = {
                  ...sameRow,
                  [alph] : newValue
                }
              } else {
                sameRow = {
                  ...sameRow,
                  [alph]: objValue,
                };
              }
            })
            newDatas.push(sameRow)
          }
        })
      })
      newDatas.forEach((newDat, id)=>{
        newDatas[id].id = id
      })
      return newDatas;
    }
    const previewData = {
      id,
      fileName: id,
      rows:rowsComparsion(),
      cols:longerCols,
    }
    console.log('previewData',previewData)
    setDataPreview(previewData)
    const downloadData = {
      id,
      fileName: id,
      rows:rowsComparsion(true),
      cols:longerCols,
    }
    console.log('downloadData',downloadData)
    setDataDownload(downloadData)
    setDownloadFile(data);
    console.log('data from Dashboard', data);
  }, [data])

  const ref = createRef();
  console.log('click status from Dashboard', checkedClick);

  return (
    <Box
    component="main"
    sx={{
      width: '100%',
      height: '100%',
      overflow: 'auto',
    }}
    >
    <Box
    sx={{
      mx:'auto',
      p: 2,
      flexGrow: 1,
      overflow: 'hidden',
      maxWidth: 1500,
    }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {data.map((ele, idx) => {
          return (            
            <Bouncing key={ele.id} deplay={idx}>
              <Uploader data={ele} setData={setData} ref={ref} />
            </Bouncing>
          )
        })}
      </Box>
      {data.filter(obj => obj.status !== 'DONE').length ? null : <AnalyzeBtn checkedClick={checkedClick} setCheckedClick={setCheckedClick} />}
      {checkedClick 
        ? (
          <>
            <Bouncing>
              <Preview dataPreview={dataPreview} />
            </Bouncing>
            <Box sx={{
              display: 'flex',
              mt: 2,
              mb: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <DownloadBtn contentText={'下載 .xlsx 檔'} downloadFile={downloadFile} />
              <DownloadBtn contentText={'下載 .csv 檔案'} downloadFile={downloadFile} />
            </Box>
          </>
        )
      : null
      }
    </Box>
    </Box>

  );
};

export default Dashboard;