import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../api/apiSlice';
import { changeCategory, changeDifficulty, changeType } from './optionsSlice';
import { Box, Stack, Heading } from '@chakra-ui/react';
import { LoadingSpinner } from '../../common/Spinner';
import { SelectField } from '../../common/SelectField';
import { Button } from '../../common/Button';

export const Options = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let content;

  // options for quiz "Difficulty"
  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];
  // options for quiz "Type"
  const types = [
    { id: 'multiple', name: 'Multiple Choice' },
    { id: 'boolean', name: 'True / False' },
  ];

  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  // uses the name of the node to dispatch the appropriate action
  const handleChange = (e) => {
    let nodeName = String(e.target.name);
    switch (nodeName) {
      case 'category':
        dispatch(changeCategory(String(e.target.value)));
        break;
      case 'difficulty':
        dispatch(changeDifficulty(String(e.target.value)));
        break;
      case 'type':
        dispatch(changeType(String(e.target.value)));
        break;
      default:
        return;
    }
  };

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <>
        <SelectField
          label="category"
          options={categories}
          onChange={handleChange}
        />
        <SelectField
          label="difficulty"
          options={difficulties}
          onChange={handleChange}
        />
        <SelectField label="type" options={types} onChange={handleChange} />
        <Button onClick={() => navigate('/quiz')} w={['100%']}>
          Begin Quiz
        </Button>
      </>
    );
  } else if (isError) {
    content = (
      <Heading as="h1" color="gray.50" textAlign="center">
        {error}
      </Heading>
    );
  }

  return (
    <Stack spacing={8} p={2} h="95vh" align="center" justify="center">
      <Box>
        <img
          width="640"
          height="360"
          src="../images/quizler_logo.webp"
          alt="quizler"
        />
      </Box>
      <Stack align="center" spacing={3} h={256}>
        {content}
      </Stack>
    </Stack>
  );
};
