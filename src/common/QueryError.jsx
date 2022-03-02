import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCategory,
  changeDifficulty,
  changeType,
} from "../features/options/optionsSlice";
import { Stack, Heading, Button } from "@chakra-ui/react";

export const QueryError = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const returnToHome = () => {
    // return state to og condition
    dispatch(changeCategory(""));
    dispatch(changeDifficulty(""));
    dispatch(changeType(""));
    navigate("/");
  };

  return (
    <Stack align="center" justify="center" spacing={4}>
      <Heading as="h1" color="gray.50" textAlign="center">
        No results were found for those parameters.
      </Heading>
      <Button colorScheme="blue" onClick={() => returnToHome()}>
        Return to Homepage
      </Button>
    </Stack>
  );
};
