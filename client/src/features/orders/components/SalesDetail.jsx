import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { getSalesByProduct } from "../services/sales";
import { Table, Text, Spinner, Box } from "@chakra-ui/react";

export const SalesDetail = ({ productSelected }) => {
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getSalesDetails() {
      try {
        if (!productSelected) return;
        setLoading(true);
        const salesData = await getSalesByProduct(productSelected.idProduct);
        setSales(salesData);
      } catch (error) {
        console.error(error);
        setError(error);
        setSales(null);
      } finally {
        setLoading(false);
      }
    }
    getSalesDetails();
  }, [productSelected]);

  if (!productSelected) {
    return null;
  }

  if (loading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner size="lg" />
        <Text mt={2}>Cargando ventas...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Text color="red.500">Error al cargar las ventas</Text>
      </Box>
    );
  }

  if (!sales || sales.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Text>No hay ventas para este producto</Text>
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
            <Table.ColumnHeader>ID Venta</Table.ColumnHeader>
            <Table.ColumnHeader>Precio</Table.ColumnHeader>
            <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sales.map((sale) => (
            <Table.Row key={sale.idBuy}>
              <Table.Cell>{sale.idBuy}</Table.Cell>
              <Table.Cell>
                {sale.price ? `$${sale.price.toFixed(2)}` : "N/A"}
              </Table.Cell>
              <Table.Cell>{sale.quantity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={3}>
              Vendidos: {" "}
              {sales.reduce((total, sale) => total + sale.quantity, 0)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell colSpan={3}>
              Total de ventas: $
              {sales
                .reduce((total, sale) => total + sale.price * sale.quantity, 0)
                .toFixed(2)}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Box>
  );
};

SalesDetail.propTypes = {
  productSelected: PropTypes.shape({
    idProduct: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
