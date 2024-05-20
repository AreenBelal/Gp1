import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  return (
      <div className="Tableadmin" style={{direction:'rtl',marginLeft:'50px'}}>
      <h3 style={{marginRight:'250px'}}>المعلمون المتقدمون لأحد الفرص</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor:'#7aa77b'}}>
              <TableRow >
                <TableCell> <p style={{fontSize:'19px',color:'whitesmoke'}}> اسم المعلم</p></TableCell>
                <TableCell align="left">  <p style={{fontSize:'19px',color:'whitesmoke'}}>  هوية المعلم</p></TableCell>
                <TableCell align="left"> <p style={{fontSize:'19px',color:'whitesmoke'}}>  المادة المطلوبة</p></TableCell>
                
                <TableCell align="left"><p style={{fontSize:'19px',color:'whitesmoke'}}>  قبول/رفض </p></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="statusadmin" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Detailsadmin">
                  <p style={{fontSize:'20px',color:'gray'}}> تفاصيل </p>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
