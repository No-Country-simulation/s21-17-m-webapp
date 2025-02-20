import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Spinner } from "@chakra-ui/react";
import CardLittle from "../../../shared/components/cardLittle";


function CardConteinerPlus(){

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
      const response = await axios.get("https://"); // URL del backend
      const data = response.data;
      setProductData({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        price: data.price,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      setError("Nos encontramos con problemas para encontrar los productos, por vavor vuelva mas tarde");
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
      <Text color="red.500" textAlign="center" mt="4">{error}</Text>
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