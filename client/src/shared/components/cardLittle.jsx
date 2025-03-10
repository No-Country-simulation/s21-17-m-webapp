import React, { useState, useEffect } from "react";
import { Image, Button, Text, Card } from "@chakra-ui/react";
import { useProduct } from "../../features/products/store/ProductContext";
import { useNavigate } from "react-router-dom";
import { TiHeart } from "react-icons/ti";

function CardLittle({ title, description, imageUrl, price, id }) {
    const navigate = useNavigate();
    const { setProduct } = useProduct();

    const getFavoritesFromStorage = () => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    const [favorites, setFavorites] = useState(getFavoritesFromStorage());
    
    const handleAddToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = { id, title, price };

        const existingProductIndex = currentCart.findIndex(item => item.id === id);
        if (existingProductIndex === -1) {
            currentCart.push(product);
        } else {
            currentCart[existingProductIndex].quantity += 1;
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));
        alert('Producto agregado al carrito');
    };

    const handelViewDetails = () => {
        const product = { id, title, description, imageUrl, price };
        setProduct(product);
        navigate(`/product/${id}`);
    };

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
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const isFavorite = favorites.some((fav) => fav.id === id);

    return (
        <Card.Root maxW="sm" position="relative">
            <TiHeart
                onClick={() => handleFavorite({ id, title, description, imageUrl, price })}
                size="2rem"
                color={isFavorite ? "#FF6A13" : "#48BB78"} 
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    backgroundColor: isFavorite ? "#FF6A13" : "#48BB78",
                    borderRadius: '50%',
                    padding: '8px',
                    transition: 'background-color 0.3s',
                }}
            />
            <Image src={imageUrl} alt={title} />
            <Card.Body gap="2">
                <Card.Title>{title}</Card.Title>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2"> $ {price} </Text>
                <Text textStyle="sm" color="gray.500" mt="2"> {description} </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button color="neutral" bg="primary" onClick={handleAddToCart}>Agregar al carrito</Button>
                <Button color="neutral" bg="secondary" onClick={handelViewDetails}>Mas informacion</Button>
            </Card.Footer>
        </Card.Root>
    );
}

export default CardLittle;
