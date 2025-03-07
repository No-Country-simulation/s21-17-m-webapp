import { React, useState, useEffect } from "react";
import { Box, Flex, Text, Button, IconButton, Image, Group } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import FormCart from "./formCart";

function ListCart() {
  const getItemsLocalStorage = () => {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cartItems, setCartItems] = useState(getItemsLocalStorage());

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm= () => {
    setShowForm(false);
  }

  const handleConfirmCompra = (formData) => {
    const orderData = {
      cart: cartItems,
      address: formData.address
    };
    sendOrder(orderData);
  };

  const sendOrder = async (orderData) => {
    try {
      const response = await api.post("/order", orderData); // endpoint del back
      console.log(response.data);
      alert("Compra confirmada con éxito!");
    } catch (error) {
      console.error("Error al enviar la orden:", error);
      alert("Hubo un error al confirmar la compra");
    }
    console.log(orderData);
  };

  return (
    <Box
      color="accent"
      p="4"
      alignItems="center"
      width="100%" 
      minHeight="70vh" 
      display="flex"
      justifyContent="center"
    >
      <Box
        bg="neutral.300"
        p="6"
        borderRadius="md"
        boxShadow="lg"
        width={{ base: "90%", sm: "700px" }} 
        maxWidth="1000px"
      >
        <Flex direction="column" gap="4">
          <Flex justify="space-between" align="center" marginInline="30px">
            <Text fontSize="2xl" color="secondary" fontWeight="bold">
              Tu Carrito de Artesanías
            </Text>
            <IconButton
              aria-label="Ver carrito"
              icon={<FaShoppingCart />}
              onClick={() => handleCloseForm()}
              bg="secondary"            
            />
          </Flex>

          {/* Lista de artesanías */}
          <Flex direction="column" gap="4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
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
                    src={item.image}
                    alt={item.name}
                    boxSize="50px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                  <Text flex="1" ml="3" fontWeight="semibold">
                    {item.name}
                  </Text>
                  <Text fontWeight="bold">${item.price}</Text>
                  <IconButton
                    aria-label="Eliminar"
                    icon={<FaTrash />}
                    onClick={() => removeItem(item.id)}
                    colorScheme="red"
                    size="sm"
                  />
                </Flex>
              ))
            ) : (
              <Text color="secondary">No hay artesanías en el carrito.</Text>
            )}
          </Flex>

          {/* Botones de acciones */}
          <Group mt="4" justify="space-between">
            <Button bg="primary" color="accent" onClick={clearCart}>
              Vaciar Carrito
            </Button>
            <Button bg="secondary" onClick={handleShowForm}>
              Dirección de Envío
            </Button>
          </Group>
        </Flex>
        {showForm && <FormCart onConfirmCompra={handleConfirmCompra} />}
      </Box>
    </Box>
  );
}

export default ListCart;
