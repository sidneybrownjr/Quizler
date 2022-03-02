import { Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const Footer = () => {
  return (
    <Box h="5vh">
      <Text color="gray.50" verticalAlign="bottom">
        Created by{" "}
        <Link href="https://sidneybrownjr.com" isExternal>
          Sidney <ExternalLinkIcon mx="2px" />
        </Link>
        with{" "}
        <Link href="https://opentdb.com/" isExternal>
          OpenTriviaDB <ExternalLinkIcon mx="2px" />
        </Link>
        .
      </Text>
    </Box>
  );
};
