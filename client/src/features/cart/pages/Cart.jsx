import { React, useState } from "react";
import { Box, Flex, Text, Button, IconButton, Image, Group } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

function Cart() {
  // Datos mockeados de artesanías
  const mockCartItems = [
    { id: 1, name: "Vasija de Barro", price: 2500, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Pulsera Tejida", price: 1200, image: "https://via.placeholder.com/80" },
    { id: 3, name: "Escultura en Madera", price: 4500, image: "https://via.placeholder.com/80" }
  ];

  const [cartItems, setCartItems] = useState(mockCartItems);

  // Eliminar una artesanía por ID
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Box bg="neutral" color="accent" p="4">
      <Flex direction="column" gap="4">
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl">Tu Carrito de Artesanías</Text>
          <IconButton
            aria-label="Ver carrito"
            icon={<FaShoppingCart />}
            onClick={() => console.log("Abrir carrito")}
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
              >
                <Image src={item.image} alt={item.name} boxSize="50px" borderRadius="md" />
                <Text flex="1" ml="3">{item.name}</Text>
                <Text>${item.price}</Text>
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
            <Text>No hay artesanías en el carrito.</Text>
          )}
        </Flex>

        {/* Botones de acciones */}
        <Group mt="4" justify="space-between">
          <Button colorScheme="red" onClick={clearCart}>Vaciar Carrito</Button>
          <Button bg="secondary" onClick={() => console.log("Ir al checkout")}>Finalizar compra</Button>
        </Group>
      </Flex>
    </Box>
  );
}

export default Cart;
