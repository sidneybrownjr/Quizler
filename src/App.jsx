import { useState } from 'react';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function App() {
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [chosenCategory, setChosenCategory] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [score, setScore] = useState(0);
  const [outOfTime, setOutOfTime] = useState(false);

  return (
    <div className='container flex items-center justify-center h-screen w-5/6 p-8'>
      {!takingQuiz ? (
        <Home
          categories={categories}
          setCategories={setCategories}
          setTakingQuiz={setTakingQuiz}
          chosenCategory={chosenCategory}
          setChosenCategory={setChosenCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      ) : !outOfTime ? (
        <Quiz
          questions={questions}
          setQuestions={setQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          score={score}
          setScore={setScore}
          setOutOfTime={setOutOfTime}
          chosenCategory={chosenCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      ) : (
        <Results
          score={score}
          setScore={setScore}
          questions={questions}
          setQuestions={setQuestions}
          setCurrentQuestion={setCurrentQuestion}
          setOutOfTime={setOutOfTime}
          setTakingQuiz={setTakingQuiz}
          setDifficulty={setDifficulty}
          setChosenCategory={setChosenCategory}
        />
      )}
    </div>
  );
}

export default App;
