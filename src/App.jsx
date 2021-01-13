import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Timer from './components/Timer';
import './App.css';
// HTML entity encoder/decoder
const decoder = require('he');

const App = () => {
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [loading, isLoading] = useState(false);
  const [outOfTime, setOutOfTime] = useState(false);

  const getQuestions = async (category, difficulty) => {
    // Open Trivia DB API
    const apiURL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

    await fetch(apiURL)
      .then((res) => {
        return res.json();
      })
      .then((loadedQuestions) => {
        // unload array returned from API into questions array
        setQuestions(
          loadedQuestions.results.map((loadedQuestions) => {
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
          })
        );
        //console.log(questions);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCategories = () => {
    // Open Trivia DB API
    const apiURL = `https://opentdb.com/api_category.php`;

    fetch(apiURL)
      .then((res) => {
        return res.json();
      })
      .then((cat) => {
        setCategories([...cat.trivia_categories]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    setOutOfTime(false);
    if (option === 'difficulty') {
      setTakingQuiz(false);
      setQuestions([]);
    } else if (option === 'category') {
      setChosenCategory(0);
      setTakingQuiz(false);
      setDifficulty('');
      setQuestions([]);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    isLoading(true);
    getQuestions(chosenCategory, difficulty);
    isLoading(false);
  }, [chosenCategory, difficulty]);

  return (
    <div className='container flex items-center justify-center h-screen w-5/6'>
      {showScore || outOfTime ? (
        <div className='flex flex-col w-full h-5/6 items-center'>
          <div className=''>
            {score / questions.length > 0.59 ? (
              <img src='../images/win.gif' alt='trophy' />
            ) : (
              <img
                className='border-4 border-blue-500 border-opacity-50'
                src='../images/lose.gif'
                alt="timmy turner's dad"
              />
            )}
          </div>
          <div className='h-2/5 md:h-1/2 flex flex-col justify-end'>
            <div className='font-body font-extrabold text-lg md:text-5xl text-white text-center py-3'>
              You scored a <em>whopping</em>
              <span className='text-indigo-300 text-xl md:text-6xl'>
                {' '}
                {score}
              </span>{' '}
              out of
              <span className='text-indigo-300 text-xlmd:text-6xl'>
                {' '}
                {questions.length}
              </span>
              .
            </div>
            <div className='font-body font-bold text-xl md:text-4xl text-white text-center py-3'>
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
          <div className='grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-2 md:gap-6 items-center py-3 h-1/2 w-5/6'>
            <button
              className='bg-blue-600 hover:bg-blue-500 text-white text-sm lg:text-2xl font-bold rounded-xl py-3 lg:py-5 px-4 md:my-2 w-5/6 md:w-full md:h-2/6 2xl:h-2/6 xl:h-5/6 justify-self-center'
              onClick={() => handleRestart('restart')}
            >
              Try Again
            </button>
            <button
              className='bg-blue-600 hover:bg-blue-500 text-white text-sm lg:text-2xl font-bold rounded-xl py-3 lg:py-5 px-4 md:my-2 w-5/6 md:w-full md:h-2/6 2xl:h-2/6 xl:h-5/6 justify-self-center'
              onClick={() => handleRestart('category')}
            >
              Change Category
            </button>
            <button
              className='bg-blue-600 hover:bg-blue-500 text-white text-sm lg:text-2xl font-bold rounded-xl py-3 lg:py-5 px-4 md:my-2 w-5/6 md:w-full md:h-2/6 2xl:h-2/6 xl:h-5/6 justify-self-center'
              onClick={() => handleRestart('difficulty')}
            >
              Change Difficulty
            </button>
          </div>
        </div>
      ) : takingQuiz ? (
        loading ? (
          <Loader
            type='Rings'
            color='#00BFFF'
            height={420}
            width={420}
            radius={210}
          />
        ) : (
          !outOfTime &&
          questions.length !== 0 && (
            <div className='flex flex-col xl:w-2/3 content-around h-full'>
              <div className='h-1/2 md:h-4/6 flex flex-col justify-center items-center '>
                <div className='font-body text-indigo-300 w-full h-1/6 flex flex-col-reverse md:flex-row items-end justify-between border-b-4 border-dotted border-indigo-500 border-opacity-50'>
                  <div className='md:mb-2'>
                    <span className='text-lg md:text-2xl'>
                      Question {currentQuestion + 1}
                    </span>
                    <span className=''>/{questions.length}</span>
                  </div>
                  <Timer
                    initialSeconds={30}
                    initialMinutes={10}
                    callback={setOutOfTime}
                  />
                </div>
                <div className='bg-blue-400 rounded-2xl transform -skew-y-1 font-display font-extrabold tracking-wide leading-relaxed md:text-4xl text-black text-center h-4/6 md:h-3/6 w-full my-4 flex justify-center items-center p-5'>
                  <div className='bg-blue-100 rounded-2xl transform skew-y-1 h-full w-full flex justify-center items-center p-5'>
                    {questions && (
                      <p>
                        {decoder.decode(questions[currentQuestion].question)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-2 md:gap-6 justify-center items-center '>
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
          )
        )
      ) : (
        <div className='flex flex-col h-full'>
          <div className='flex flex-col justify-center items-center h-full'>
            <div className='w-5/6 h-2/6 flex justify-center items-center '>
              <div className='items-center'>
                <img src='../images/quizler_logo.png' alt='quizler' />
              </div>
            </div>
            <div className='flex flex-col py-8 px-8 w-5/6 xl:w-1/2 md:h-2/6 mx-auto bg-white justify-center md:justify-evenly bg-opacity-40 rounded-xl shadow-md space-y-2'>
              <button
                disabled={!difficulty ? 'disabled' : ''}
                title={
                  !difficulty
                    ? 'Please select a category and difficulty first'
                    : ''
                }
                className={
                  difficulty
                    ? 'bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold rounded-xl py-3 px-4 my-2 transition duration-300 '
                    : 'bg-blue-600 opacity-50 text-white text-xl font-bold rounded-xl py-3 px-4 my-2 transition duration-300 cursor-not-allowed'
                }
                onClick={handleQuizStart}
              >
                Begin Quiz
              </button>
              {!chosenCategory ? (
                <>
                  <div className='text-gray-100 text-center text-xl'>
                    Choose a category:
                  </div>
                  <select
                    className='xl:w-full appearance-none rounded-large py-1'
                    value={chosenCategory}
                    onChange={(e) => setChosenCategory(e.target.value)}
                  >
                    {categories.map((cat, key) => (
                      <option key={key} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <div className='text-xl text-gray-100 text-center'>
                    Select a difficulty below:
                  </div>
                  <div className='grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-3 md:gap-6'>
                    <button
                      className={
                        difficulty === 'easy'
                          ? 'transition duration-300 ease-in-out bg-green-500 text-white font-bolder rounded-xl py-3 px-4 my-2 transform-gpu scale-125  w-2/3 md:w-full place-self-center'
                          : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-2 transform-gpu scale-100  w-2/3 md:w-full place-self-center'
                      }
                      onClick={() => setDifficulty('easy')}
                    >
                      Easy
                    </button>
                    <button
                      className={
                        difficulty === 'medium'
                          ? 'transition duration-300 ease-in-out bg-yellow-500 text-white font-bolder rounded-xl py-3 px-4 my-2 transform-gpu scale-125 w-2/3 md:w-full place-self-center'
                          : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-2 transform-gpu scale-100 w-2/3 md:w-full place-self-center'
                      }
                      onClick={() => setDifficulty('medium')}
                    >
                      Medium
                    </button>
                    <button
                      className={
                        difficulty === 'hard'
                          ? 'transition duration-300 ease-in-out bg-red-500 text-white font-bolder rounded-xl py-3 px-4 my-2 transform-gpu scale-125  w-2/3 md:w-full place-self-center'
                          : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-2 transform-gpu scale-100  w-2/3 md:w-full place-self-center'
                      }
                      onClick={() => setDifficulty('hard')}
                    >
                      Hard
                    </button>
                  </div>
                  <div
                    className='text-xs md:text-base text-gray-300 hover:text-white cursor-pointer mt-6'
                    onClick={() => setChosenCategory(0)}
                  >
                    {'<-- Go back and choose another category'}
                  </div>
                </>
              )}
            </div>
            <footer className='h-2/6 flex justify-center items-end text-gray-200 text-xs xl:text-xl py-2'>
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
        </div>
      )}
    </div>
  );
};

export default App;

/* 
To-Do 
Issue: Sometimes the questions will not load before the render and will say undefined
Solution: Seems to be fixed if I use useEffect? loads both API prior to me trying to render things
-------------Design wise-----------------
- Add animations
- "Design Idea": When difficulty is click, pulse 'Begin Quiz' button with arrows pointing at it?
- Separate program into components
-------------Further Extras--------------
- User can share the result of a quiz on social media
- Add multiple quizzes to the application. User can select which one to take
- User can create an account and have all the scores saved in his dashboard. User can complete a quiz multiple times
*/
