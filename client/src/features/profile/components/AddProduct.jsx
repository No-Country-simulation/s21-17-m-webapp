import { Button, Flex } from "@chakra-ui/react";

export const AddProduct = () => {
  return (
    <Flex justify="center" align="center" py={6} mb={2} bg={"primary.50"}>
      <Button
        bg={"secondary"}
        color={"black"}
        onClick={() => console.log("Agregar producto")}
      >
        Agrergar Producto
      </Button>
    </Flex>
  );
};
