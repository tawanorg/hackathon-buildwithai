import React, { useEffect } from 'react';
import {
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
    time: new Date(),
    isApproved: false,
  },
  {
    id: 2,
    name: "Bok Choy",
    photo: "https://i.ndtvimg.com/mt/cooks/2014-11/1382352986_bokchoy.jpg",
    from: "Ayz",
    time: new Date(),
    isApproved: false,
  },
  {
    id: 3,
    name: "Sweet Potatoes",
    photo: "https://i.ndtvimg.com/mt/cooks/2014-11/sweet-potato-shakarkandi.jpg",
    from: "Jony",
    time: new Date(),
    isApproved: false,
  },{
    id: 1,
    name: "Rice",
    photo: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2015%2F02%2FCooked-Rice.jpg&q=85",
    from: "Tawan",
    time: new Date(),
    isApproved: false,
  }
]
  
export default function Home() {
  const [view, setView] = React.useState('login');
  const [data, setData] = React.useState(MOCK_ITEMS)
  const [productApprovalLoading, setProductApprovalStatus] = React.useState(false)
  const [productRejectLoading, setProductRejectStatus] = React.useState(false)
  const [selectedProduct, setProduct] = React.useState(null);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    setView('login')
  }, [])

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

  const slowlyCloseModal = () => setTimeout(() => onClose(), 200)

  const onApprove = (product) => {
    setProductApprovalStatus(true)
    setTimeout(() => {
      toast({
        title: "Product approved!",
        description: "We've transfered 100 token to "  + product.from + 'successfully',
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setProductApprovalStatus(false)
      slowlyCloseModal()
    }, 500)
  }
  

  const onReject = (product) => {
    setProductRejectStatus(true)
    setTimeout(() => {
      toast({
        title: "Product rejected!",
        description: `Rejected product ${product.name} from ${product.from}`,
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
      setProductRejectStatus(false)
      slowlyCloseModal()
    }, 500)
  }
 

  if (view === 'loading') {
    return <Loader />
  }

  if (view === 'login') {
    return <LoginForm onSubmit={onSubmit} />
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
      
              <Box bg="gray.100" borderRadius={"lg"} p="8" mt="8">
                
                <Flex flexDir="column" alignItems={"center"} justifyContent={"center"}>
                  <Avatar name={selectedProduct.from} />
                  <Text fontSize="lg" fontWeight={"bold"}>{selectedProduct.from}</Text>
                  <Text fontSize="xs">{selectedProduct.time.toUTCString()}</Text>
                </Flex>
                
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Text fontWeight="bold" mr="2">
              Token: 100
            </Text>
            <Button isLoading={productApprovalLoading} colorScheme="green" mr={3} onClick={() => onApprove(selectedProduct)}>
              Approve
            </Button>
            <Button isLoading={productRejectLoading} colorScheme="orange"  onClick={() => onReject(selectedProduct)}>
              Reject
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
          <Heading fontSize={"3xl"}>NGO Portal</Heading>
            <Avatar name="Tew Tawan" />
          </Flex>
        </Container>
      </Flex>
      <Container py="8">
        <Heading fontSize="2xl">Welcome, Demo</Heading>
        <Stack my="8">
          <HStack justifyContent={"space-between"} alignItems={"center"} mb="2">
            <Heading fontSize="md"  >Available items ({MOCK_ITEMS.length})</Heading>
            <Stack spacing={3}>
              <Select placeholder="Sort by date" size="xs" />
            </Stack>
          </HStack>
          {
            data.map((item) => (
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
                  <Button colorScheme={"green"} onClick={() => onSelect(item.id)}>See detail</Button>
                </Flex>
            </ScaleFade>
            ))
          }
        </Stack>
      </Container>
    </Flex>
    </>
  )
}
