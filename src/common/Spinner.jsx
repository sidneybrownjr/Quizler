import { Spinner } from '@chakra-ui/react';

export const LoadingSpinner = () => (
  <Spinner
    h="95vh"
    thickness="4px"
    speed="0.60s"
    emptyColor="gray.200"
    color="blue.500"
    boxSize={20}
    alignSelf="center"
  />
);
