import { Stack, Heading, Box } from '@chakra-ui/react';

export default function NoResults() {
  return (
    <Stack spacing={8} h="95vh" justify="end" align="center">
      <Heading as="h1" color="gray.50" textAlign="center">
        Sorry, the page you're searching for does not exist.
      </Heading>
      <Box h="50%">
        <img width="340" src="../images/lostpenguin.webp" alt="lost penguin" />
      </Box>
    </Stack>
  );
}
