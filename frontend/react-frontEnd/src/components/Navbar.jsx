import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react'
import { PlusSquareIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'



const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"1140px"} p={4} >
            <Flex
                h={15}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{
                    base: 'column',
                    sm: 'row'
                }}>
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500, purple.600)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>
                <HStack spacing={2} alignItems={'center'}>
                    <Link to={'/create'}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar