import React, { useState } from 'react';
import {quizData} from './quizData';
import './quiz.css'

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const { questions } = quizData
  const { question, choices, correctAnswer } = questions[activeQuestion]

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <div className='quiz00stud'>
     <div className="quiz-containerstud ">
    
    
      {!showResult ? (
        <div className='cla1stud'>
          <div>
            <span className="active-question-nostud">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-questionstud">/{addLeadingZero(questions.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answerstud' : null}>
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-rightstud">
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'انهاء الاختبار' : 'التالي'}
            </button>
          </div>
        </div>
      ) : (
        <div className="resultstud">
          <h3>الناتج</h3>
          <p>
            عدد الاسئلة الكلي: <span>{questions.length}</span>
          </p>
          <p>
            العلامة النهائية:<span> {result.score}</span>
          </p>
          <p>
            عدد الاجوبة الصحيحة:<span> {result.correctAnswers}</span>
          </p>
          <p>
           عدد الاجوبة الخاطئة:<span> {result.wrongAnswers}</span>
          </p>

        </div>
        
      )
    
    }
    </div>
    </div>
   )
}

export default Quiz