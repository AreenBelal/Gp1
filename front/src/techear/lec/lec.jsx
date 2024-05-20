import React, { useState } from "react";
// import ReactPlayer from 'react-player';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import AddIcon from '@material-ui/icons/Add';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import CloseIcon from '@material-ui/icons/Close';

const LecturePage = () => {
  // const courses = [
  //   { id: 1, name: 'دورة 1', divisions: ['شعبة 1', 'شعبة 2'] },
  //   { id: 2, name: 'دورة 2', divisions: ['شعبة 1', 'شعبة 2'] },
  //   // يمكنك إضافة المزيد من الدورات هنا حسب الحاجة
  // ];

  // const [selectedBranch, setSelectedBranch] = useState('');
  // const branches = [
  //   { id: 1, name: 'فرع 1' },
  //   { id: 2, name: 'فرع 2' },
  // ];
  // const [selectedCourse, setSelectedCourse] = useState('');
  // const [selectedDivision, setSelectedDivision] = useState('');
  // const [selectedCourseId, setSelectedCourseId] = useState('');
  // const [selectedLectures, setSelectedLectures] = useState('');

  // const handleCourseChange = (courseName) => {
  //   setSelectedCourse(courseName);
  //   const selectedCourse = courses.find(course => course.name === courseName);
  //   if (selectedCourse) {
  //     setSelectedCourseId(selectedCourse.id);
  //   }
  // };

  // const divisions = selectedCourseId ? courses.find(course => course.id === selectedCourseId).divisions : [];

  // const [lectures, setLectures] = useState([
  //   { id: 1, title: 'حصة 1', videoUrl: '', selected: false, editingTitle: false, newTitle: '', description: '', editingDescription: false, newDescription: '' },
  //   { id: 2, title: 'حصة 2', videoUrl: '', selected: false, editingTitle: false, newTitle: '', description: '', editingDescription: false, newDescription: '' },
  // ]);

  // const addLecture = (id) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, editingDescription: !lecture.editingDescription } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const deleteLecture = (id) => {
  //   // تحديث قائمة المحاضرات
  //   const updatedLectures = lectures.filter(lecture => lecture.id !== id);
  //   setLectures(updatedLectures);

  //   // تحديث قائمة المحاضرات المحددة
  //   if (Array.isArray(selectedLectures)) {
  //     const updatedSelectedLectures = selectedLectures.filter(lecture => lecture.id !== id);
  //     setSelectedLectures(updatedSelectedLectures);
  //   } else {
  //     // إذا لم تكن selectedLectures مصفوفة، يمكنك تعيينها بقيمة مناسبة، مثل مصفوفة فارغة
  //     setSelectedLectures([]);
  //   }
  // };

  // const handleSelectLecture = (id) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, selected: !lecture.selected } : lecture
  //   );
  //   setLectures(updatedLectures);

  //   const selectedLecture = lectures.find(lecture => lecture.id === id);

  //   if (Array.isArray(selectedLectures)) {
  //     setSelectedLectures(prevState => {
  //       if (selectedLecture.selected) {
  //         return [...prevState, selectedLecture];
  //       } else {
  //         return prevState.filter(lecture => lecture.id !== id);
  //       }
  //     });
  //   } else {
  //     // إذا لم تكن `selectedLectures` مصفوفة، يمكنك تهيئتها لتكون مصفوفة جديدة مع المحاضرة المحددة
  //     setSelectedLectures(selectedLecture.selected ? [selectedLecture] : []);
  //   }
  // };

  // const sendSelectedLectures = () => {
  //  };

  // const handleTitleChange = (id, title) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, newTitle: title } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const toggleEditingTitle = (id) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, editingTitle: !lecture.editingTitle } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const saveNewTitle = (id) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, title: lecture.newTitle, editingTitle: false } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const handleDescriptionChange = (id, description) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, newDescription: description } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const saveNewDescription = (id) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, description: lecture.newDescription, editingDescription: false } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const handleDeleteDescription = (id) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, description: '', newDescription: '', editingDescription: false } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const handleAddNewLecture = () => {
  //   const newLecture = {
  //     id: lectures.length + 1,
  //     title: 'حصة جديدة',
  //     videoUrl: '',
  //     selected: false,
  //     editingTitle: false,
  //     newTitle: '',
  //     description: '',
  //     editingDescription: false,
  //     newDescription: '',
  //   };
  //   setLectures([...lectures, newLecture]);
  // };

  // const handleVideoUrlChange = (id, url) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, videoUrl: url } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  // const handleDeleteVideo = (id) => {
  //   const updatedLectures = lectures.map(lecture =>
  //     lecture.id === id ? { ...lecture, videoUrl: '' } : lecture
  //   );
  //   setLectures(updatedLectures);
  // };

  return (
    //     <div style={{marginTop:'50px'}}>
    //        <div style={{ display: 'flex', justifyContent: 'flex-start', marginRight: '350px', direction:'rtl' }}>
    //       <FormControl className={classes.selectFormControl} style={{ marginRight: '10px', position: 'relative' }}>
    //             <Select
    //               value={selectedBranch}
    //               onChange={(e) => setSelectedBranch(e.target.value)}
    //               displayEmpty
    //               variant="outlined"
    //               fullWidth
    //               MenuProps={{
    //                 anchorOrigin: {
    //                   vertical: 'bottom',
    //                   horizontal: 'left',
    //                 },
    //                 transformOrigin: {
    //                   vertical: 'top',
    //                   horizontal: 'left',
    //                 },
    //                 getContentAnchorEl: null,
    //                 PaperProps: {
    //                   style: {
    //                     position: 'absolute',
    //                     top: '100%',
    //                     marginTop: '4px',
    //                     backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust transparency here (0 for fully transparent, 1 for opaque)
    //                     borderRadius: '8px',
    //                     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    //                     border: '1px solid #ccc',
    //                   },
    //                 },
    //               }}
    //             >
    //                   <MenuItem value="" disabled style={{ textAlign: 'right',direction:'rtl' }}>
    //                     الفرع
    //                   </MenuItem>
    //                   {branches.map(branch => (
    //                     <MenuItem key={branch.id} value={branch.name} style={{ textAlign: 'right' ,direction:'rtl'}}>
    //                       <div style={{ textAlign: 'right' , direction:'rtl'}}>{branch.name}</div>
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               </FormControl>

    // {selectedBranch && (
    //   <FormControl className={classes.selectFormControl} style={{ marginRight: '10px', position: 'relative' }}>
    //     <Select
    //       value={selectedCourse}
    //       onChange={(e) => handleCourseChange(e.target.value)}
    //       displayEmpty
    //       variant="outlined"
    //       fullWidth
    //       MenuProps={{
    //         anchorOrigin: {
    //           vertical: 'bottom',
    //           horizontal: 'left',
    //         },
    //         transformOrigin: {
    //           vertical: 'top',
    //           horizontal: 'left',
    //         },
    //         getContentAnchorEl: null,
    //         PaperProps: {
    //           style: {
    //             position: 'absolute',
    //             top: '100%',
    //             marginTop: '4px',
    //             backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust transparency here (0 for fully transparent, 1 for opaque)
    //             borderRadius: '8px',
    //             boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    //             border: '1px solid #ccc',
    //           },
    //         },
    //       }}
    //     >
    //       <MenuItem value="" disabled style={{ textAlign: 'right' ,direction:'rtl'}}>
    //         الدورة
    //       </MenuItem>
    //       {courses.map(course => (
    //         <MenuItem key={course.id} value={course.name} style={{ textAlign: 'right',direction:'rtl' }}>
    //           <div style={{ direction:'rtl' }}>{course.name}</div>
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // )}

    // {selectedCourseId && (
    //   <FormControl className={classes.selectFormControl} style={{ marginRight: '10px', position: 'relative' }}>
    //     <Select
    //       value={selectedDivision}
    //       onChange={(e) => setSelectedDivision(e.target.value)}
    //       displayEmpty
    //       variant="outlined"
    //       fullWidth
    //       MenuProps={{
    //         anchorOrigin: {
    //           vertical: 'bottom',
    //           horizontal: 'left',
    //         },
    //         transformOrigin: {
    //           vertical: 'top',
    //           horizontal: 'left',
    //         },
    //         getContentAnchorEl: null,
    //         PaperProps: {
    //           style: {
    //             position: 'absolute',
    //             top: '100%',
    //             marginTop: '4px',
    //             backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust transparency here (0 for fully transparent, 1 for opaque)
    //             borderRadius: '8px',
    //             boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    //             border: '1px solid #ccc',
    //           },
    //         },
    //       }}
    //     >
    //       <MenuItem value="" disabled style={{ direction:'rtl' }}>
    //         اختر الشعبة
    //       </MenuItem>
    //       {divisions.map((division, index) => (
    //         <MenuItem key={index} value={division} style={{ textAlign: 'right',direction:'rtl' }}>
    //           <div style={{ direction:'rtl'}}>{division}</div>
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // )}

    //       </div>

    //       <div className={classes.lectureContainer}>
    //       {selectedCourse && selectedDivision && (

    //         <Grid container spacing={3}>
    //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
    //           <Button onClick={handleAddNewLecture} color="primary" variant="contained" style={{ marginBottom: '10px', height: '60px' }}><AddCircleOutlineIcon style={{ marginRight: '6px' }} /> إضافة حصة جديدة</Button>
    //           <Button onClick={sendSelectedLectures} color="primary" variant="contained" style={{ height: '60px' }}>إرسال الحصص المحددة</Button>
    //         </div>

    //           {lectures.map(lecture => (
    //             <Grid item xs={12} md={4} key={lecture.id}>
    //               <Card className={classes.lectureCard}>
    //                 <CardContent className={classes.cardContent}>
    //                   <div style={{ marginBottom: '10px' }} className={classes.mainTitle}>
    //                     <Typography variant="h6" color="primary">{lecture.title}</Typography>
    //                   </div>
    //                   <div style={{ marginBottom: '10px' }} className={classes.title}>
    //                     {lecture.editingTitle ? (
    //                       <>
    //                         <TextField
    //                           value={lecture.newTitle}
    //                           onChange={(e) => handleTitleChange(lecture.id, e.target.value)}
    //                           onBlur={() => saveNewTitle(lecture.id)}
    //                           variant="outlined"
    //                           fullWidth
    //                         />
    //                         <Button onClick={() => toggleEditingTitle(lecture.id)} color="primary">حفظ</Button>
    //                       </>
    //                     ) : (
    //                       <>
    //                         <div>
    //                           <IconButton onClick={() => toggleEditingTitle(lecture.id)}>
    //                             <EditIcon style={{ fontSize: 20, color: 'blue' }} />
    //                           </IconButton>
    //                           <Typography variant="body2" color="textSecondary">تعديل عنوان الحصة</Typography>
    //                         </div>
    //                       </>
    //                     )}
    //                   </div>
    //                   <div style={{ marginBottom: '10px' }}>
    //                     {lecture.editingDescription ? (
    //                       <>
    //                         <TextField
    //                           value={lecture.newDescription}
    //                           onChange={(e) => handleDescriptionChange(lecture.id, e.target.value)}
    //                           onBlur={() => saveNewDescription(lecture.id)}
    //                           variant="outlined"
    //                           multiline
    //                           rows={3}
    //                           fullWidth
    //                         />
    //                         <Button onClick={() => saveNewDescription(lecture.id)} color="primary">حفظ</Button>
    //                       </>
    //                     ) : (
    //                       <>
    //                         {lecture.description ? (
    //                           <>
    //                             <Typography>الوصف: {lecture.description}</Typography>
    //                             <div>
    //                               <IconButton onClick={() => handleDeleteDescription(lecture.id)}>
    //                                 <DeleteIcon style={{ fontSize: 20, color: 'red' }} />
    //                                 <Typography variant="body2" color="textSecondary" style={{marginRight:'7px'}}> حذف الوصف  </Typography>
    //                               </IconButton>
    //                             </div>
    //                           </>
    //                         ) : (
    //                           <>
    //                             <div>
    //                               <IconButton onClick={() => addLecture(lecture.id)}>
    //                                 <AddIcon style={{ fontSize: 20, color: 'green' }} />
    //                               </IconButton>
    //                               <Typography variant="body2" color="textSecondary">إضافة وصف</Typography>
    //                             </div>
    //                           </>
    //                         )}
    //                       </>
    //                     )}
    //                   </div>
    //                   <div className={classes.videoInput}>
    //                     <TextField
    //                       value={lecture.videoUrl}
    //                       onChange={(e) => handleVideoUrlChange(lecture.id, e.target.value)}
    //                       variant="outlined"
    //                       fullWidth
    //                       placeholder="أدخل عنوان URL للفيديو"
    //                     />
    //                     {lecture.videoUrl && (
    //                       <IconButton onClick={() => handleDeleteVideo(lecture.id)}><CloseIcon style={{ fontSize: 20, color: 'red' }} /></IconButton>
    //                     )}
    //                      <CardMedia>
    //                   {lecture.videoUrl && <ReactPlayer url={lecture.videoUrl} controls={true} width="100%" height="auto" />}
    //                 </CardMedia>
    //                   </div>
    //                 </CardContent>
    //                 <CardContent className={classes.buttonsContainer}>
    //                 <Typography variant="body2" color="textSecondary">تحديد الحصة</Typography>
    //                 <FormControl className={classes.selectFormControl}>
    //                   <Select
    //                     value={lecture.selected ? lecture.selected : ''}
    //                     onChange={() => handleSelectLecture(lecture.id)}
    //                     style={{ width: '100px' }}
    //                   >
    //                     <MenuItem value="">-</MenuItem>
    //                     <MenuItem value={false}>غير محدد</MenuItem>
    //                     <MenuItem value={true}>محدد</MenuItem>
    //                   </Select>
    //                 </FormControl>

    //                   <Button onClick={() => deleteLecture(lecture.id)} color="secondary" variant="contained" style = {{height:'50px', paddingRight:'1px', marginBottom:'0px' }} >حذف الحصة</Button>
    //                 </CardContent>

    //               </Card>
    //             </Grid>
    //           ))}
    //         </Grid>
    //       )}
    //     </div>
    //     </div>
    <></>
  );
};

export default LecturePage;
