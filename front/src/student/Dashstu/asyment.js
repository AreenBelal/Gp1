import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Button,
} from "@mui/material";
import { AssignmentTurnedIn, InsertDriveFile } from "@mui/icons-material";

const AssignmentsPage = () => {
  const [submittedRowIndex, setSubmittedRowIndex] = useState(null);

  const submittedAssignmentsData = [
    {
      id: 1,
      branch: "الفرع A",
      courseName: "الدورة 1",
      file: "واجب1.pdf",
      startDate: "10/04/2024",
      endDate: "20/04/2024",
      teacher: "المدرس 1",
      grade: "A",
      reviewRequested: true,
    },
    {
      id: 2,
      branch: "الفرع A",
      courseName: "الدورة 1",
      file: "واجب1.pdf",
      startDate: "10/04/2024",
      endDate: "20/04/2024",
      teacher: "المدرس 1",
      grade: "B",
      reviewRequested: false,
    },
  ];

  const pendingAssignmentsData = [
    {
      id: 1,
      branch: "الفرع B",
      courseName: "الدورة 2",
      file: "واجب2.pdf",
      startDate: "12/04/2024",
      endDate: "22/04/2024",
      teacher: "المدرس 2",
      status: "قيد الانتظار",
    },
    {
      id: 2,
      branch: "الفرع B",
      courseName: "الدورة 2",
      file: "واجب2.pdf",
      startDate: "12/04/2024",
      endDate: "22/04/2024",
      teacher: "المدرس 2",
      status: "تم التسليم",
    },
  ];

  const handleFileUpload = (index) => {
    setSubmittedRowIndex(index);
  };

  const handleReviewRequest = (index) => {
    // Implement review request logic here
    console.log("Review requested for assignment at index", index);
  };

  return (
    // <Box className={classes.root}>
    //   <Box>
    //     <Typography variant="h4" gutterBottom>
    //       واجبات تم تسليمها
    //     </Typography>
    //     <TableContainer component={Paper} className={classes.tableContainer}>
    //       <Table dir="rtl">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell className={classes.tableHeaderCell}>الفرع</TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               اسم الدورة
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               الملف المرفوع
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               تاريخ البدء
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               تاريخ الانتهاء
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               اسم المدرس
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               العلامة المستحقة
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               طلب مراجعة
    //             </TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {submittedAssignmentsData.map((assignment, index) => (
    //             <TableRow
    //               key={assignment.id}
    //               className={`${classes.tableRow} ${classes.submittedRow}`}
    //             >
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.branch}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.courseName}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 <Link
    //                   href={assignment.file}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                 >
    //                   <InsertDriveFile /> {assignment.file}
    //                 </Link>
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.startDate}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.endDate}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.teacher}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.grade}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.reviewRequested ? (
    //                   "تم الطلب"
    //                 ) : (
    //                   <Button
    //                     variant="contained"
    //                     color="primary"
    //                     onClick={() => handleReviewRequest(index)}
    //                   >
    //                     طلب مراجعة
    //                   </Button>
    //                 )}
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Box>
    //   <Box>
    //     <Typography variant="h4" gutterBottom>
    //       واجبات يجب عليك تسليمها
    //     </Typography>
    //     <TableContainer component={Paper} className={classes.tableContainer}>
    //       <Table dir="rtl">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell className={classes.tableHeaderCell}>الفرع</TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               اسم الدورة
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               الملف المرفوع
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               تاريخ البدء
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               تاريخ الانتهاء
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               اسم المدرس
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               الحالة
    //             </TableCell>
    //             <TableCell className={classes.tableHeaderCell}>
    //               رفع الحل
    //             </TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {pendingAssignmentsData.map((assignment, index) => (
    //             <TableRow
    //               key={assignment.id}
    //               className={`${classes.tableRow} ${classes.pendingRow}`}
    //             >
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.branch}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.courseName}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 <Link
    //                   href={assignment.file}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                 >
    //                   <InsertDriveFile /> {assignment.file}
    //                 </Link>
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.startDate}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.endDate}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.teacher}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.status}
    //               </TableCell>
    //               <TableCell className={classes.tableCell}>
    //                 {assignment.status === "تم التسليم" ? (
    //                   <Button
    //                     variant="contained"
    //                     component="label"
    //                     className={classes.alternativeUploadButton}
    //                   >
    //                     رفع ملف بديل (تعديل التسليم)
    //                     <input
    //                       type="file"
    //                       accept=".pdf"
    //                       style={{ display: "none" }}
    //                       onChange={() => handleFileUpload(index)}
    //                     />
    //                   </Button>
    //                 ) : (
    //                   <Button
    //                     variant="contained"
    //                     component="label"
    //                     className={classes.uploadButton}
    //                   >
    //                     رفع ملف PDF
    //                     <input
    //                       type="file"
    //                       accept=".pdf"
    //                       style={{ display: "none" }}
    //                       onChange={() => handleFileUpload(index)}
    //                     />
    //                   </Button>
    //                 )}
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Box>
    // </Box>
    <></>
  );
};

export default AssignmentsPage;
