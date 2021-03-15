import React from 'react';
import TimerContainer from '../containers/TimerContainer';
import Loader from 'react-loader-spinner';
const decoder = require('he');

const Questions = (props) => {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    score,
    setScore,
    setOutOfTime,
  } = props;

  const handleAnswerOptionClick = (answer) => {
    if (answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setOutOfTime(true);
    }
  };

  return (
    <>
      {questions && questions[currentQuestion] ? (
        <>
          <div className='h-1/2 md:h-4/6 flex flex-col justify-center items-center '>
            <div className='font-body text-indigo-300 w-full h-1/6 flex flex-col-reverse md:flex-row items-end justify-between border-b-4 border-dotted border-indigo-500 border-opacity-50'>
              <div className='md:mb-2'>
                <span className='text-lg md:text-2xl'>
                  Question {currentQuestion + 1}
                </span>
                <span className=''>/{questions.length}</span>
              </div>
              <TimerContainer
                initialSeconds={30}
                initialMinutes={1}
                setOutOfTime={setOutOfTime}
              />
            </div>
            <div className='bg-blue-400 rounded-2xl transform -skew-y-1 font-display font-extrabold tracking-wide leading-relaxed text-xs md:text-4xl text-black text-center h-4/6 md:h-3/6 w-full my-4 flex justify-center items-center p-5'>
              <div className='bg-blue-100 rounded-2xl transform skew-y-1 h-full w-full flex justify-center items-center p-5'>
                <p>{decoder.decode(questions[currentQuestion].question)}</p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-2 md:gap-4 justify-center items-center '>
            {questions[currentQuestion].answerChoices.map(
              (answerChoice, index) => (
                <button
                  className='bg-blue-300 bg-opacity-20 hover:bg-blue-500 text-xs md:text-base text-white font-bold rounded-full py-2 md:py-4 px-4 w-full box-border font-body border-4 border-blue-500'
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
        <div className='h-full md:h-4/6 flex flex-col justify-center items-center '>
          <Loader
            type='Rings'
            color='#00BFFF'
            height={420}
            width={420}
            radius={210}
          />
          <p className='text-center text-white text-xs md:text-lg lg:text-xl'>
            If you've had enough time to read this, it's likely the API didn't
            return anything... <br /> 😬 Try refreshing.
          </p>
        </div>
      )}
    </>
  );
};

export default Questions;
