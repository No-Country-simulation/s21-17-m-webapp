import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { getBuysByCustomerId } from "../services/customer";
import { Table, Text, Spinner, Box, useBreakpoint } from "@chakra-ui/react";

export const BuyList = ({ customerSelected }) => {
  const [buys, setBuys] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBuys() {
      try {
        if (!customerSelected) return;
        setLoading(true);
        const buysData = await getBuysByCustomerId(customerSelected);        
        setBuys(buysData);
      } catch (error) {
        console.error(error);
        setError(error);
        setBuys(null);
      } finally {
        setLoading(false);
      }
    }
    getBuys();
  }, [customerSelected]);

  if (!customerSelected) {
    return null;
  }

  if (loading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner size="lg" />
        <Text mt={2}>Cargando compras...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Text color="red.500">Error al cargar las compras</Text>
      </Box>
    );
  }

  if (!buys || buys.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Text>No hay compras para esta cuenta</Text>
      </Box>
    );
  }

  return (
    <Box display={{ base: "block", md: "table" }} mt={2}>
      <Table.Root
        size="sm"
        striped
        bg={"neutral"}
        variant="striped"
        border={"1px solid #04041a"} 
      >
        <Table.Header 
          bg="primary" 
          borderBottom={"1px solid #04041a"} 
          height={"35px"}
          fontSize={"xl"}
        >
          <Table.Row>
            <Table.ColumnHeader>Factura</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha de Compra</Table.ColumnHeader>
            <Table.ColumnHeader>Monto</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {buys.map((buy) => (
            <Table.Row
              key={buy.idBuy}
              sx={{
                backgroundColor: index % 2 === 0 ? "#ffe0b2" : "#f2f2b2",
                borderBottom: "1px solid  #04041a", 
              }}
            >
              <Table.Cell>{buy.idBuy}</Table.Cell>
              <Table.Cell>
                {new Date(buy.buyDate).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>${buy.amount.toFixed(2)}</Table.Cell>
              <Table.Cell>
                <Table.Root>
                <Table.Header bg="primary" borderBottom={"1px solid #04041a"}>
                    <Table.Row>
                      <Table.ColumnHeader>Producto</Table.ColumnHeader>
                      <Table.ColumnHeader>Precio</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {buy.purchasedProducts.map((product) => (
                      <Table.Row 
                        key={product.idProduct}
                        borderBottom={"1px solid #04041a"}
                      >
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>${product.price.toFixed(2)}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer 
          bg="primary"
          textAlign={"center"} 
          height={"40px"} 
          borderTop={"1px solid #04041a"}
          fontSize={"xl"}
        >
          <Table.Row>
            <Table.Cell colSpan={3}>Total de compras: {buys.length}</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Box>
  );
};

BuyList.propTypes = {
  customerSelected: PropTypes.number,
};
