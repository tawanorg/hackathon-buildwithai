
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
  Select
} from '@chakra-ui/react'

import Loader from '../components/Loader';
import LoginForm from '../components/LoginForm';

const MOCK_ITEMS = [
  {
    id: 1,
    name: "Snake Beans",
    photo: "https://i.ndtvimg.com/i/2014-11/snake-beans_625x300_71416569505.jpg",
    from: "Tew",
    time: new Date()
  },
  {
    id: 2,
    name: "Bok Choy",
    photo: "https://i.ndtvimg.com/mt/cooks/2014-11/1382352986_bokchoy.jpg",
    from: "Ayz",
    time: new Date()
  },
  {
    id: 3,
    name: "Sweet Potatoes",
    photo: "https://i.ndtvimg.com/mt/cooks/2014-11/sweet-potato-shakarkandi.jpg",
    from: "Jony",
    time: new Date()
  },{
    id: 4,
    name: "Rice",
    photo: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2015%2F02%2FCooked-Rice.jpg&q=85",
    from: "Tawan",
    time: new Date(),
    sponsored: 'Coles'
  },
  {
    id: 5,
    name: "Rice",
    photo: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2015%2F02%2FCooked-Rice.jpg&q=85",
    from: "Tawan",
    time: new Date()
  },
  {
    id: 6,
    name: "Rice",
    photo: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2015%2F02%2FCooked-Rice.jpg&q=85",
    from: "Tawan",
    time: new Date(),
    sponsored: 'Woolworth'
  }
]

const RECOMMENDATION_DATA = MOCK_ITEMS
  
export default function Home() {
  const [view, setView] = React.useState('login');
  const [data, setData] = React.useState(RECOMMENDATION_DATA)
  const [selectedProduct, setProduct] = React.useState(null);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
 
  const toast = useToast()
  
  useEffect(() => {
    setView('login')
  }, [])

  const onNotInterested = (id) => {
    setData(data => data.filter(x => x.id !== id))
  }

  const onSelect = (id) => {
    const product = MOCK_ITEMS.find(x => x.id === id)
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
            <Button variant="solid" colorScheme="green">Get Direction</Button>
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
            <Heading fontSize="md">Products Recommendation ({MOCK_ITEMS.length})</Heading>
            <Text fontSize="sm" opacity={0.6}>Items based on your' buying behavior</Text>
          </Flex>
          <Divider />
          <Box my="20" /> 
          <SimpleGrid columns={2} spacing={4}>
            {
              data.map((item => (
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
            <Heading fontSize="md">Expiring products ({MOCK_ITEMS.length})</Heading>
            <Stack spacing={3}>
              <Select placeholder="Sort by date" size="xs" />
            </Stack>
          </HStack>
          <Divider />
          <Stack>
          {
            MOCK_ITEMS.map((item) => (
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
                      <Text fontSize="sm" opacity={"0.7"}>From <b>{item.from}</b> on {item.time.toUTCString()}</Text>
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
 
