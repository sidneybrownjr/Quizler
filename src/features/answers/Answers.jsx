import { SimpleGrid } from '@chakra-ui/react';
import { Button } from '../../common/Button';

const decoder = require('he').decode;

export const Answers = ({
  correctAnswer,
  answerChoices,
  onClick,
  disabled,
}) => (
  <SimpleGrid columns={[1, 2]} spacing={[4, 8]}>
    {answerChoices?.map((answer, index) => {
      return (
        <Button
          name={answer}
          key={index + answer}
          fontSize="sm"
          w={['100%']}
          onClick={(e) => onClick(e, correctAnswer)}
          isDisabled={disabled}
        >
          {decoder(answer)}
        </Button>
      );
    })}
  </SimpleGrid>
);
