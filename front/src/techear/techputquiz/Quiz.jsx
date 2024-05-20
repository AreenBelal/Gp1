import React, { useState } from 'react';
import Question from './Question';
import QuestionForm from './QuestionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
 


const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h1 className="mb-4">Quiz App</h1>
          <QuestionForm addQuestion={addQuestion} />
          {questions.map((question, index) => (
            <Question
              key={index}
              index={index}
              text={question.text}
              options={question.options}
              removeQuestion={removeQuestion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
