import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../api/apiSlice";
import { changeCategory, changeDifficulty, changeType } from "./optionsSlice";
import { Box, Button, Spinner } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { SelectField } from "../../common/SelectField";

export const Options = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let content;

  // options for quiz "Difficulty"
  const difficulty = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];
  // options for quiz "Type"
  const types = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True / False" },
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
    let nodeName = e.target.name;
    switch (nodeName) {
      case "category":
        dispatch(changeCategory(e.target.value));
        break;
      case "difficulty":
        dispatch(changeDifficulty(e.target.value));
        break;
      case "type":
        dispatch(changeType(e.target.value));
        break;
      default:
        return;
    }
  };

  if (isLoading) {
    content = (
      <Spinner
        thickness="4px"
        speed="0.60s"
        emptyColor="gray.200"
        color="blue.500"
        boxSize={20}
      />
    );
  } else if (isSuccess) {
    content = (
      <>
        <SelectField
          label={"category"}
          options={categories}
          onChange={handleChange}
        />
        <SelectField
          label={"difficulty"}
          options={difficulty}
          onChange={handleChange}
        />
        <SelectField label={"type"} options={types} onChange={handleChange} />
        <Button
          colorScheme="blue"
          onClick={() => navigate("/quiz")}
          isFullWidth
        >
          Begin Quiz
        </Button>
      </>
    );
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <Stack spacing={8} m={2}>
      <Box>
        <img className="" src="../images/quizler_logo.png" alt="quizler" />
      </Box>
      <Stack align="center" spacing={3} h={256}>
        {content}
      </Stack>
    </Stack>
  );
};
