import '../styles/global.css';
import { Box, extendTheme, ChakraProvider } from "@chakra-ui/react"

const colors = {
  gray: {
    100: "#fffef8",
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
