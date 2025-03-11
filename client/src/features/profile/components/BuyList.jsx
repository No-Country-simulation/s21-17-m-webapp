import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { getBuysByCustomerId } from "../services/customer";
import { Table, Text, Spinner, Box } from "@chakra-ui/react";

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
    <Box p={4} bg={"neutral"}>
      <Table.Root
        size="sm"
        striped
        bg={"neutral"}
        variant="striped"
        colorScheme="primary"
        
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Factura</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha de Compra</Table.ColumnHeader>
            <Table.ColumnHeader>Monto</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {buys.map((buy) => (
            <Table.Row key={buy.idBuy}>
              <Table.Cell>{buy.idBuy}</Table.Cell>
              <Table.Cell>
                {new Date(buy.buyDate).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>${buy.amount.toFixed(2)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
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
