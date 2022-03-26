import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetQuestionsQuery } from '../api/apiSlice';
import { changeScore } from '../options/optionsSlice';
import { Answers } from '../answers/Answers';
import { LoadingSpinner } from '../../common/Spinner';
import { NoResults } from '../../common/NoResults';
import { Stack, Heading, Text, Flex, Spacer, useToast } from '@chakra-ui/react';

const decoder = require('he').decode;

const Question = ({ question }) => {
  return (
    <Text fontSize={['xl', '2xl', '4xl']} color="gray.50" h="60%">
      {decoder(question)}
    </Text>
  );
};

export default function QuizQuestions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // retrieve query parameters stored in store
  const { category, difficulty, type, score } = useSelector(
    (state) => state.options
  );

  // retrieve questions from RTK Query slice
  const {
    data: questions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery(
    { category, difficulty, type },
    { refetchOnMountOrArgChange: true }
  );

  let content;

  const handleAnswer = (e, correctAnswer) => {
    setDisabled(true);

    if (String(e.target.name) === String(correctAnswer)) {
      toast({
        title: 'Correct!',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
      dispatch(changeScore(score + 1));
    } else {
      toast({
        title: 'Wrong!',
        description: `Correct answer is ${correctAnswer}.`,
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
    // delay question change so user can see the correct answer
    questionIndex < 9
      ? setTimeout(() => {
          setQuestionIndex((prev) => prev + 1);
          setDisabled(false);
        }, 1500)
      : setTimeout(() => {
          navigate('/results');
        }, 1500);
  };

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = !questions.length ? (
      <NoResults />
    ) : (
      <Fragment>
        <Flex h="10vh">
          <Text color="gray.50" size="lg">
            Question {questionIndex + 1}/{questions?.length}
          </Text>
          <Spacer />
          <Text color="gray.50">Score: {score}</Text>
        </Flex>
        <Stack textAlign="center" h="60vh">
          <Question
            key={questions?.[questionIndex].id}
            question={questions?.[questionIndex].question}
          />
          <Answers
            correctAnswer={questions?.[questionIndex].answer}
            answerChoices={questions?.[questionIndex].answerChoices}
            onClick={handleAnswer}
            disabled={disabled}
          />
        </Stack>
      </Fragment>
    );
  } else if (isError) {
    content = (
      <Heading as="h1" color="gray.50" textAlign="center">
        {error}
      </Heading>
    );
  }

  return (
    <Stack spacing={8} h="95vh" w="100%" justify="center">
      {content}
    </Stack>
  );
}
