import { SimpleGrid, Button, Text } from "@chakra-ui/react";

const decoder = require("he").decode;

export const Answers = ({
  correctAnswer,
  answerChoices,
  onClick,
  disabled,
}) => (
  <SimpleGrid columns={[1, 2]} spacing={[4, 8]}>
    {answerChoices?.map((answer, index) => (
      <Button
        p="28px"
        size="lg"
        isDisabled={disabled}
        name={answer}
        key={index + answer}
        colorScheme="blue"
        onClick={(e) => onClick(e, correctAnswer)}
        style={{
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        <Text fontSize="sm">{decoder(answer)}</Text>
      </Button>
    ))}
  </SimpleGrid>
);