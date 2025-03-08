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
import { EditProduct } from "./EditProduct";
import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from "../../../shared/components/dialog";
import { useProfileProductsContext } from "../store/ProfileProductsContext";
import { toaster } from "../../../shared/components/toaster";
import { deleteProduct } from "../../products/services/products";
import { useCategoryContext } from "../../products/store/CategoryContext";

export const CardList = ({ title, cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const { deleteProduct: deleteProductStore } = useProfileProductsContext();
  const { categories, loading, error } = useCategoryContext();
  const [productToDelete, setProductToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.idProduct);
        await deleteProductStore(productToDelete.idProduct);
        setOpen(false);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          "Ocurrió un error desconocido";
        toaster.create(
          {
            title: "Error eliminando producto",
            description: errorMessage,
            type: "error",
            duration: 5000,
          },
          { closable: true }
        );
      } finally {
        setOpen(false);
      }
    }
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setOpen(true);
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
                      <EditProduct product={card} />
                      <Button
                        variant="solid"
                        _hover={{ bg: "red.600" }}
                        bg="red.500"
                        color="white"
                        size="sm"
                        onClick={() => openDeleteDialog(card)}
                      >
                        Eliminar
                      </Button>
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

      {/* Dialog de confirmación de eliminación */}
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmación de Eliminación</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>¿Estás seguro de que deseas eliminar este producto?</Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </DialogActionTrigger>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

CardList.propTypes = {
  title: PropTypes.string,
  cards: PropTypes.array,
};
