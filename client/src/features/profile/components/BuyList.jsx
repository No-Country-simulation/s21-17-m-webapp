import { useEffect, useState } from "react";
import { Box, Table, Text, Spinner, Button } from "@chakra-ui/react";
import { getBuysByCustomerId } from "../services/customer";

export const BuyList = ({ customerSelected }) => {
  const [buys, setBuys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedBuy, setExpandedBuy] = useState(null); 

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
        setBuys([]); 
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

  const handleToggleDetails = (idBuy) => {
    setExpandedBuy(expandedBuy === idBuy ? null : idBuy);
  };

  return (
    <Box p={4} bg={"neutral"}>
      <Table variant="striped" colorScheme="primary">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Factura</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha de Compra</Table.ColumnHeader>
            <Table.ColumnHeader>Monto</Table.ColumnHeader>
            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {buys.map((buy) => (
            <React.Fragment key={buy.idBuy}>
              <Table.Row>
                <Table.Cell>{buy.idBuy}</Table.Cell>
                <Table.Cell>{new Date(buy.buyDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>${buy.amount.toFixed(2)}</Table.Cell>
                <Table.Cell>

                  <Button onClick={() => handleToggleDetails(buy.idBuy)}
                    size={isMobile ? "sm" : "md"}
                    bg="primary"
                    color="accent"
                    _hover={{ bg: "primary.600" }}
                  >
                    {expandedBuy === buy.idBuy ? 'Ocultar Detalles' : 'Ver Detalles'}
                  </Button>
                </Table.Cell>
              </Table.Row>

              {expandedBuy === buy.idBuy && (
                <Table.Row>
                  <Table.Cell colSpan={4}>
                    <Box p={4} bg="neutral" borderRadius="md">
                      <Text fontWeight="bold" mb={2}>Detalle de la compra:</Text>
                      {buy.purchasedProducts.length > 0 ? (
                        <Table variant="striped" colorScheme="primary" size={isMobile ? "sm" : "md"}>
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeader>Producto</Table.ColumnHeader>
                              <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {buy.purchasedProducts.map((product) => (
                              <Table.Row key={product.idBuyProduct}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                      ) : (
                        <Text>No se encontraron productos en esta compra.</Text>
                      )}
                    </Box>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={4}>Total de compras: {buys.length}</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Box>
  );
};
