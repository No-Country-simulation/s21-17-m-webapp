import { React, useState } from "react";
import { Box, Flex, Text, Button, IconButton, Image, Input, Group } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

function Cart() {
  // Datos mockeados de artesanías
  const mockCartItems = [
    { id: 1, name: "Vasija de Barro", price: 2500, quantity: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0SHTTyFtb8LwsX7qlzlWDI_CY-nGnv_tOaxHT8GMObGt1XCbC97hREaOiACztxjowB4&usqp=CAU" },
    { id: 2, name: "Pulsera Tejida", price: 1200, quantity: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-PaRy3BDtRCWIkmOK87w00TSy05f354FJJAdkXv9dTvoSyovF6QnvJPFWGIX9vnV0WXs&usqp=CAU" },
    { id: 3, name: "Escultura en Madera", price: 4500, quantity: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJBOsBDImde1_fyKL_-XmDjYrQv70vfHJ_WiTqKICtGMiCxlypfoJZHnL4v5K2qhxPpo&usqp=CAU" }
  ];

  const [cartItems, setCartItems] = useState(mockCartItems);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Eliminar una artesanía por ID
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
  };

  // Calcular subtotal por producto
  const getSubtotal = (item) => item.price * item.quantity;

  // Calcular total del carrito
  const total = cartItems.reduce((acc, item) => acc + getSubtotal(item), 0);

  // Aplicar cupón de descuento
  const applyCoupon = () => {
    if (coupon === "DESCUENTO10") {
      setDiscount(0.10); // 10% de descuento
    } else if (coupon === "DESCUENTO20") {
      setDiscount(0.20); // 20% de descuento
    } else {
      setDiscount(0); // Cupón inválido
    }
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
                <Text>Subtotal: ${getSubtotal(item)}</Text>
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

        {/* Campo para ingresar cupón de descuento */}
        <Flex gap="2">
          <Input 
            placeholder="Ingresar cupón de descuento" 
            value={coupon} 
            onChange={(e) => setCoupon(e.target.value)} 
          />
          <Button colorScheme="blue" onClick={applyCoupon}>Aplicar</Button>
        </Flex>

        {/* Mostrar total con descuento si aplica */}
        <Text fontSize="xl" fontWeight="bold">
          Total: ${total - total * discount}
        </Text>

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
