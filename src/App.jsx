import React, { useState } from 'react';
import './App.css';
// HTML entity encoder/decoder
const decoder = require('he');

// array to store questions for quiz
let questions = [];

const getQuestions = async (difficulty) => {
  // Open Trivia DB API
  const apiURL = `https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficulty}&type=multiple`;

  await fetch(apiURL)
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
};

const App = () => {
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isActive, setIsActive] = useState(false);
  //const [loading, isLoading] = useState(false);

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

  const handleRestart = (option = 'restart') => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    if (option === 'difficulty') {
      setTakingQuiz(false);
      setIsActive(false);
      // reset questions array
      questions = [];
    }
  };

  const handleDifficulty = (difficulty) => {
    getQuestions(difficulty);
    setIsActive(difficulty);
  };

  return (
    <div className='container flex items-center justify-center h-screen w-5/6'>
      {showScore ? (
        <div className='flex flex-col w-full  h-4/6'>
          <div className='h-1/2 flex flex-col justify-end'>
            <div className='font-body font-extrabold text-5xl text-white text-center py-3'>
              You scored a <em>whopping</em>
              <span className='text-indigo-300 text-6xl'> {score}</span> out of
              <span className='text-indigo-300 text-6xl'>
                {' '}
                {questions.length}
              </span>
              .
            </div>
            <div className='font-body font-bold text-4xl text-white text-center py-3'>
              {score / questions.length > 0.59 ? (
                <>
                  That means you <span className='text-green-400'>Passed</span>{' '}
                  (:
                </>
              ) : (
                <>
                  That means you <span className='text-red-400'>Failed</span> ):
                </>
              )}
            </div>
          </div>
          <div className='flex justify-center items-center py-3 h-1/2'>
            <button
              className='bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold rounded-xl py-5 px-4 my-2 mx-3 w-2/6'
              onClick={() => handleRestart('restart')}
            >
              Restart Quiz
            </button>
            <button
              className='bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold rounded-xl py-5 px-4 my-2 mx-3 w-2/6'
              onClick={() => handleRestart('difficulty')}
            >
              Change Difficulty
            </button>
          </div>
        </div>
      ) : takingQuiz ? (
        <div className='flex flex-col w-2/3 max-w-4/6 content-around h-full'>
          <div className='h-4/6 flex flex-col justify-center items-center '>
            <div className='font-body text-indigo-300 w-full h-1/6 flex items-end justify-start border-b-4 border-dotted border-indigo-500 border-opacity-50'>
              <span className='text-2xl mb-2 '>
                Question {currentQuestion + 1}
              </span>
              <span className='mb-2 '>/{questions.length}</span>
            </div>
            <div className='bg-blue-400 rounded-2xl transform -skew-y-1 font-display font-extrabold tracking-wide leading-relaxed text-4xl text-black text-center h-3/6 w-full my-4 flex justify-center items-center p-5'>
              <div className='bg-blue-100 rounded-2xl transform skew-y-1 h-full w-full flex justify-center items-center p-5'>
                <p>{decoder.decode(questions[currentQuestion].question)}</p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 grid-flow-row gap-6 justify-center items-center '>
            {questions[currentQuestion].answerChoices.map(
              (answerChoice, index) => (
                <button
                  className='bg-blue-300 bg-opacity-20 hover:bg-blue-500 text-white font-bold rounded-full py-4 px-4 w-full box-border font-body border-4 border-blue-500'
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
        </div>
      ) : (
        <div className='flex flex-col h-full'>
          <div className='flex flex-col items-center h-5/6'>
            <div className='w-5/6 h-1/2 flex justify-center items-center'>
              <div className='items-center'>
                <img src='../images/quizler_logo.png' alt='quizler' />
              </div>
            </div>
            <div className='flex flex-col py-8 px-8 w-1/2 mx-auto bg-white bg-opacity-40 rounded-xl shadow-md space-y-2'>
              <button
                className='bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold rounded-xl py-3 px-4 my-2 mx-3'
                onClick={handleQuizStart}
              >
                Begin Quiz
              </button>
              <div className='flex'>
                <button
                  className={
                    isActive === 'easy'
                      ? 'transition duration-300 ease-in-out bg-green-500 text-white font-bolder rounded-xl py-3 px-4 my-2 mx-3 transform-gpu scale-125 w-full'
                      : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-2 mx-3 transform-gpu scale-100 w-full'
                  }
                  onClick={() => handleDifficulty('easy')}
                >
                  Easy
                </button>
                <button
                  className={
                    isActive === 'medium'
                      ? 'transition duration-300 ease-in-out bg-yellow-500 text-white font-bolder rounded-xl py-3 px-4 my-2 mx-3 transform-gpu scale-125 w-full'
                      : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-2 mx-3 transform-gpu scale-100 w-full'
                  }
                  onClick={() => handleDifficulty('medium')}
                >
                  Medium
                </button>

                <button
                  className={
                    isActive === 'hard'
                      ? 'transition duration-300 ease-in-out bg-red-500 text-white font-bolder rounded-xl py-3 px-4 my-2 mx-3 transform-gpu scale-125 w-full'
                      : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-2 mx-3 transform-gpu scale-100 w-full'
                  }
                  onClick={() => handleDifficulty('hard')}
                >
                  Hard
                </button>
              </div>
            </div>
          </div>
          <footer className='h-1/6 flex justify-center items-end text-gray-200 text-xl py-4'>
            <div>
              Created by{' '}
              <a
                className='hover:text-blue-400'
                target='_blank'
                rel='noreferrer'
                href='https://sidneybrownjr.com'
              >
                Sidney
              </a>{' '}
              with{' '}
              <a
                className='hover:text-blue-400'
                target='_blank'
                rel='noreferrer'
                href='https://opentdb.com/'
              >
                OpenTriviaDB
              </a>
              .
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;

/* 
To-Do 
- Prevent 'Begin Quiz' from being clicked until a Difficulty is selected
- Prevent API from being called until 'Begin Quiz' is clicked
- "Design Idea": When difficulty is click, pulse 'Begin Quiz' button with arrows pointing at it?
- Add a Loading wheel
- Time it took to finish the quiz
- Make it Mobile Responsive
- Add animations
- Separate program into components

-------------Further Extras--------------
- User can share the result of a quiz on social media
- Add multiple quizzes to the application. User can select which one to take
- User can create an account and have all the scores saved in his dashboard. User can complete a quiz multiple times
*/

/*
What It Does Currently
- User can start the quiz by pressing a button
- User can see a question with 4 possible answers
- After selecting an answer, display the next question to the User. Do this until the quiz is finished
- At the end, the User can see the following statistics
    - How many correct answers did he get
    - A message showing if he passed or failed the quiz
- 'change difficulty' option to the end of the quiz
*/
