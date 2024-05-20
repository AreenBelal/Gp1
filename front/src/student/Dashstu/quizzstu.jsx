import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Alarm, Star, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();

  // Mock data for past quizzes
  const pastQuizzes = [
    {
      id: 1,
      name: "كويز 1",
      course: "الدورة 1",
      branchSchedule: "الأحد والثلاثاء الساعة 11-12",
      startTime: "10:00 ص",
      endTime: "12:00 م",
      grade: "A",
    },
    {
      id: 2,
      name: "كويز 2",
      course: "الدورة 2",
      branchSchedule: "السبت والأربعاء الساعة 10-11",
      startTime: "11:30 ص",
      endTime: "01:30 م",
      grade: "B",
    },
    // Add more past quizzes here
  ];

  // Mock data for upcoming quizzes
  const upcomingQuizzes = [
    {
      id: 3,
      name: "كويز 3",
      course: "الدورة 3",
      branchSchedule: " الأحد والأربعاء الساعة 09-10",
      startTime: "09:00 ص",
      endTime: "11:00 ص",
    },
    {
      id: 4,
      name: "كويز 4",
      course: "الدورة 4",
      branchSchedule: " الاثنين والخميس الساعة 02-03",
      startTime: "02:00 م",
      endTime: "04:00 م",
    },
    // Add more upcoming quizzes here
  ];

  const handleStartQuiz = (quizId) => {
    // Logic to start the quiz
    navigate("/student/student_quiz/quiz");
  };

  return (
    // <Box className={classes.root}>
    //   <Typography variant="h4" gutterBottom>
    //     الكويزات السابقة
    //   </Typography>
    //   <Paper elevation={3} className={classes.quizContainer}>
    //     <TableContainer>
    //       <Table>
    //         <TableHead >
    //           <TableRow>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>اسم الكويز</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>الدورة</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>مواعيد الشعبة</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>الوقت من</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>الوقت إلى</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>العلامة</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>الإجراءات</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {pastQuizzes.map((quiz) => (
    //             <TableRow key={quiz.id} className={classes.hoverRow}>
    //               <TableCell align="center" >{quiz.name}</TableCell>
    //               <TableCell align="center">{quiz.course}</TableCell>
    //               <TableCell align="center">{quiz.branchSchedule}</TableCell>
    //               <TableCell align="center">{quiz.startTime}</TableCell>
    //               <TableCell align="center">{quiz.endTime}</TableCell>
    //               <TableCell align="center" className={quiz.grade === "A" ? classes.passedGrade : classes.failedGrade}>{quiz.grade}</TableCell>
    //               <TableCell align="center">
    //                 <IconButton edge="start" aria-label="star">
    //                   <Star />
    //                 </IconButton>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Paper>
    //   <Typography variant="h4" gutterBottom>
    //     الكويزات القادمة
    //   </Typography>
    //   <Paper elevation={3} className={classes.quizContainer}>
    //     <TableContainer>
    //       <Table>
    //         <TableHead>
    //           <TableRow>
    //             <TableCell align="center" style={{color:'whitesmoke'}} >اسم الكويز</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>الدورة</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>مواعيد الشعبة</TableCell>
    //             <TableCell align="center"style={{color:'whitesmoke'}}>وقت البدء</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>وقت الانتهاء</TableCell>
    //             <TableCell align="center" style={{color:'whitesmoke'}}>الإجراءات</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {upcomingQuizzes.map((quiz) => (
    //             <TableRow key={quiz.id} className={classes.hoverRow}>
    //               <TableCell  align="center" >{quiz.name}</TableCell>
    //               <TableCell align="center" >{quiz.course}</TableCell>
    //               <TableCell align="center" >{quiz.branchSchedule}</TableCell>
    //               <TableCell align="center" >{quiz.startTime}</TableCell>
    //               <TableCell align="center" >{quiz.endTime}</TableCell>
    //               <TableCell align="center" >
    //                 <Button
    //                   variant="contained"
    //                   color="primary"
    //                   onClick={() => handleStartQuiz(quiz.id)}
    //                 >
    //                   بدء الكويز
    //                 </Button>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Paper>
    // </Box>
    <></>
  );
};

export default QuizPage;
