import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeCategory,
  changeDifficulty,
  changeType,
} from "../features/options/optionsSlice";
import { Stack, Heading, Button } from "@chakra-ui/react";

export default function QueryError() {
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
    <Stack spacing={8} h="95vh" justify="center" align="center">
      <Heading as="h1" color="gray.50" textAlign="center">
        No results were found for those parameters.
      </Heading>
      <Button
        p="28px"
        color="blue.900"
        backgroundColor="#949BFF"
        _hover={{
          background: "#707AFF",
          color: "gray.200",
        }}
        onClick={() => returnToHome()}
        w={["100%", "50%"]}
      >
        Return to Homepage
      </Button>
    </Stack>
  );
}
