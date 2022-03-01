import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeScore } from "../options/optionsSlice";
import { Stack, Heading, Button } from "@chakra-ui/react";

export const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { score } = useSelector((state) => state.options);

  const returnToHome = () => {
    dispatch(changeScore(0));
    navigate("/");
  };

  return (
    <Stack spacing={8}>
      <Heading as="h1" color={"gray.50"}>
        Final Score: {score}
      </Heading>
      <Button colorScheme="blue" onClick={() => returnToHome()} isFullWidth>
        Return to Homepage
      </Button>
    </Stack>
  );
};
