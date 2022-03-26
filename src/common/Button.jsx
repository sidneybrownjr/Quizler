import { Box } from '@chakra-ui/react';

export const Button = ({ children, ...props }) => {
  return (
    <Box
      as="button"
      style={{
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      }}
      color="blue.900"
      backgroundColor="#949BFF"
      _hover={{
        background: '#707AFF',
        color: 'gray.200',
      }}
      p="28px"
      lineHeight="1.2"
      borderRadius="md"
      h="24px"
      w={['100%', '50%']}
      display="inline-flex"
      outline="none"
      position="relative"
      verticalAlign="middle"
      justifyContent="center"
      alignItems="center"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      {...props}
    >
      {children}
    </Box>
  );
};
