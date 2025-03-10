import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import CardLittle from "../../../shared/components/cardLittle";

function Favorites() {
    const getItemsLocalStorage = () => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    const [favorites, setFavorites] = useState(getItemsLocalStorage());
    
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const handleFavorite = (product) => {
        const isProductInFavorites = favorites.some((fav) => fav.id === product.id);

        let updatedFavorites = [...favorites];

        if (isProductInFavorites) {
            updatedFavorites = updatedFavorites.filter((fav) => fav.id !== product.id);
            alert(`Producto ${product.title} eliminado de favoritos.`);
        } else {
            updatedFavorites.push(product);
            alert(`Producto ${product.title} agregado a favoritos.`);
        }
        setFavorites(updatedFavorites);
    };

    return (
        <Box p="4" gap="10" marginLeft={("10", "15", "30")} alignItems={"center"} textAlign={"center"}>
            <Text fontSize="2xl" fontWeight="bold">Tus favoritos</Text>
            {favorites.length === 0 ? (
                <Text color="secondary" textAlign="center" mt="4">
                    No se encontraron productos.
                </Text>
            ) : (
                <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap="10">
                    {favorites.reverse().map((product) => (
                        <CardLittle
                            key={product.id}
                            title={product.title}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            price={product.price}
                            id={product.id}
                            onFavorite={() => handleFavorite(product)} 
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default Favorites;
