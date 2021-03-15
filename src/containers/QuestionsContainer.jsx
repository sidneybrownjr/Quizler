import React, { useEffect } from 'react';
import Questions from '../components/Questions';

const QuestionsContainer = (props) => {
  //pass in state via props
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

  useEffect(() => {
    // query API
    const getQuestions = async () => {
      // OpenTriviaDB API
      const apiURL = `https://opentdb.com/api.php?amount=10&category=${chosenCategory}&difficulty=${difficulty}&type=multiple`;

      await fetch(apiURL)
        .then((res) => {
          //console.log(res.json().response_code);
          return res.json();
        })
        .then((loadedQuestions) => {
          // console.log(loadedQuestions)
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
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getQuestions((question) => setQuestions({ question: question }));
  }, [setQuestions, chosenCategory, difficulty]);

  return (
    <Questions
      questions={questions}
      score={score}
      setScore={setScore}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      setOutOfTime={setOutOfTime}
    />
  );
};

export default QuestionsContainer;
