import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Heading,
  Container,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../shared/components/pagination";
import PropTypes from "prop-types";
import { useState } from "react";

export const CardList = ({ title, cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box bg={"primary.50"}>
      <Box py={6} bg={"primary"}>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          {title}
        </Heading>

        <Container maxW="2xl" bg={"primary"}>
          <SimpleGrid columns={{ base: 1 }} spacing={4} gap={4}>
            {currentCards.map((card, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderColor={"secondary"}
                bg="primary.50"
                borderRadius="lg"
                overflow="hidden"
                p={4}
              >
                <Flex>
                  <Box flexShrink={0} ml={4}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Box>

                  <VStack align="flex-start" flex={1} spacing={2}>
                    <Text fontSize="xl" fontWeight="bold">
                      {card.title}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {card.description}
                    </Text>
                    {/* Botones */}
                    <HStack spacing={2}>
                      <Button
                        variant={"ghost"}
                        color={"secondary"}
                        size="sm"
                        onClick={() => console.log("Editar")}
                      >
                        Editar
                      </Button>
                      <Button
                        variant={"solid"}
                        _hover={{ bg: "secondary.700" }}
                        bg={"secondary"}
                        colorPalette={"bg"}
                        color={"black"}
                        size="sm"
                        onClick={() => console.log("Eliminar")}
                      >
                        Eliminar
                      </Button>
                    </HStack>
                  </VStack>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/* Paginación */}
      <Flex justify="center" mt={6}>
        <PaginationRoot
          count={cards.length}
          variant="solid"
          pageSize={cardsPerPage}
          defaultPage={currentPage}
          onPageChange={({ page }) => handlePageChange(page)} // Asegúrate de pasar el número de página
        >
          <HStack spacing={2}>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Flex>
    </Box>
  );
};

CardList.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
};
