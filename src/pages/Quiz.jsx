import QuestionsContainer from '../containers/QuestionsContainer';

const Quiz = (props) => {
  const {
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    score,
    setScore,
    setOutOfTime,
    chosenCategory,
    difficulty,
  } = props;

  return (
    <div className='flex flex-col md:w-5/6 lg:w-2/3 content-around h-full'>
      <QuestionsContainer
        questions={questions}
        setQuestions={setQuestions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        score={score}
        setScore={setScore}
        setOutOfTime={setOutOfTime}
        chosenCategory={chosenCategory}
        difficulty={difficulty}
      />
    </div>
  );
};

export default Quiz;
