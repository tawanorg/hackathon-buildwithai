import { Box, extendTheme, ChakraProvider } from "@chakra-ui/react"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.100" >
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
