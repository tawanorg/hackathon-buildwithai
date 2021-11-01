import { Flex, Box, Container, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex bg="gray.100" h="100vh" w="100vw" pt="4" alignItems="center" justifyContent="center">
      <Spinner size="lg" />
    </Flex>
  )
}
