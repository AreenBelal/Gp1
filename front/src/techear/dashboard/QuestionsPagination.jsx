import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const QuestionsPagination = ({
  setIsLoading,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  numOfQuestions,
}) => {
  const start = () => {
    setIsLoading(true); // Set isLoading to true when transitioning to the first question
    setTimeout(() => {
      setCurrentQuestionIndex(0);
      setIsLoading(false); // Set isLoading to false after transitioning to the first question
    }, 300); // Simulating a delay of 1 second for loading
  };

  const end = () => {
    setIsLoading(true); // Set isLoading to true when transitioning to the last question
    setTimeout(() => {
      setCurrentQuestionIndex(numOfQuestions - 1);
      setIsLoading(false); // Set isLoading to false after transitioning to the last question
    }, 300); // Simulating a delay of 1 second for loading
  };

  const getItemProps = (index) => ({
    variant: currentQuestionIndex === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentQuestionIndex(index);
        setIsLoading(false); // Set isLoading to false after transitioning to the previous question
      }, 300); // Simulating a delay of 1 second for loading
    },
    className: "rounded-full",
  });

  const next = () => {
    if (currentQuestionIndex < numOfQuestions - 1) {
      setIsLoading(true); // Set isLoading to true when transitioning to the next question
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsLoading(false); // Set isLoading to false after transitioning to the next question
      }, 300); // Simulating a delay of 1 second for loading
    }
  };

  const prev = () => {
    if (currentQuestionIndex === 0) return;

    setIsLoading(true); // Set isLoading to true when transitioning to the previous question
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setIsLoading(false); // Set isLoading to false after transitioning to the previous question
    }, 300); // Simulating a delay of 1 second for loading
  };

  return (
    <div className="flex items-center flex-wrap gap-4 flex-col md:flex-row">
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={start}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> الأول
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> السابق
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 shadow p-1 rounded-3xl">
        {Array.from({ length: Math.min(numOfQuestions, 5) }, (_, index) => {
          let questionIndex = currentQuestionIndex + index - 2;
          if (questionIndex < 0) {
            questionIndex = numOfQuestions + questionIndex;
          } else if (questionIndex >= numOfQuestions) {
            questionIndex = questionIndex - numOfQuestions;
          }
          return (
            <IconButton key={questionIndex} {...getItemProps(questionIndex)}>
              {questionIndex + 1}
            </IconButton>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={currentQuestionIndex === numOfQuestions - 1}
        >
          التالي <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={end}
          disabled={currentQuestionIndex === numOfQuestions - 1}
        >
          الأخير <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionsPagination;
