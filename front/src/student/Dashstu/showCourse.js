import React, { useState } from "react";
// import { Container, Grid, Card, CardContent, Button, TableHead, TableBody, TableRow, TableCell, Modal, Backdrop, Fade } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTrash } from "react-icons/bs";
import Paymentstu from "../payment/Paymentstu";
import { Card, Typography, Button } from "@material-tailwind/react";
const initialCourses = [
  { id: 1, title: "الرياضيات", instructor: "أحمد علي", price: 50 },
  { id: 2, title: "الفيزياء", instructor: "محمد أحمد", price: 60 },
  { id: 3, title: "الكيمياء", instructor: "فاطمة محمود", price: 55 },
];

const StudentDashboard = () => {
  const [cart, setCart] = useState([]);
  const [courses, setCourses] = useState(initialCourses);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [openPaymentPanel, setOpenPaymentPanel] = useState(false);

  const handleAddToCart = (course) => {
    setOpenPaymentPanel(true);
    // Remove the course from the list of courses
    setCourses(courses.filter((c) => c.id !== course.id));
    // Add the course to the cart
    setCart([...cart, course]);
  };

  const handlePaymentConfirmed = () => {
    // Close the payment panel
    setOpenPaymentPanel(false);
    // Add courses from cart to the purchased courses
    setPurchasedCourses([...purchasedCourses, ...cart]);
    // Clear the cart
    setCart([]);
  };

  return (
    <div style={{ marginTop: "70px", direction: "rtl" }}>
      {/* <Grid spacing={2} justify="center">
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id} >
            <Card style={{ backgroundColor: '#f0f0f0', alignContent:'center' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  المدرس: {course.instructor}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  السعر: {course.price} دولار
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={() => handleAddToCart(course)}>
                شراء الكورس
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" style={{ marginTop: '30px', color: '#007bff', textAlign: 'right' }}>
        سلة التسوق
      </Typography>
      <Table>
        <TableHead>
          <TableRow style={{ background: 'linear-gradient(to right, #a8d8ff, #78c6ff)' }}>
            <TableCell align="center" style={{color:'whitesmoke'}}>عنوان الكورس</TableCell>
            <TableCell align="center" style={{color:'whitesmoke'}}>اسم المدرس</TableCell>
            <TableCell align="center" style={{color:'whitesmoke'}}>سعر الكورس</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {purchasedCourses.map((course, index) => (
            <TableRow key={index} style={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
              <TableCell align="center">{course.title}</TableCell>
              <TableCell align="center">{course.instructor}</TableCell>
              <TableCell align="center">{course.price} دولار</TableCell>
              <TableCell align="center">
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
      open={openPaymentPanel}
      onClose={() => setOpenPaymentPanel(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      style={{ overflow: 'auto'}}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openPaymentPanel}>
        <div style={{ backgroundColor: '#fff', width: '50%', margin: 'auto', marginTop: '100px', padding: '20px', borderRadius: '8px', textAlign: 'center', overflow: 'auto' }}>
          <h2>بانيل الدفع الالكتروني</h2>
          <Paymentstu />
          <Button variant="contained" color="primary" style={{width:'100%'}}  onClick={handlePaymentConfirmed}>
            تأكيد الدفع
          </Button>
        </div>
      </Fade>
    </Modal> */}
    </div>
  );
};

export default StudentDashboard;
