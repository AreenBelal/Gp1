import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './QuestionForm.css'; // إفتراضيًا هذا الملف يحتوي على أي تخصيصات CSS إضافية
import 'bootstrap/dist/css/bootstrap.min.css'; // تستخدم Bootstrap، لذا يجب تضمينها
import he from 'he'; // إفتراضيًا يستخدم لترميز وفك ترميز النصوص
import NavigationBar from './navbarr'; // استيراد مكون NavigationBar من ملف محلي
  
const TOTAL_QUESTIONS = 10; // عدد الأسئلة الإجمالي المسموح به

// تعريف مكون QuestionForm كدالة
const QuestionForm = ({ addQuestion }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [questionCount, setQuestionCount] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState([]);
    const [optionText, setOptionText] = useState('');
    const [correctOption, setCorrectOption] = useState(null);
    const [questionMark, setQuestionMark] = useState(1);
    const [showMaxOptionsNotification, setShowMaxOptionsNotification] = useState(false);
    const [showEmptyOptionNotification, setShowEmptyOptionNotification] = useState(false);
    const [showMinOptionsNotification, setShowMinOptionsNotification] = useState(false);
    const [questionsSubmitted, setQuestionsSubmitted] = useState(0);
    const [allQuestions, setAllQuestions] = useState([]);
    const [showGeneratedQuiz, setShowGeneratedQuiz] = useState(false);
    const [showAllQuestions, setShowAllQuestions] = useState(false);
    const [showEndQuiz, setShowEndQuiz] = useState(false);
  
    const handleConfirmTest = () => {
        setQuestionsSubmitted(true); // تعيين قيمة الـ questionsSubmitted إلى true عند الضغط على زر تأكيد الاختبار
    };
  
    const resetForm = () => {
      setQuestionCount('');
      setQuestionText('');
      setOptions([]);
      setOptionText('');
      setCorrectOption(null);
      setQuestionMark(1);
      setShowMaxOptionsNotification(false);
      setShowEmptyOptionNotification(false);
      setShowMinOptionsNotification(false);
      setQuestionsSubmitted(0);
      setAllQuestions([]);
      setShowAllQuestions(false);
    };
  
    const handleAddOption = () => {
      if (options.length < 4 && optionText.trim() !== '') {
        setOptions([...options, optionText.trim()]);
        setOptionText('');
        setShowMaxOptionsNotification(false);
        setShowEmptyOptionNotification(false);
        setShowMinOptionsNotification(false);
      } else if (options.length >= 4) {
        setShowMaxOptionsNotification(true);
      } else {
        setShowEmptyOptionNotification(true);
      }
    };
  
    const handleRemoveOption = (index) => {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      setOptions(updatedOptions);
  
      if (updatedOptions.length < 2) {
        setShowMinOptionsNotification(true);
      } else {
        setShowMinOptionsNotification(false);
      }
  
      if (updatedOptions.length < 4) {
        setShowMaxOptionsNotification(false);
      }
  
      if (correctOption === index) {
        setCorrectOption(null);
      } else if (correctOption !== null && correctOption > index) {
        setCorrectOption(correctOption - 1);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (questionCount >= 1) {
        if (
          questionText.trim() !== '' &&
          options.length >= 2 &&
          options.every((opt) => opt.trim() !== '') &&
          correctOption !== null
        ) {
          addQuestion({ text: questionText.trim(), options, correctOption, questionMark });
          setQuestionCount(questionCount - 1);
          setQuestionText('');
          setOptions([]);
          setOptionText('');
          setCorrectOption(null);
          setQuestionMark(1);
          setQuestionsSubmitted(questionsSubmitted + 1);
          setAllQuestions([...allQuestions, { text: questionText.trim(), options, correctOption, questionMark }]);
          setShowMaxOptionsNotification(false);
          setShowEmptyOptionNotification(false);
          setShowMinOptionsNotification(false);
        } else if (options.length < 2 || options.some((opt) => opt.trim() === '')) {
          setShowMinOptionsNotification(true);
        } else if (correctOption === null) {
          alert('الرجاء اختيار الإجابة الصحيحة.');
        } else {
          setShowEmptyOptionNotification(true);
        }
      } else {
        if (questionCount === 0) {
          setShowAllQuestions(true);
        }
      }
    };

  
   return (
    <div className="container" style={{marginRight:'150px', marginTop:'50px'}}>
      <div className="card">
        <div className="card-body">
          <NavigationBar /> {/* تضمين مكون NavigationBar داخل الفورم */}
          <div style={{ marginTop: '20px' }}>
            {!showGeneratedQuiz && questionsSubmitted < TOTAL_QUESTIONS ? (
              <form onSubmit={handleSubmit}>
              <div className="mb-3" >
              <label htmlFor="questionCount" className="form-label">
                عدد الأسئلة:
              </label>
              <input
                type="number"
                id="questionCount"
                className="form-control"
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.max(1, parseInt(e.target.value)))}
              />
            </div>

            {questionCount === 0 && (
              <div>
                <div className="alert alert-info" role="alert">
                  لقد قمت بإدخال كافة الأسئلة.
                </div>

                <button type="button" className="btn btn-secondary mb-3" onClick={() => setShowAllQuestions(true)}>
                  عرض الأسئلة المدخلة
                </button>

                {showAllQuestions && (
                  <div className="card mb-3">
                    <div className="card-body">
                      {allQuestions.map((question, index) => (
                        <div key={index} className="mb-3">
                          <p>
                            <strong>السؤال:</strong> {question.text}
                          </p>
                          <p>
                            <strong>الخيارات:</strong> {question.options.join(', ')}
                          </p>
                          <p>
                            <strong>الإجابة الصحيحة:</strong> الخيار {question.correctOption + 1}
                          </p>
                          <p>
                            <strong>العلامة:</strong> {question.questionMark}
                          </p>
                          
                          <p>
                          <strong>تاريخ البداية:</strong> {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}
                        </p>
                        <p>
                          <strong>تاريخ الانتهاء:</strong> {endDate.toLocaleDateString()} {endDate.toLocaleTimeString()}
                        </p>

                        </div>
                      ))}
                      <button type="button" className="btn btn-success me-2" onClick={handleConfirmTest}>
                        تأكيد الاختبار
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          setShowAllQuestions(false);
                          resetForm();
                        }}
                      >
                        إغلاق
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {questionCount >= 1 && (
              <>
                <div className="mb-3">
                  <label htmlFor="questionText" className="form-label">
                    السؤال:
                  </label>
                  <input
                    type="text"
                    id="questionText"
                    className="form-control"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="questionMark" className="form-label">
                    العلامة للسؤال:
                  </label>
                  <input
                    type="number"
                    id="questionMark"
                    className="form-control"
                    value={questionMark}
                    onChange={(e) => setQuestionMark(Math.max(1, parseInt(e.target.value)))}
                  />
                </div>
                <ul className="list-group mb-3">
                  {options.map((option, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {option}
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveOption(index)}>
                        حذف
                      </button>
                    </li>
                  ))}
                </ul>
                {showMaxOptionsNotification && (
                  <div className="alert alert-warning" role="alert">
                    الحد الأقصى المسموح به هو 4 خيارات.
                  </div>
                )}
                {showEmptyOptionNotification && (
                  <div className="alert alert-danger" role="alert">
                    لا يمكن أن يكون الخيار فارغًا.
                  </div>
                )}
                {showMinOptionsNotification && (
                  <div className="alert alert-danger" role="alert">
                    يجب أن يكون هناك على الأقل خيارين غير فارغين.
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="optionText" className="form-label">
                    الخيار:
                  </label>
                  <input
                    type="text"
                    id="optionText"
                    className="form-control"
                    value={optionText}
                    onChange={(e) => setOptionText(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary mb-3" onClick={handleAddOption}>
                  إضافة خيار
                </button>

                <div className="mb-3">
                  <label htmlFor="correctOption" className="form-label">
                    الخيار الصحيح:
                  </label>
                  <select
                    id="correctOption"
                    className="form-select"
                    value={correctOption !== null ? correctOption : ''}
                    onChange={(e) => setCorrectOption(e.target.value !== '' ? parseInt(e.target.value) : null)}
                  >
                    <option value="" disabled>
                      اختر الخيار الصحيح
                    </option>

                    {options.map((_, index) => (
                      <option key={index} value={index}>
                        الخيار {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">
                        تاريخ بداية الاختبار:
                      </label>
                      <DatePicker
                        id="startDate"
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">
                        تاريخ نهاية الاختبار:
                      </label>
                      <DatePicker
                        id="endDate"
                        className="form-control"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  إضافة السؤال
                </button>
              </>
            )}              </form>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm; // تصدير مكون QuestionForm للاستخدام في مكونات أخرى
