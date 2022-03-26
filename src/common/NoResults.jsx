import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeCategory,
  changeDifficulty,
  changeType,
} from '../features/options/optionsSlice';
import { Stack, Heading } from '@chakra-ui/react';
import { Button } from './Button';

export const NoResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const returnToHome = () => {
    // return state to og condition
    dispatch(changeCategory(''));
    dispatch(changeDifficulty(''));
    dispatch(changeType(''));
    navigate('/');
  };

  return (
    <Stack spacing={8} h="95vh" justify="center" align="center">
      <Heading as="h1" color="gray.50" textAlign="center">
        No results were found for those parameters.
      </Heading>
      <Button onClick={() => returnToHome()}>Return to Homepage</Button>
    </Stack>
  );
};
