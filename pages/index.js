
import Map from '../components/Map';
import React, { useEffect } from 'react';
import {
  Alert,
  Divider,
  CloseButton,
  SimpleGrid,
  useToast,
  Badge,
  useDisclosure, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ScaleFade, 
  Avatar, 
  Tooltip,
  Image, 
  Text, 
  Flex, 
  Container, 
  Heading, 
  Box, 
  Stack, 
  HStack, 
  Button, 
  Select,
  Spinner
} from '@chakra-ui/react'

import Loader from '../components/Loader';
import LoginForm from '../components/LoginForm';
 
export default function Home() {
  const [view, setView] = React.useState('login');
  
  const [EXPIRING_DATA, setExpiredData] = React.useState([])
  const [RECOMMENDATION_DATA, setRecData] = React.useState([])
 
  const [selectedProduct, setProduct] = React.useState(null);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()

  const getExpiredData = async () => {
    const response = await fetch('/api/expired')
    const result = await response.json()
    setExpiredData(result)
  }

  const getRecData = async () => {
    const response = await fetch('/api/recommend')
    const result = await response.json()
    setRecData(result)
  }
  
  useEffect(() => {
    setView('login')
    getExpiredData()
    getRecData()
  }, [])

  const onNotInterested = (id) => {
    setRecData(data => data.filter(x => x.id !== id))
  }

  const onSelect = (id) => {
    const product = EXPIRING_DATA.find(x => x.id === id)
    setProduct(product)
    onOpen()
  }

  const onClose = () => {
    setProduct(null)
    onCloseModal()
  }

  const onSubmit = () => {
    setView('loading')
    setTimeout(() => {
      setView('admin')
    }, 500)
  }

  if (view === 'loading') {
    return <Loader />
  }

  if (view === 'login') {
    return <LoginForm title="ZEROO Login" onSubmit={onSubmit} />
  }
 
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {selectedProduct && (
          <>
          <ModalHeader>
            {selectedProduct.name}
            <Badge ml="2" variant="subtle" colorScheme="yellow">
              <Text fontSize="xs">Expired in 2 days</Text>
            </Badge>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"}>
              <Image boxSize="100%" maxH="300" src={selectedProduct.photo} alt="Photo" objectFit="contain" />
              <Box bg="gray.100" borderRadius={"lg"}>
                <Map />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="solid" colorScheme="green" 
              onClick={() => {
                var anchor = document.createElement('a');
                anchor.href = 'https://www.google.com/maps/search/?api=1&query=-37.808163434%2C144.957829502'
                anchor.target="_blank";
                anchor.click();
              }}
            >
              Get Direction
            </Button>
          </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <Flex flexDir="column" width="full">
      <Flex bg="white" borderBottom={1} boxShadow={"md"} p="4">
        <Container>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex flexDir="column">
            <Heading fontSize={"3xl"}>ZEROO</Heading>
            <Text fontSize="sm" display={['none', 'none', 'inline-block']}><i>We're the best zero waste community</i></Text>
          </Flex>
          <Flex>
            <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="flex-end"
            mr={4}
          >
            <Text opacity="0.6">Your reward</Text>
            <Text fontSize="xl" fontWeight="medium">
              🎉 140 TOKENS
            </Text>
          </Flex>
          <Avatar name="Tew Tawan" />
          </Flex>
          </Flex>
        </Container>
      </Flex>
      <Container py="8">
        <Heading fontSize="2xl">👋 Welcome, Demo</Heading>
        <Stack my="4">
          <Flex flexDir="column">
            <Heading fontSize="md">Recommendation ({RECOMMENDATION_DATA.length})</Heading>
            <Text fontSize="sm" opacity={0.6}>Items based on your' buying behavior</Text>
          </Flex>
          <Divider />
          <Box my="20" /> 
          {RECOMMENDATION_DATA.length === 0 && (
            <Flex width="full" height="full" p="20" justifyContent="center" alignItems="center">
              <Spinner size="lg" />
            </Flex>
          )}
          <SimpleGrid columns={2} spacing={4}>
            {
              RECOMMENDATION_DATA.map((item => (
                <Flex flexDir="column">
                  <Box pos="relative">
                    <Image
                      borderRadius={"8"}
                      width="full"
                      h="100px"
                      objectFit="cover"
                      src={item.photo}
                      alt={item.name}
                    />
                    <Box pos="absolute" top={1} right={1}>
                      <Tooltip label="I'm not interested">
                        <CloseButton onClick={() => onNotInterested(item.id)} size="sm" bg="gray.100"  _hover={{ bg: "gray.400"}} borderRadius="full" />
                      </Tooltip>
                    </Box>
                    {!!item?.sponsored && (
                      <Box pos="absolute" bottom={1} right={1}>
                        <Badge variant="solid" colorScheme="green">
                          <Text fontSize="xs">{item.sponsored}</Text>
                        </Badge>
                      </Box>
                    )}
                  </Box>
                  <Flex flexDir="column" mt="2">
                    <Heading fontSize="lg">
                      {item.name}
                    </Heading>
                    <Text fontSize="sm" opacity={"0.7"}>From <b>{item.from}</b></Text>
                  </Flex>
                </Flex>
              )))
            }
          </SimpleGrid>
          <Box my="20" />
          <HStack justifyContent={"space-between"} alignItems={"center"} mb="4">
            <Heading fontSize="md">Expiring products ({EXPIRING_DATA.length})</Heading>
            <Stack spacing={3}>
              <Select placeholder="Sort by date" size="xs" />
            </Stack>
          </HStack>
          <Divider />
          <Stack>
          {EXPIRING_DATA.length === 0 && (
            <Flex width="full" height="full" p="20" justifyContent="center" alignItems="center">
              <Spinner size="lg" />
            </Flex>
          )}
          {
            EXPIRING_DATA.map((item) => (
              <ScaleFade initialScale={0.9} in>
                <Flex 
                  alignItems={"center"} 
                  justifyContent={"space-between"} 
                  boxShadow={"md"} 
                  borderRadius={"md"} 
                  p="4" 
                  borderTopWidth={1}
                  borderTopColor={"gray.50"}
                  bg="white"
                >
                  <Flex>
                    <Image
                      borderRadius={"8"}
                      boxSize="50px"
                      objectFit="cover"
                      src={item.photo}
                      alt={item.name}
                    />
                    <Flex flexDir="column" ml="2">
                      <Heading fontSize="lg">
                        {item.name}
                        <Badge ml="2" variant="subtle" colorScheme="yellow">
                          <Text fontSize="xs">Expired in 2 days</Text>
                        </Badge>
                      </Heading>
                      <Text fontSize="sm" opacity={"0.7"}>From <b>{item.from}</b> on {item.time}</Text>
                    </Flex>
                    </Flex>
                  <Button   onClick={() => onSelect(item.id)}>👉</Button>
                </Flex>
              </ScaleFade>
            ))
          }
          </Stack>
        </Stack>
      </Container>
    </Flex>
    </>
  )
}
 
