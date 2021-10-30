import { Button, FormControl, FormLabel, Input, Stack, Heading, Box, Container } from "@chakra-ui/react";

export default function LoginForm({ title = 'NGO Login', onSubmit }) {
  return (
    <Box bg="gray.100" h="100vh" w="100vw" pt="4">
      <Container mt="20">
        <Heading my="4">{title}</Heading>
        <Stack>
          <FormControl id="username" isRequired>
            <FormLabel>First name</FormLabel>
            <Input variant="flushed" placeholder="First username" value="demo" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input variant="flushed" type="password" placeholder="Your password" value="demo" />
          </FormControl>
          <Box my="4">
            <Button
              mt={4}
              colorScheme="green"
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
