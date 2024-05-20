import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faVideo } from "@fortawesome/free-solid-svg-icons";
import {
  CardBody,
  Card,
  Button,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

const coursesData = [
  {
    id: 1,
    courseName: "الدورة 1",
    instructor: "المدرس 1",
    department: "شعبة 1",
    schedule: "ثلاثاء",
    files: ["ملف1.pdf", "ملف2.pdf"],
    videos: ["فيديو1.mp4", "فيديو2.mp4"],
  },
  {
    id: 2,
    courseName: "الدورة 2",
    instructor: "المدرس 2",
    department: "شعبة 2",
    schedule: "خميس",
    files: ["ملف3.pdf", "ملف4.pdf"],
    videos: ["فيديو3.mp4", "فيديو4.mp4"],
  },
  // Add more course data as needed
];

const CourseCard = ({ course }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (file) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter((f) => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleDownload = () => {
    // Logic to download selected files
    console.log("Selected files:", selectedFiles);
  };

  return (
    <Card
      style={{
        backgroundColor: "#f0f0f0",
        marginBottom: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      <CardBody>
        <Typography
          variant="h5"
          component="h2"
          align="right"
          style={{ color: "#333", marginBottom: "10px" }}
        >
          {course.courseName}
        </Typography>
        <Typography
          color="textSecondary"
          align="right"
          style={{ marginBottom: "10px" }}
        >
          {course.instructor}
        </Typography>
        <Typography
          color="textSecondary"
          align="right"
          style={{ marginBottom: "10px" }}
        >
          الشعبة: {course.department} ({course.schedule})
        </Typography>
        <List>
          {course.files.map((file, index) => (
            <ListItem
              key={index}
              dir="rtl"
              button
              onClick={() => handleFileSelect(file)}
            >
              <div>
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{
                    color: selectedFiles.includes(file) ? "#ff5252" : "#ccc",
                  }}
                />
              </div>
              {/* <ListItemText primary={file} /> */}
            </ListItem>
          ))}
          {course.videos.map((video, index) => (
            <ListItem key={index} dir="rtl">
              <div>
                <FontAwesomeIcon icon={faVideo} style={{ color: "#2196f3" }} />
              </div>
              {/* <ListItemText primary={video} /> */}
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          dir="rtl"
          onClick={handleDownload}
        >
          تنزيل الملفات المحددة (pdf)
        </Button>
      </CardBody>
    </Card>
  );
};

const CoursesPage = () => {
  return (
    <div style={{ marginTop: "150px", direction: "rtl" }}>
      <div>
        {coursesData.map((course) => (
          <div item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
