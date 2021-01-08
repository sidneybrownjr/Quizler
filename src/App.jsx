import React, { useState } from 'react';
import './App.css';
// HTML entity decoder
const decoder = require('he');

// Open Trivia DB API
const apiURL =
  'https://opentdb.com/api.php?amount=10&category=31&type=multiple';
// array to store questions for quiz
let questions = [];

fetch(apiURL)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    // unload array returned from API into questions array
    questions = loadedQuestions.results.map((loadedQuestions) => {
      // object to store each question with their respective answers
      const formattedQuestion = {
        question: loadedQuestions.question,
      };
      // load answers into array
      const answerChoices = [...loadedQuestions.incorrect_answers];
      // object to track location of correct answer and
      // prevent correct answer from being in the same place everytime
      // answers are displayed
      formattedQuestion.answer = Math.floor(Math.random() * 4);
      // splice correct answer into array with incorrect answers
      answerChoices.splice(
        formattedQuestion.answer,
        0,
        loadedQuestions.correct_answer
      );
      // Add array to object to enable mapping for display
      // Add answer choices to array
      formattedQuestion.answerChoices = [...answerChoices];

      //console.log(formattedQuestion);
      return formattedQuestion;
    });
    //console.log(questions);
  })
  .catch((err) => {
    console.error(err);
  });

const App = () => {
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (answer) => {
    if (answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleQuizStart = () => {
    setTakingQuiz(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className='app'>
      {showScore ? (
        <>
          <div className='score-section'>
            You scored {score} out of {questions.length}
          </div>
          <div>
            {score / questions.length > 0.59 ? (
              <>you passed</>
            ) : (
              <>you failed</>
            )}
          </div>
          <button onClick={handleRestart}>Restart Quiz?</button>
        </>
      ) : takingQuiz ? (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>
              {decoder.decode(questions[currentQuestion].question)}
            </div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerChoices.map(
              (answerChoice, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerOptionClick(
                      answerChoice ===
                        questions[currentQuestion].answerChoices[
                          questions[currentQuestion].answer
                        ]
                    )
                  }
                >
                  {decoder.decode(answerChoice)}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <button onClick={handleQuizStart}>Begin Quiz?</button>
      )}
    </div>
  );
};

export default App;
