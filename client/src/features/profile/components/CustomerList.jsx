import {
  Box,
  Flex,
  Text,
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
import { useCustomerContext } from "../store/CustomerContext";
import { toaster } from "../../../shared/components/toaster";
import { deleteCustomer } from "../services/customer";

export const CustomerList = ({ title, customers }) => {
  const { deleteCustomer: deleteCustomerStore } = useCustomerContext();
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 3;

  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const startIndex = (currentPage - 1) * customersPerPage;
  const endIndex = startIndex + customersPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async () => {
    if (customerToDelete) {
      try {
        await deleteCustomer(customerToDelete.idProduct);
        await deleteCustomerStore(customerToDelete.idProduct);
        setOpen(false);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          "Ocurrió un error desconocido";
        toaster.create(
          {
            title: "Error eliminando cliente",
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

  const openDeleteDialog = (customer) => {
    setCustomerToDelete(customer);
    setOpen(true);
  };

  return (
    <Box bg={"primary.50"}>
      <Box py={6} bg={"primary"}>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          {title}
        </Heading>

        <Container maxW="2xl" bg={"primary"}>
          {customers.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              No hay perfiles de clientes registrados.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1 }} spacing={4} gap={4}>
              {currentCustomers.reverse().map((customer) => (
                <Box
                  key={customer.idProduct}
                  borderWidth="1px"
                  borderColor={"secondary"}
                  bg="primary.50"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                >
                  <Flex>
                    <VStack align="flex-start" flex={1} spacing={2} ml={2}>
                      <Text fontSize="xl" fontWeight="bold">
                        {customer.name} {customer.lastname}
                      </Text>
                      <Text fontSize="md" color="gray.600">
                        {customer.address}
                      </Text>
                      <HStack spacing={2}>
                        <Button
                          variant={"solid"}
                          _hover={{ bg: "secondary.700" }}
                          bg={"secondary"}
                          color={"black"}
                          size="sm"
                          onClick={() => openDeleteDialog(customer)}
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
          count={customers.length}
          variant="solid"
          pageSize={customersPerPage}
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
            <Text>
              ¿Estás seguro de que deseas eliminar este perfil de cliente?
            </Text>
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

CustomerList.propTypes = {
  title: PropTypes.string,
  customers: PropTypes.array,
};
