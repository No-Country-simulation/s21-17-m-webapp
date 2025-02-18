import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import CardLittle from "../../../shared/components/cardLittle";


function CardConteinerPlus(){

    const [productData, setProductData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        price: "",
      });
    
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
          } catch (error) {
            console.error("Error al cargar los datos:", error);
          }
        };
    
        fetchData();
      }, []);
    
      return (
        <Box p="4" gap="10">
            <Text fontSize="2xl"> Productos destacados</Text>
          <CardLittle
            title={productData.title}
            description={productData.description}
            imageUrl={productData.imageUrl}
            price={productData.price}
          />
        </Box>
      );
    }
export default CardConteinerPlus;