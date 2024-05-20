import React from 'react';

const Question = ({ index, text, options, removeQuestion }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h3 className="card-title">Question {index + 1}</h3>
        <p className="card-text">{text}</p>
        <ul className="list-group">
          {options.map((option, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="option-number">{i + 1}</span>
              {option}
            </li>
          ))}
        </ul>
        <button onClick={() => removeQuestion(index)} className="btn btn-danger mt-3">
          Remove Question
        </button>
      </div>
    </div>
  );
};

export default Question;
