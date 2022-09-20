import { useState, useEffect, createRef } from 'react';
import Uploader from '../Uploader/Uploader';
import Preview from '../Preview'

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
  const [dataPreview, setDataPreview] = useState();
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
    console.log('data',data)
    const alphabet = generateAlphabet();
    const data1 = data[0];
    const data2 = data[1];
    console.log('data1',data1)
    console.log('data2',data2)
    const id = uuidv4();
    const rows1 = data1.rows;
    const cols1 = data1.cols;
    const rows2 = data2.rows;
    const cols2 = data2.cols;
    const combining = (arg1 = '', arg2 = '') =>{
      console.log('arg1',arg1)
      console.log('arg2',arg2)
      const argString1 = arg1 ? `綠色：${arg1}` : arg1;
      const argString2 = arg2 ? `紅色：${arg2}` : arg2;
      if (!arg1 && !arg2){
        return ''
      } else if (!arg1 || !arg2) {
        return argString1+argString2
      }else {
        return `${argString1} | ${argString2}`
      }
    }
    const rowsComparsion = (rows1, cols1, rows2, cols2) => {
      // schema
      // {
      //   id: 0,
      //   alphabet[0]: 'x',
      //   alphabet[1]: 'x'....
      // }
      let newRows = [];

      const longerCols = cols1 > cols2 ? cols1 : cols2;
      console.log('longerCols',longerCols);

      const storing = (ro1='',ro2='') => {
        let newRow = {};
        console.log('storing ro1',typeof ro1)
        console.log('storing ro2',typeof ro2)
        longerCols.forEach((col, idx) => {
          const {field} = col;
          newRow = {
            ...newRow,
            [field]: combining(rows1[ro1] !== undefined ? rows1[ro1][field]: '', rows2[ro2] !== undefined ? rows2[ro2][field]: '')
          }
        })
        console.log('newRow',newRow);
        return newRow;
      }
      let block = 0;
      let noFitArray = [];
      let singleRow = false;
      top:
      for (let ro1 = 0; ro1 < rows1.length; ro1++) {
        const row1 = rows1[ro1]['A'];
        console.log('ro1',ro1)
        loop2:
        for (let ro2 = 0 + block; ro2 < rows2.length; ro2++) {
          const row2 = rows2[ro2]['A'];
          console.log('ro2',ro2)
          if(row1 === undefined && row2 === undefined){
            console.log(`undefined ro1 : ${ro1} | instant : ${row1}, ro2 : ${ro2} | instant : ${row2}`)
            // newRows進行比對
            console.log('noFitArray',noFitArray)
            if(noFitArray.findIndex(ele => ele < ro2) !== -1){
              block = noFitArray[noFitArray.findIndex(ele => ele < ro2)];
              console.log('blockxxx',block)
            } else if (noFitArray.findIndex(ele => ele === ro2) !== -1) {
              noFitArray.splice(noFitArray.findIndex(ele => ele === ro2), 1);
              block = ro2 + 1;
            } else {
              block = ro2 + 1;
            }
            console.log('block',block)
            singleRow = false;
            newRows.push(storing(ro1,ro2));
            continue top;
          } else if(row1 === '' && rows2 === ''){
            console.log(`'' ro1 : ${ro1} | instant : ${row1}, ro2 : ${ro2} | instant : ${row2}`)
            if(noFitArray.findIndex(ele => ele < ro2) !== -1){
              block = noFitArray[noFitArray.findIndex(ele => ele < ro2)];
            } else if (noFitArray.findIndex(ele => ele === ro2) !== -1) {
              noFitArray.splice(noFitArray.findIndex(ele => ele === ro2), 1);
              block = ro2 + 1;
            } else {
              block = ro2 + 1;
            }
            singleRow = false;
            newRows.push(storing(ro1,ro2));
            continue top;
          }else if ((typeof row1 === 'string' ? row1.trim(): row1) === (typeof row2 === 'string' ? row2.trim(): row2)){
            console.log(`一樣 ro1 : ${ro1} | instant : ${row1}, ro2 : ${ro2} | instant : ${row2}`)
            if(noFitArray.findIndex(ele => ele < ro2) !== -1){
              block = noFitArray[noFitArray.findIndex(ele => ele < ro2)];
            } else if (noFitArray.findIndex(ele => ele === ro2) !== -1) {
              noFitArray.splice(noFitArray.findIndex(ele => ele === ro2), 1);
              block = ro2 + 1;
            } else {
              block = ro2 + 1;
            }
            singleRow = false;
            newRows.push(storing(ro1,ro2));
            continue top;
          } else {
            console.log(`else ro1 : ${ro1} | instant : ${row1}, ro2 : ${ro2} | instant : ${row2}`)
            // 給row2 獨有值時
            if(noFitArray.findIndex(ele => ele < ro2) !== -1 && singleRow){
              block = noFitArray[noFitArray.findIndex(ele => ele < ro2)];
              noFitArray.splice(noFitArray.findIndex(ele => ele === ro2), 1);
              newRows.push(storing(ro2));
            }
            if(!noFitArray.find(ele => ele === ro2)) {
              noFitArray.push(ro2)
            }
            console.log('noFitArray',noFitArray)
            // 給row1 獨有值時
            if(ro2 === rows2.length) {
              newRows.push(storing(ro1));
              singleRow = true;
              continue top;
            }
          }
          
        }
      }
      console.log('newRows',newRows)
      return newRows;
    }
    const newdata = {
      id,
      fileName: id,
      rows:[],
      cols:rowsComparsion(rows1, cols1, rows2, cols2),
    }
    console.log('newdata',newdata)
    // setDataPreview(newdata)
  }, [data])

  const ref = createRef();

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
      <Bouncing>
        <Preview dataPreview={dataPreview} />
      </Bouncing>
    </Box>
    </Box>

  );
};

export default Dashboard;

// const dataSchema = [
//   {
//     id: 0, (Uploader id)
//     fileName:'fileName', 
//     status:'DONE',
//     rows: [
//       {
//         id: 0, (DataGrid id)
//         alphabet[0]: `${jsonData[0][0]}`,
//         alphabet[1]: `${jsonData[0][1]}`,
//         alphabet[2]: `${jsonData[0][2]}`,
//       },
//     ],
//     cols: [
//       {
//         field: alphabet[0],
//         headerName: "jsonData[1][idx]"
//       },
//     ]
//   },
//   {
//     id: 1, (Uploader id)
//     fileName:'fileName',
//     status:'boolean',
//     rows: [
//       {
//         id: 0, (DataGrid id)
//         alphabet[0]: `${jsonData[0][0]}`,
//         alphabet[1]: `${jsonData[0][1]}`,
//         alphabet[2]: `${jsonData[0][2]}`,
//       },
//     ],
//     cols: [
//       {
//         field: alphabet[0],
//         headerName: "jsonData[1][idx]"
//       },
//     ]
//   },
// ]