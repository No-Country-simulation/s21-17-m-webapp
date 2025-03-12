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
  Card,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../shared/components/pagination";
import PropTypes from "prop-types";
import { useState } from "react";
import { useCategoryContext } from "../../products/store/CategoryContext";

export const SalesList = ({ title, cards, setProductSelected }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const { categories, loading, error } = useCategoryContext();

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
          {cards.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              No hay productos publicados.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1 }} spacing={4} gap={4}>
              {currentCards.reverse().map((card) => (
                <Card.Root
                  key={card.idProduct}
                  borderWidth="1px"
                  borderColor="secondary"
                  bg="neutral"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  _hover={{
                    boxShadow: "lg",
                    transform: "translateY(-4px)",
                    transition: "all 0.2s",
                  }}
                >
                  <Card.Header>
                    <Flex align="center">
                      <Box flexShrink={0}>
                        <Image
                          src={card?.urlImage}
                          alt={card.name}
                          boxSize="100px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </Box>
                      <VStack align="flex-start" spacing={1} ml={4}>
                        <Text fontSize="xl" fontWeight="bold">
                          {card.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {card.description}
                        </Text>
                      </VStack>
                    </Flex>
                  </Card.Header>

                  <Card.Body>
                    <VStack align="flex-start" spacing={2}>
                      <Text fontSize="md" color="gray.600">
                        Precio:{" "}
                        <Text as="span" fontWeight="bold">
                          ${card.price}
                        </Text>
                      </Text>
                      <Text fontSize="md" color="gray.600">
                        Stock:{" "}
                        <Text as="span" fontWeight="bold">
                          {card.stock} unidades
                        </Text>
                      </Text>
                      <Text fontSize="md" color="gray.600">
                        Categoría:{" "}
                        <Text as="span" fontWeight="bold">
                          {loading
                            ? "Cargando categoría..."
                            : error
                              ? "Error al cargar categoría"
                              : categories.find(
                                  (category) =>
                                    category.idCategory === card.idCategory
                                )?.name || "Categoría no encontrada"}
                        </Text>
                      </Text>
                    </VStack>
                  </Card.Body>

                  <Card.Footer>
                    <HStack spacing={2}>
                      <Button variant="outline" onClick={()=> setProductSelected(card)} >Cantidad de ventas</Button>
                    </HStack>
                  </Card.Footer>
                </Card.Root>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* Paginación */}
      <Flex justify="center" mt={6}>
        <PaginationRoot
          count={cards.length}
          variant="solid"
          pageSize={cardsPerPage}
          defaultPage={currentPage}
          onPageChange={({ page }) => handlePageChange(page)}
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

SalesList.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
  setProductSelected: PropTypes.func
};
