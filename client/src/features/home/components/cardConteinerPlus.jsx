import React from "react";
import { useState, useEffect } from "react";
import api from "../../../app/config/api";
import { Box, Text, Spinner } from "@chakra-ui/react";
import CardLittle from "../../../shared/components/cardLittle";

function CardConteinerPlus() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/products/getAll");
        const data = response.data;
        setProductData({
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          price: data.price,
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError(
          "Nos encontramos con problemas para encontrar los productos, por favor vuelva mas tarde"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p="4" gap="10">
      <Text fontSize="2xl"> Productos destacados</Text>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt="20">
          <Spinner size="lg" />
        </Box>
      ) : error ? (
        <Text color="secondary" textAlign="center" mt="4">
          {error}
        </Text>
      ) : (
        <CardLittle
          title={productData.title}
          description={productData.description}
          imageUrl={productData.imageUrl}
          price={productData.price}
        />
      )}
    </Box>
  );
}
export default CardConteinerPlus;
