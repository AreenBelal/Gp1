import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, Container, Typography, makeStyles } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  tableContainer: {
    maxWidth: '800px',
    width: '100%',
    margin: theme.spacing(2),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  TextField: {
    direction: 'rtl',
  },
  label:{
    direction: 'rtl',
  },
}));

const TeacherTable = () => {
  const classes = useStyles();

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'محمد أحمد', idNumber: '123456789', branch: 'فرع الرياض', course: 'اللغة الإنجليزية', salary: '5000 ريال', image: 'teacher1.jpg' },
    { id: 2, name: 'فاطمة علي', idNumber: '987654321', branch: 'فرع جدة', course: 'الرياضيات', salary: '4500 ريال', image: 'teacher2.jpg' },
    // Add more teachers here
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [teacherData, setTeacherData] = useState({});

  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  const handleEdit = (teacher) => {
    setTeacherData(teacher);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === teacherData.id ? teacherData : teacher
    );
    setTeachers(updatedTeachers);
    setOpenDialog(false);
  };

  return (
    <Container className={classes.container} style={{direction:'rtl'}}>
      <TableContainer component={Paper} className={classes.tableContainer} style={{direction:'rtl'}}>
        <Typography variant="h5" align="center" gutterBottom>
          جدول المعلمين
        </Typography>
        <Table aria-label="teachers table">
          <TableHead>
            <TableRow>
              <TableCell>اسم المعلم</TableCell>
              <TableCell>رقم الهوية</TableCell>
              <TableCell>الفرع</TableCell>
              <TableCell>الدورة</TableCell>
              <TableCell>الراتب</TableCell>
              <TableCell>صورة المعلم</TableCell>
              <TableCell>تعديل/حذف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.idNumber}</TableCell>
                <TableCell>{teacher.branch}</TableCell>
                <TableCell>{teacher.course}</TableCell>
                <TableCell>{teacher.salary}</TableCell>
                <TableCell>
                  <img src={teacher.image} alt={teacher.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(teacher)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(teacher.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleClose} style={{direction:'rtl'}} >
        <DialogTitle>تعديل بيانات المعلم</DialogTitle>
        <DialogContent className={classes.dialogContent} style={{direction:'rtl'}}>
          <TextField
            label="اسم المعلم"
            name="name"
            value={teacherData.name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="رقم الهوية"
            name="idNumber"
            value={teacherData.idNumber || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="الفرع"
            name="branch"
            value={teacherData.branch || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="الدورة"
            name="course"
            value={teacherData.course || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="الراتب"
            name="salary"
            value={teacherData.salary || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            حفظ
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TeacherTable;
