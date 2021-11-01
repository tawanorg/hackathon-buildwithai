import React, { useEffect } from 'react';
import {
  Spinner,
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
 
import AdminMap from '../components/AdminMap';
import Loader from '../components/Loader';
import LoginForm from '../components/LoginForm';
import PieChart from '../components/PieChart';
 
export default function Home() {
  const [view, setView] = React.useState('login');
  const [data, setData] = React.useState([])
  const [productApprovalLoading, setProductApprovalStatus] = React.useState(false)
  const [productRejectLoading, setProductRejectStatus] = React.useState(false)
  const [selectedProduct, setProduct] = React.useState(null);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
  const toast = useToast()

  const getData = async () => {
    const response = await fetch('/api/expired')
    const result = await response.json()
    setData(result)
  }

  useEffect(() => {
    setView('login')
    getData()
  }, [])

  const onSelect = (id) => {
    const product = data.find(x => x.id === id)
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
      setData((prev) => {
        return prev.filter(x => x.id !== product.id)
      })
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
 
  const [mapView, setIsMapView] = React.useState(false)

  // if (view === 'loading') {
  //   return <Loader />
  // }

  // if (view === 'login') {
  //   return <LoginForm onSubmit={onSubmit} />
  // }
 
  return (
    <>
    {/* <Box 
      pos="fixed" bottom={5} left={0} right={0} width="full"
      display="flex"
      justifyContent="center"
      zIndex="99999999"
    >
      <Button variant="solid" size="lg" colorScheme="green" onClick={() => setIsMapView(!mapView)}>{mapView ? 'List view' : 'Map view'}</Button>
    </Box> */}
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
                  <Text fontSize="xs">{selectedProduct.time}</Text>
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
    <Flex flexDir="column" width="full" h="1000px">
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
          {/* <HStack justifyContent={"space-between"} alignItems={"center"} mb="2">
            <Heading fontSize="md">Demanded items</Heading>
          </HStack>
          <PieChart /> */}
        {!mapView && (
         <>
          <HStack justifyContent={"space-between"} alignItems={"center"} mb="2">
            <Heading fontSize="md">Available items ({data.length})</Heading>
            <Stack spacing={3}>
              <Select placeholder="Sort by date" size="xs" />
            </Stack>
          </HStack>
          {data.length === 0 && (
            <Flex width="full" height="full" p="20" justifyContent="center" alignItems="center">
              <Spinner size="lg" />
            </Flex>
          )}
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
                      <Text fontSize="sm" opacity={"0.7"}>From <b>{item.from}</b> on {item.time}</Text>
                    </Flex>
                    </Flex>
                  <Button colorScheme={"green"} onClick={() => onSelect(item.id)}>See detail</Button>
                </Flex>
            </ScaleFade>
            ))
          }
          </>
        )}
        </Stack>
        {/* {mapView && <AdminMap />} */}
      </Container>
    </Flex>
    </>
  )
}
