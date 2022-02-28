const Results = (props) => {
  const {
    score,
    setScore,
    questions,
    setQuestions,
    setCurrentQuestion,
    setOutOfTime,
    setTakingQuiz,
    setDifficulty,
    setChosenCategory,
  } = props;

  const handleRestart = (option = 'restart') => {
    setCurrentQuestion(0);
    setScore(0);
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

  return (
    <div className='flex flex-col w-full h-full items-center justify-around'>
      <div className='h-1/6 md:h-2/6'>
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
      <div className='h-1/5 md:h-2/5 lg:h-1/2 flex flex-col justify-end text-xs'>
        <div className='font-body font-extrabold  md:text-2xl lg:text-5xl text-white text-center py-3'>
          You scored a <em>whopping</em>
          <span className='text-indigo-300  md:text-3xl lg:text-6xl'>
            {' '}
            {score}
          </span>{' '}
          out of
          <span className='text-indigo-300 md:text-3xl lg:text-6xl'>
            {' '}
            {questions.length}
          </span>
          .
        </div>
        <div className='font-body font-bold text-xs md:text-xl lg:text-4xl text-white text-center md:py-3'>
          {score / questions.length > 0.59 ? (
            <>
              That means you <span className='text-green-400'>Passed</span> (:
            </>
          ) : (
            <>
              That means you <span className='text-red-400'>Failed</span> ):
            </>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-2 md:gap-6 items-center md:py-3 h-1/6 md:h-1/2 w-5/6 text-xs md:text-sm'>
        <button
          className='bg-blue-600 hover:bg-blue-500 text-white lg:text-2xl font-bold rounded-xl py-3 lg:py-5 px-4 md:my-2 w-5/6 md:w-full md:h-2/6 2xl:h-2/6 xl:h-2/5 justify-self-center'
          onClick={() => handleRestart('restart')}
        >
          Take Another
        </button>
        <button
          className='bg-blue-600 hover:bg-blue-500 text-white lg:text-2xl font-bold rounded-xl py-3 lg:py-5 px-4 md:my-2 w-5/6 md:w-full md:h-2/6 2xl:h-2/6 xl:h-2/5 justify-self-center'
          onClick={() => handleRestart('category')}
        >
          Change Category
        </button>
        <button
          className='bg-blue-600 hover:bg-blue-500 text-white lg:text-2xl font-bold rounded-xl py-3 lg:py-5 px-4 md:my-2 w-5/6 md:w-full md:h-2/6 2xl:h-2/6 xl:h-2/5 justify-self-center'
          onClick={() => handleRestart('difficulty')}
        >
          Change Difficulty
        </button>
      </div>
    </div>
  );
};

export default Results;
