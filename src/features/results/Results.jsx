import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeCategory,
  changeDifficulty,
  changeType,
  changeScore,
} from '../options/optionsSlice';
import { Stack, Heading } from '@chakra-ui/react';
import { Button } from '../../common/Button';

export default function Result() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { score } = useSelector((state) => state.options);

  const returnToHome = () => {
    // return state to og condition
    dispatch(changeCategory(''));
    dispatch(changeDifficulty(''));
    dispatch(changeType(''));
    dispatch(changeScore(0));
    navigate('/');
  };

  return (
    <Stack spacing={8} h="95vh" justify="center" align="center" w="100%">
      <Heading as="h1" color="gray.50" textAlign="center">
        Final Score: {score}
      </Heading>
      <Button onClick={() => returnToHome()}>Return to Homepage</Button>
    </Stack>
  );
}
