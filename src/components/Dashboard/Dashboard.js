import { useState, useEffect, createRef } from 'react';
import Uploader from '../Uploader/Uploader';
import Preview from '../Preview';
import * as diff from "diff";
import AnalyzeBtn from '../AnalyzeBtn';
import DownloadBtn from '../DownloadBtn';

import { v4 as uuidv4 } from 'uuid';

// bouncing animation
import Bouncing from '../Bouncing/';

// sync scrolling

//MUI
import { Box } from '@mui/material';

const generateAlphabet = (capital = true) => {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
};

const Dashboard = () => {
  const [dataPreview1, setDataPreview1] = useState({cols:[], rows:[]});
  const [dataPreview2, setDataPreview2] = useState({cols:[], rows:[]});
  const [dataDownload, setDataDownload] = useState({cols:[], rows:[]});
  const [checkedClick, setCheckedClick] = useState(false);
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
    const rows1 = data1.rows;
    const cols1 = data1.cols;
    const rows2 = data2.rows;
    const cols2 = data2.cols;
    const longerCols = cols1.length > cols2.length ? cols1 : cols2; 

    const comparsionHandler = (download = false , option = 1) => {
    const rowArr1 = rows1.map((co) => co['A'] ? co['A'] : '')
    const rowArr2 = rows2.map((co) => co['A'] ? co['A'] : '')
    const diffprops = diff.diffArrays(rowArr1, rowArr2);
    console.log('diffprops',diffprops)
    const newArray = [];
    diffprops.forEach((diffprop, idx)=>{
      const { value, added, removed } = diffprop;
      value.forEach(val => {
        let obj = {
          id: idx,
          "A": val
        }
        if(added) {
          obj = {...obj, className: "added"}
        }
        if(removed) {
          obj = {...obj, className: "removed"}
        }
        return newArray.push(obj)
      })
    })
    console.log('newArray',newArray)
    let idx1 = 0;
    let idx2 = 0;
    const newCols1 = [];
    const newCols2 = [];
    newArray.forEach((ele)=> {
      const ro1 = rows1[idx1] ? rows1[idx1]['A'] ? rows1[idx1]['A'] : '' : '';
      const ro2 = rows2[idx2] ? rows2[idx2]['A'] ? rows2[idx2]['A'] : '' : '';
      if(ele.className === 'added') {
        // idx2 + 1 to skip
        let x = {};
        Object.keys(rows2[idx2]).map(ke => {
          x = {...x, [ke]:'x'};
        })
        newCols2.push({...rows2[idx2], className:"new"})
        newCols1.push({...x, className: "added"})
        console.log('x added',{...x, className: "added"})
        idx2 += 1;
        return;
      }

      if(ele.className === 'removed') {
        // idx1 + 1 to skip
        let x = {};
        Object.keys(rows1[idx1]).map(ke => {
          x = {...x, [ke]:'x'};
        })
        newCols1.push({...rows1[idx1], className:"old"})
        newCols2.push({...x, className: "removed"})
        console.log('x removed',{...x, className: "removed"})
        idx1 += 1;
        return;
      }

      if(ro1 !== ro2) {
        console.log('notequal', ro1)
        console.log('notequal', ro2)
        return;
      }
      let sameRow = {};
      alphabet.forEach(alph =>{
        const row1 = rows1[idx1] ? rows1[idx1][alph] === undefined ? undefined : rows1[idx1][alph] : '';
        const row2 = rows2[idx2] ? rows2[idx2][alph] === undefined ? undefined : rows2[idx2][alph] : '';
        if (row1 === undefined && row2 === undefined) {
          return;
        }
        let newValue = '';
        let objValue = diff.diffWordsWithSpace(row1.toString(),row2.toString());
        diff.diffWordsWithSpace(row1.toString(),row2.toString()).forEach(dif => {
          const { value, added, removed } = dif;
          // row1 = removed
          if(removed){
              newValue = newValue ? `${newValue} | new：${value} |` : `| new：${value} |`;
          }
          if(added){
              newValue = newValue ? `${newValue} | old：${value} |` : `| old：${value} |`;
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
      newCols1.push(sameRow)
      newCols2.push(sameRow)
      idx1 ++
      idx2 ++
    })
    newCols1.forEach((newDat, id)=>{
      newCols1[id].id = id
    })
    newCols2.forEach((newDat, id)=>{
      newCols2[id].id = id
    })
    console.log('newCols1',newCols1)
    console.log('newCols2',newCols2)
    if(option === 1) {
      return newCols1;
    } else {
      return newCols2;
    }
  }



    // header handler A col
    // const rowsComparsion = (download = false) => {
    //   const newDatas = [];
    //   const oldTree = [];
    //   const newTree = [];
    //   const longerRows = rows1.length > rows2.length ? rows1 : rows2; 
    //   longerRows.forEach((row, index) => {
    //     const ro1 = rows1[index] ? rows1[index]['A'] ? rows1[index]['A'] : '' : ''
    //     const ro2 = rows2[index] ? rows2[index]['A'] ? rows2[index]['A'] : '' : ''
    //     // console.log(`ro1 : ${ro1}, ro2 : ${ro2}`)
    //     const diffProps = diff.diffWordsWithSpace(ro1,ro2)
    //     diffProps.forEach(diffprop => {
    //       // console.log('diffprop',diffprop)
    //       const { value, added, removed } = diffprop;
    //       //ro2 => added
    //       if(added) {
    //         newDatas.push({
    //           ...rows2[index],
    //           className: "added",
    //         })
    //         oldTree.push({

    //         })
    //       }
    //       //ro1 => removed
    //       if(removed) {
    //         if(download) return;
    //         newDatas.push({
    //           ...rows1[index],
    //           className: "removed",
    //         })
    //       }
    //       if (!added && !removed) {
    //         let sameRow = {};
    //         alphabet.forEach(alph =>{
    //           const row1 = rows1[index] ? rows1[index][alph] === undefined ? undefined : rows1[index][alph] : '';
    //           const row2 = rows2[index] ? rows2[index][alph] === undefined ? undefined : rows2[index][alph] : '';
    //           if (row1 === undefined && row2 === undefined) {
    //             return;
    //           }
    //           let newValue = '';
    //           let objValue = diff.diffWordsWithSpace(row1.toString(),row2.toString());
    //           diff.diffWordsWithSpace(row1.toString(),row2.toString()).forEach(dif => {
    //             const { value, added, removed } = dif;
    //             // row1 = removed
    //             if(removed){
    //                 newValue = newValue ? `${newValue} | new：${value} |` : `| new：${value} |`;
    //             }
    //             if(added){
    //                 newValue = newValue ? `${newValue} | old：${value} |` : `| old：${value} |`;
    //             }
    //             // same
    //           if (!added && !removed) {
    //                 newValue = newValue + value;
    //             }
    //           })
    //           if(download){
    //             sameRow = {
    //               ...sameRow,
    //               [alph] : newValue
    //             }
    //           } else {
    //             sameRow = {
    //               ...sameRow,
    //               [alph]: objValue,
    //             };
    //           }
    //         })
    //         newDatas.push(sameRow)
    //       }
    //     })
    //   })
    //   newDatas.forEach((newDat, id)=>{
    //     newDatas[id].id = id
    //   })
    //   return newDatas;
    // }
    // const previewData1 = {
    //   id,
    //   fileName: id,
    //   rows:rowsComparsion(),
    //   cols:longerCols,
    // }
    // setDataPreview(previewData)
    const previewData1 = {
      id: uuidv4(),
      fileName: uuidv4(),
      rows:comparsionHandler(false,1),
      cols:longerCols,
    }
    const previewData2 = {
      id : uuidv4(),
      fileName: uuidv4(),
      rows:comparsionHandler(false,2),
      cols:longerCols,
    }
    console.log('previewData1',previewData1)
    console.log('previewData2',previewData2)
    setDataPreview1(previewData1)
    setDataPreview2(previewData2)
    // const downloadData = {
    //   id,
    //   fileName: id,
    //   rows:comparsionHandler(true,1),
    //   cols:longerCols,
    // }
    // setDataDownload(downloadData)
  }, [data])

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
            <Bouncing key={ele.id} deplay={idx} color={idx+1} >
              <Uploader data={ele} setData={setData} />
            </Bouncing>
          )
        })}
      </Box>
      {data.filter(obj => obj.status !== 'DONE').length ? null : <AnalyzeBtn checkedClick={checkedClick} setCheckedClick={setCheckedClick} />}
      {checkedClick 
        ? (
          <>
            <Box sx={{
                display: 'flex',
                mt: 2,
                mb: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <Bouncing>
                  <Preview dataPreview={dataPreview1} />
                </Bouncing>
                <Bouncing>
                  <Preview dataPreview={dataPreview2} />
                </Bouncing>
            </Box>
            <Box sx={{
              display: 'flex',
              mt: 2,
              mb: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <DownloadBtn contentText={'下載 .xlsx 檔'} dataDownload={dataDownload} />
              <DownloadBtn contentText={'下載 .csv 檔案'} dataDownload={dataDownload} />
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