import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const Techquiz= () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <ThemeProvider theme={theme}>

    <div className="container">
      <div>
        <QuestionForm addQuestion={addQuestion} />
       </div>
    </div>

    </ThemeProvider>

  
  );
};

export default Techquiz;
