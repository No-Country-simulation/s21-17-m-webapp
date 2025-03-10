import { React, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Image,
  Group,
  Badge,
} from "@chakra-ui/react";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";
import FormCart from "./formCart";
import api from "../../../app/config/api";
import { toaster } from "../../../shared/components/toaster";
import { useAuth } from "../../../app/providers/AuthProvider";

function ListCart() {
  const { user, userType } = useAuth();
  const getItemsLocalStorage = () => {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cartItem, setCartItem] = useState(getItemsLocalStorage());

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const removeItem = (id) => {
    setCartItem(cartItem.filter((item) => item.id !== id));
  };

  const addCantItem = (id) => {
    setCartItem(
      cartItem.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const removeCantItem = (id) => {
    setCartItem(
      cartItem
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : undefined,
              }
            : item
        )
        .filter((item) => item.quantity !== undefined)
    );
  };

  const clearCart = () => {
    setCartItem([]);
  };

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleConfirmCompra = (formData) => {
    if (!formData.customer) return;
    const order = {
      purchasedProducts: cartItem.map((item) => ({
        idProduct: item.id,
        quantity: item.quantity || 1,
      })),
      idCustomer: formData.customer,
      amount: parseFloat(
        cartItem.reduce(
          (acc, item) => acc + item.price * (item.quantity || 1),
          0
        )
      ).toFixed(2),
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
    <Box bg="neutral.300" alignItems={"center"} textAlign={"center"}>
      <Flex direction="column" gap="4">
        <Flex justify="space-around" align="center" marginInline="30px">
          <Text fontSize="2xl" color="secondary" fontWeight="bold">
            Tu Carrito de Artesanías
          </Text>
          <IconButton
            aria-label="Ver carrito"
            onClick={() => handleCloseForm()}
            bg="secondary"
          >
            <FaShoppingCart />
          </IconButton>
        </Flex>

        {/* Lista de artesanías */}
        <Flex
          marginInline={("10px", "50px", "100px")}
          direction="column"
          gap="4"
        >
          {cartItem.length > 0 ? (
            cartItem.map((item) => (
              <Flex
                key={item.id}
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor="gray.300"
                p="2"
                mb="3"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  boxSize="50px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <Text flex="1" ml="3" fontWeight="semibold">
                  {item.title}
                </Text>
                <IconButton
                  aria-label="+"
                  onClick={() => addCantItem(item.id)}
                  bg={"primary"}
                  size="sm"
                  margin={"2px"}
                >
                  <FaPlus />
                </IconButton>
                <Text fontWeight="bold">${item.price}</Text>
                <Text>Cantidad: {item.quantity || 1}</Text>
                <IconButton
                  aria-label="-"
                  onClick={() => removeCantItem(item.id)}
                  bg={"secondary"}
                  size="sm"
                  margin={"2px"}
                >
                  <FaMinus />
                </IconButton>
                <IconButton
                  aria-label="Remove"
                  onClick={() => removeItem(item.id)}
                  bg={"red.500"}
                  size="sm"
                  margin={"2px"}
                >
                  <FaTrash />
                </IconButton>
              </Flex>
            ))
          ) : (
            <Text color="secondary">No hay artesanías en el carrito.</Text>
          )}
        </Flex>

        <Group
          mt="4"
          justify="space-around"
          marginInline={("10px", "50px", "100px")}
        >
          <Button bg="primary" color="accent" onClick={clearCart}>
            Vaciar Carrito
          </Button>
          {userType === "common" ? (
            <Button bg="secondary" onClick={handleShowForm}>
              Dirección de Envío
            </Button>
          ) : (

            <Badge
              bg="secondary"
              color="accent"               
            >
              Inicia sesión como comprador              
            </Badge>
          )}
        </Group>
      </Flex>
      {showForm && <FormCart onConfirmCompra={handleConfirmCompra} />}
    </Box>
  );
}

export default ListCart;
