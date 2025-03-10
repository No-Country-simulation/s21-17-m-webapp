import { React, useState, useEffect } from "react";
import { Box, Flex, Text, Button, IconButton, Image, Group } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import FormCart from "./formCart";

function ListCart() {
  const getItemsLocalStorage = () => {
    const storedCart = localStorage.getItem("cartItem"); 
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cartItem, setCartItem] = useState(getItemsLocalStorage());

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem)); 
  }, [cartItem]);

  const removeItem = (id) => {
    setCartItem(cartItem.filter(item => item.id !== id));
  };

  const addCantItem = (id) => {
    setCartItem(cartItem.map(item => 
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    ));
  };

  const removeCantItem = (id) => {
    setCartItem(cartItem.map(item => 
      item.id === id 
        ? { 
            ...item, 
            quantity: item.quantity > 1 ? item.quantity - 1 : undefined 
          }
        : item
    ).filter(item => item.quantity !== undefined)); 
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleConfirmCompra = (formData) => {
    const orderData = {
      cart: cartItem,
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
    <Box bg="neutral.300" alignItems={"center"} textAlign={"center"}>
        <Flex direction="column" gap="4">
          <Flex justify="space-around" align="center" marginInline="30px">
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
          <Flex  marginInline={("10px","50px","100px")}direction="column" gap="4">
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
                    src={item.image}
                    alt={item.name}
                    boxSize="50px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                  <Text flex="1" ml="3" fontWeight="semibold">
                    {item.name}
                  </Text>
                  <IconButton
                    aria-label="+"
                    icon={<FaShoppingCart />}
                    onClick={() => addCantItem(item.id)} 
                    bg={"primary"}
                    size="sm"
                    margin={"2px"}
                  />
                  <Text fontWeight="bold">${item.price}</Text>
                  <Text>Cantidad: {item.quantity || 1}</Text> 
                  <IconButton
                    aria-label="-"
                    icon={<FaTrash />}
                    onClick={() => removeCantItem(item.id)} 
                    bg={"secondary"}
                    size="sm"
                    margin={"2px"}
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<FaTrash />}
                    onClick={() => removeItem(item.id)} 
                    bg={"red.500"}
                    size="sm"
                    margin={"2px"}
                  />
                </Flex>
              ))
            ) : (
              <Text color="secondary">No hay artesanías en el carrito.</Text>
            )}
          </Flex>

          <Group mt="4" justify="space-around" marginInline={("10px","50px","100px")}>
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

  );
}

export default ListCart;
