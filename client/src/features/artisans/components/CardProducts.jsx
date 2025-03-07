import { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import CardLittle from "../../../shared/components/cardLittle";
import { getProductsByArtisan } from "../../products/services/products";

function CardProducts({ artisanId }) {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProductsByArtisan(artisanId);
        setProductData(productsData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError(
          "Nos encontramos con problemas para encontrar los productos, por favor vuelva más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [artisanId]);

  return (
    <Box p="4" gap="10">
      <Text fontSize="2xl">Productos del artesano</Text>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt="20">
          <Spinner size="lg" />
        </Box>
      ) : error ? (
        <Text color="secondary" textAlign="center" mt="4">
          {error}
        </Text>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap="10"
        >
          {productData.reverse().map((product) => (
            <CardLittle
              key={product.idProduct}
              title={product.name}
              description={product.description}
              imageUrl={product.urlImage}
              price={product.price}
              id={product.idProduct}
            />
          ))}
          {productData.length === 0 && (
            <Text color="secondary" textAlign="center" mt="4">
              No se encontraron productos.
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}

CardProducts.propTypes = {
  artisanId: String,
};

export default CardProducts;
