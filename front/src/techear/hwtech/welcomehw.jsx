import React, { useState } from 'react';
import './welcomehw.css';
import { useDropzone } from 'react-dropzone';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Welcomehw() {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, application/pdf',
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setShowModal(true);
    },
  });

  const handleModalClose = () => {
    setUploadedFile(null);
    setShowModal(false);
    handleClosePanel(); // Add this line to close the panel after closing the modal
  };

  const handleUpload = () => {
 
    toast.success('تم حفظ الملف بنجاح', {
      position: 'bottom-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        height: '50px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        textAlign: 'center',
        marginTop: '200px',
        marginLeft: '20px',
        backgroundColor: 'white', // Green background color
        color: 'green', // Text color
        borderRadius: '8px', // Border radius
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow
      },
    });

    setShowModal(false);
    handleClosePanel(); // Add this line to close the panel after uploading
  };

  const handleButtonClick = () => {
    setShowPanel(true);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    setSelectedCourse('');
    setSelectedSection('');
    setSelectedBranch('');
  };

  return (
    <div className="welcomehw">
          <button onClick={handleButtonClick} className='bhw'>اضافة واجب للطلبة</button>
       <ToastContainer />

      {showPanel && (
        <div className="overlay-panel">
          <label>
            اختر الفرع:
            <select value={selectedBranch} onChange={handleBranchChange}>
              <option value="branch1"> علمي</option>
              <option value="branch2">ادبي</option>
            </select>
          </label>

          <label>
            اختر الدورة :
            <select value={selectedCourse} onChange={handleCourseChange}>
              <option value="course1">كورس 1</option>
              <option value="course2">كورس 2</option>
            </select>
          </label>

          <label>
            اختر الشعبة :
            <select value={selectedSection} onChange={handleSectionChange}>
              <option value="section1">سيكشن 1</option>
              <option value="section2">سيكشن 2</option>
            </select>
          </label>

          <label>
            تاريخ البدء:
            <Form.Group controlId="startDate">
              <Form.Control
                type="date"
                value={startDate}
                className="custom-date-input"
                onChange={handleStartDateChange}
              />
            </Form.Group>
          </label>

          <label>
            تاريخ الانتهاء:
            <Form.Group controlId="dueDate">
              <Form.Control
                type="date"
                value={dueDate}
                className="custom-date-input"
                onChange={handleDueDateChange}
              />
            </Form.Group>
          </label>

          <div className="mt-8 p-6 bg-white rounded-md shadow-md form-container">
            <Form>
              <Form.Group className="form-group" {...getRootProps()}>
                <Form.Label className="block text-sm font-medium text-green-400">
                  ارفع الواجب هُنا - افلت الملف أو انقر للاختيار
                  (يسمح بالصور أو ملفات ذات امتداد -pdf-))
                </Form.Label>
                <input {...getInputProps()} />
              </Form.Group>
            </Form>

            <Modal show={showModal} onHide={handleModalClose} centered className="rtl" style={{ direction: 'rtl' }}>
              <Modal.Header>
                <Modal.Title className="text-end" style={{ direction: 'rtl' }}>معاينة الملف</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ maxHeight: '800px', maxWidth: '800px', overflowY: 'auto', direction: 'rtl' }}>
                {uploadedFile && (
                  <div>
                    {uploadedFile.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(uploadedFile)} alt="معاينة" style={{ maxWidth: '100%' }} />
                    ) : uploadedFile.type === 'application/pdf' ? (
                      <embed src={URL.createObjectURL(uploadedFile)} style={{ minWidth: '100%', minheight: '100%', }} type="application/pdf" />
                    ) : (
                      <p>نوع الملف غير مدعوم</p>
                    )}
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer style={{ direction: 'rtl' }}>
                <Button
                  variant="success"
                  onClick={handleUpload}
                  style={{ marginRight: '5px' }}
                >
                  رفع الملف
                </Button>
                <Button
                  variant="danger"
                  onClick={handleModalClose}
                >
                  إلغاء
                </Button>
              </Modal.Footer>
            </Modal>

          </div>

          <button onClick={handleClosePanel}  className='bhw' style={{marginRight:'100px'}}  >إغلاق</button>

        </div>
      )}
    </div>
  );
}

export default Welcomehw;
