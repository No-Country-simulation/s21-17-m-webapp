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

export const CardList = ({ title, cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const { deleteProduct } = useProfileProductsContext();
  const [productToDelete, setProductToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);

      setOpen(false);
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
              {currentCards.reverse().map((card, index) => (
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
                        src={card?.image ? URL.createObjectURL(card.image) : ""}
                        alt={card.title}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Box>

                    <VStack align="flex-start" flex={1} spacing={2} ml={2}>
                      <Text fontSize="xl" fontWeight="bold">
                        {card.title}
                      </Text>
                      <Text fontSize="md" color="gray.600">
                        {card.description}
                      </Text>

                      <HStack spacing={2}>
                        <EditProduct product={card} />
                        <Button
                          variant={"solid"}
                          _hover={{ bg: "secondary.700" }}
                          bg={"secondary"}
                          color={"black"}
                          size="sm"
                          onClick={() => openDeleteDialog(card)}
                        >
                          Eliminar
                        </Button>
                      </HStack>
                    </VStack>
                  </Flex>
                </Box>
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
