import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Image,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";
import FormCart from "./formCart";
import { toaster } from "../../../shared/components/toaster";
import { useAuth } from "../../../app/providers/AuthProvider";
import api from "../../../app/config/api";
import { useCartContext } from "../store/CartContext";

function ListCart() {
  const { userType } = useAuth();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalPrice,
  } = useCartContext();

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleConfirmCompra = (formData) => {
    if (!formData.customer) return;
    const order = {
      purchasedProducts: cart.map((item) => ({
        idProduct: item.id,
        quantity: item.quantity,
      })),
      idCustomer: formData.customer,
      amount: parseFloat(getTotalPrice()).toFixed(2),
    };

    sendOrder(order);
  };

  const sendOrder = async (orderData) => {
    try {
      await api.post("/buy/create", orderData);
      toaster.create({
        title: "Compra realizada",
        description: "Gracias por tu compra",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      clearCart();
    } catch (error) {
      console.error("Error al enviar la orden:", error);
      toaster.create({
        title: "Error al enviar la orden",
        description: "Por favor, inténtalo de nuevo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="neutral" p={6} borderRadius="md" boxShadow="lg">
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        mb={4}
        p={2}
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        <Text fontSize="2xl" color="secondary" fontWeight="bold">
          Tu Carrito de Artesanías
        </Text>
        <IconButton
          aria-label="Ver carrito"
          onClick={handleCloseForm}
          bg="secondary"
          color="white"
          _hover={{ bg: "secondary.600" }}
        >
          <FaShoppingCart />
        </IconButton>
      </Flex>

      {/* Lista de productos */}
      <VStack spacing={4} align="stretch">
        {cart.length > 0 ? (
          cart.map((item) => (
            <Flex
              key={item.id}
              justify="space-between"
              align="center"
              p={3}
              borderRadius="md"
              bg="neutral.200"
              boxShadow="sm"
              wrap="wrap"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                boxSize="60px"
                borderRadius="md"
                objectFit="cover"
              />
              <Text flex="1" ml="3" fontWeight="semibold">
                {item.title}
              </Text>

              <HStack>
                <IconButton
                  aria-label="Disminuir cantidad"
                  onClick={() => decreaseQuantity(item.id)}
                  bg="secondary"
                  color="white"
                  size="sm"
                  _hover={{ bg: "secondary.600" }}
                >
                  <FaMinus />
                </IconButton>

                <Text fontWeight="bold">{item.quantity}</Text>

                <IconButton
                  aria-label="Aumentar cantidad"
                  onClick={() => increaseQuantity(item.id)}
                  bg="primary"
                  color="white"
                  size="sm"
                  _hover={{ bg: "primary.600" }}
                >
                  <FaPlus />
                </IconButton>
              </HStack>

              <Text fontWeight="bold" color="primary">
                ${item.price}
              </Text>

              <IconButton
                aria-label="Eliminar producto"
                onClick={() => removeFromCart(item.id)}
                bg="red.500"
                color="white"
                size="sm"
                _hover={{ bg: "red.600" }}
              >
                <FaTrash />
              </IconButton>
            </Flex>
          ))
        ) : (
          <Text color="secondary" textAlign="center">
            No hay artesanías en el carrito.
          </Text>
        )}
      </VStack>

      {/* Total */}
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Total: ${getTotalPrice()}
      </Text>

      <Flex mt={4} wrap="wrap" justify="center" gap={4} mb={4}>
        <Button
          bg="primary"
          color="white"
          _hover={{ bg: "primary.600" }}
          onClick={clearCart}
        >
          Vaciar Carrito
        </Button>

        {userType === "common" ? (
          cart.length > 0 ? (
            <Button
              bg="secondary"
              color="white"
              _hover={{ bg: "secondary.600" }}
              onClick={handleShowForm}
            >
              Dirección de Envío
            </Button>
          ) : (
            <Badge bg="secondary" color="white" p={2} borderRadius="md">
              No tienes productos en el carrito
            </Badge>
          )
        ) : (
          <Badge bg="secondary" color="white" p={2} borderRadius="md">
            Inicia sesión como comprador
          </Badge>
        )}
      </Flex>

      {showForm && <FormCart onConfirmCompra={handleConfirmCompra} />}
    </Box>
  );
}

export default ListCart;
