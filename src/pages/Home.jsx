import CategoriesContainer from '../containers/CategoriesContainer';
import Footer from '../shared/Footer';

const Home = (props) => {
  const {
    categories,
    setCategories,
    setTakingQuiz,
    chosenCategory,
    setChosenCategory,
    difficulty,
    setDifficulty,
  } = props;

  const handleQuizStart = () => {
    setTakingQuiz(true);
  };

  return (
    <div className='flex flex-col h-full w-5/6'>
      <div className='flex flex-col justify-center items-center h-full'>
        <div className='w-4/6 h-2/6 md:w-5/6 md:h-3/6 flex justify-center items-center '>
          <div className='items-center'>
            <img src='../images/quizler_logo.png' alt='quizler' />
          </div>
        </div>
        <div className='flex flex-col py-2 md:py-8 px-8 w-5/6 xl:w-1/2 h-5/6 md:h-2/6 mx-auto bg-white justify-center md:justify-evenly bg-opacity-40 rounded-xl shadow-md space-y-2'>
          <button
            disabled={!difficulty ? 'disabled' : ''}
            title={
              !difficulty ? 'Please select a category and difficulty first' : ''
            }
            className={
              difficulty
                ? 'bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-xl font-bold rounded-xl py-1 px-4 my-2 md:py-2 md:my-2 transition duration-300 '
                : 'bg-blue-600 opacity-50 text-white text-xs md:text-xl font-bold rounded-xl py-1 px-4 my-2 md:py-2 md:my-2 transition duration-300 cursor-not-allowed'
            }
            onClick={handleQuizStart}
          >
            Begin Quiz
          </button>
          {!chosenCategory ? (
            <>
              <div className='text-gray-100 text-center text-base md:text-xl'>
                Choose a category:
              </div>
              <CategoriesContainer
                categories={categories}
                setCategories={setCategories}
                setChosenCategory={setChosenCategory}
              />
            </>
          ) : (
            <>
              <div className='text-xs md:text-lg lg:text-xl text-gray-100 text-center'>
                Select a difficulty below:
              </div>
              <div className='grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-3 md:gap-6 text-xs md:text-base'>
                <button
                  className={
                    difficulty === 'easy'
                      ? 'transition duration-300 ease-in-out bg-green-500 text-white font-bolder rounded-xl py-3 px-4 my-1 md:my-2 transform-gpu scale-125  w-2/3 md:w-full place-self-center'
                      : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-1 md:my-2 transform-gpu scale-100  w-2/3 md:w-full place-self-center'
                  }
                  onClick={() => setDifficulty('easy')}
                >
                  Easy
                </button>
                <button
                  className={
                    difficulty === 'medium'
                      ? 'transition duration-300 ease-in-out bg-yellow-500 text-white font-bolder rounded-xl py-3 px-4 my-1 md:my-2 transform-gpu scale-125 w-2/3 md:w-full place-self-center'
                      : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-1 md:my-2 transform-gpu scale-100 w-2/3 md:w-full place-self-center'
                  }
                  onClick={() => setDifficulty('medium')}
                >
                  Medium
                </button>
                <button
                  className={
                    difficulty === 'hard'
                      ? 'transition duration-300 ease-in-out bg-red-500 text-white font-bolder rounded-xl py-3 px-4 my-1 md:my-2 transform-gpu scale-125  w-2/3 md:w-full place-self-center'
                      : 'transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 px-4 my-1 md:my-2 transform-gpu scale-100  w-2/3 md:w-full place-self-center'
                  }
                  onClick={() => setDifficulty('hard')}
                >
                  Hard
                </button>
              </div>
            </>
          )}
        </div>
        {chosenCategory ? (
          <div
            className='text-xs md:text-base text-gray-300 hover:text-white cursor-pointer mt-6'
            onClick={() => setChosenCategory(0)}
          >
            {'<-- Go back and choose another category'}
          </div>
        ) : (
          ''
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
