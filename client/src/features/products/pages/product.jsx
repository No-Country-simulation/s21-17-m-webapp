import React, { useEffect } from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { useProduct } from "../store/ProductContext";
import { useNavigate } from "react-router-dom";

function Product() {
    const { selectedProduct } = useProduct();
    const navigate = useNavigate();

    if (!selectedProduct) {
        return <Text>No se encontraron detalles del producto</Text>;
    }
    const handleReturn = () =>{
        navigate(-1);
    } 

    return (
        <Box p="5" color="primary" textAlign={"center"} alignItems={"center"}>
            <Image src={selectedProduct.imageUrl} alt={selectedProduct.title} />
            <Text fontSize="2xl" fontWeight="bold">{selectedProduct.title}</Text>
            <Text fontSize="lg">{selectedProduct.description}</Text>
            <Text fontSize="xl" color="primary" mt="2">{selectedProduct.price}</Text>
            <Button bg="secondary" mt="4" onClick={handleReturn}>Volver</Button>
        </Box>
    );
}

export default Product;
