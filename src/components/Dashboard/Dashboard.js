import { useState, useEffect } from 'react';
import Uploader from '../Uploader/Uploader';
import Preview from '../Preview'

import { v4 as uuidv4 } from 'uuid';

//MUI
import { Box } from '@mui/material';
import Zoom from '@mui/material/Zoom';

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
  const divStyle = {
    margin: ".5%",
    marginBottom: "2%",
    borderRadius: '18px',
    boxSizing: 'border-box',
    boxShadow: '0px 6px 10px 0px #00000040',
    textAlign: 'center',
    flexGrow: 1,
  };

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
        {/* {data.map(ele => {
          return (            
            <Zoom in={true} key={ele.id}>
              <div style={divStyle}>
                <Uploader data={ele} setData={setData} ref={ref} />
              </div>
            </Zoom>
          )
        })}; */}

        {data.map(ele => {
          if (ele.id !== data[0].id) {
            return (            
              <Zoom in={true} key={ele.id} style={{ transitionDelay: true ? '300ms' : '0ms' }}>
                <div style={divStyle}>
                  <Uploader data={ele} setData={setData} ref={ref} />
                </div>
              </Zoom>
            )  
          } else {
            return (            
              <Zoom in={true} key={ele.id}>
                <div style={divStyle}>
                  <Uploader data={ele} setData={setData} ref={ref} />
                </div>
              </Zoom>
            )
          }
        })}
      </Box>
      <Preview dataPreview={dataPreview} />
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