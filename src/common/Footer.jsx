import { Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const Footer = () => {
  return (
    <Box h="5vh">
      <Text color="gray.50" verticalAlign="bottom">
        Created by{" "}
        <Link
          href="https://sidneybrownjr.com"
          _hover={{
            color: "blue.300",
          }}
          isExternal
        >
          Sidney <ExternalLinkIcon mx="2px" />
        </Link>{" "}
        with{" "}
        <Link
          href="https://opentdb.com/"
          _hover={{
            color: "blue.300",
          }}
          isExternal
        >
          OpenTriviaDB <ExternalLinkIcon mx="2px" />
        </Link>
        .
      </Text>
    </Box>
  );
};
