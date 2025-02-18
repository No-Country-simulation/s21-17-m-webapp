import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./features/auth/components/navBar";
import Hero from "./features/auth/components/hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box textAlign="center" py="0">
      <NavBar />
      <Hero />
      <Flex justify="center" align="center" gap={4}>
        <Link href="https://vite.dev" target="_blank">
          <Box width="100px" height="100px" overflow="hidden">
            <Image
              src={viteLogo}
              alt="Vite logo"
              className="logo"
              objectFit="contain"
              width="100%"
              height="100%"
            />
          </Box>
        </Link>
        <Link href="https://react.dev" target="_blank">
          <Box width="100px" height="100px" overflow="hidden">
            <Image
              src={reactLogo}
              alt="React logo"
              className="logo react"
              objectFit="contain"
              width="100%"
              height="100%"
            />
          </Box>
        </Link>
      </Flex>
      

      <Heading as="h1" size="2xl" mt={6} mb={4}>
        Vite + React
      </Heading>

      <Box
        p={6}
        borderRadius="lg"
        boxShadow="md"
        bg="gray.50"
        display="inline-block"
        mt={6}
      >
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
        <Text mt={4} fontSize="lg">
          Edit <code>src/App.jsx</code> and save to test HMR
        </Text>
      </Box>

      <Text mt={8} color="gray.600">
        Click on the Vite and React logos to learn more
      </Text>
    </Box>
  );
}

export default App;
