import { useState, useEffect, createRef } from 'react';
import Uploader from '../Uploader/Uploader';
import Preview from '../Preview'
import AnalyzeBtn from '../AnalyzeBtn';

import { v4 as uuidv4 } from 'uuid';

// bouncing animation
import Bouncing from '../Bouncing/';

//MUI
import { Box } from '@mui/material';

const Dashboard = () => {
  const [dataPreview, setDataPreview] = useState();
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
    console.log('data',data)
    const id = uuidv4();
    const dataPreview = {
      id,
      fileName: id,
      rows:[],
      cols:[],
    }
    const rowsComparsion = () => {

    }
    // setDataPreview()
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
          <Bouncing>
            <Preview dataPreview={dataPreview} />
          </Bouncing>
        )
      : null
      }
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