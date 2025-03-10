import React, { useState, useEffect } from "react";
import {
  Image,
  Button,
  Text,
  Card,
  IconButton,
} from "@chakra-ui/react";
import { useProduct } from "../../features/products/store/ProductContext";
import { useNavigate } from "react-router-dom";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { toaster } from "./toaster";

function CardLittle({ title, description, imageUrl, price, id }) {
  const navigate = useNavigate();
  const { setProduct } = useProduct();

  const getFavoritesFromStorage = () => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const [favorites, setFavorites] = useState(getFavoritesFromStorage());

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cartItem")) || [];
    const product = { id, title, price };

    const existingProductIndex = currentCart.findIndex(
      (item) => item.id === id
    );
    if (existingProductIndex === -1) {
      currentCart.push(product);
    } else {
      currentCart[existingProductIndex].quantity += 1;
    }

    localStorage.setItem("cartItem", JSON.stringify(currentCart));
    toaster.create(
      {
        title: "Producto agregado al carrito",
        description: "El producto se ha agregado al carrito.",
        type: "success",
        duration: 5000,
      },
      { closable: true }
    );
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
      updatedFavorites = updatedFavorites.filter(
        (fav) => fav.id !== product.id
      );
      toaster.create(
        {
          title: "Producto eliminado de favoritos",
          description: "El producto se ha eliminado de favoritos.",
          type: "error",
          duration: 2000,
        },
        { closable: true }
      );
    } else {
      updatedFavorites.push(product);
      toaster.create(
        {
          title: "Producto agregado a favoritos",
          description: "El producto se ha agregado a favoritos.",
          type: "success",
          duration: 2000,
        },
        { closable: true }
      );
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = favorites.some((fav) => fav.id === id);

  return (
    <Card.Root maxW="sm" position="relative">
      <IconButton
        aria-label="Añadir a favoritos"
        variant="ghost"
        size="lg"
        borderRadius="full"
        position="absolute"
        top="10px"
        right="10px"
        zIndex="1"
        onClick={() =>
          handleFavorite({ id, title, description, imageUrl, price })
        }
        _hover={{
          bg: isFavorite ? "orange.100" : "green.100",
        }}
      >
        {isFavorite ? (
          <TiHeartFullOutline size="24" color="#FF6A13" />
        ) : (
          <TiHeartOutline size="24" color="#48BB78" />
        )}
      </IconButton>
      <Image src={imageUrl} alt={title} />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {" "}
          $ {price}{" "}
        </Text>
        <Text textStyle="sm" color="gray.500" mt="2">
          {" "}
          {description}{" "}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button color="neutral" bg="primary" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
        <Button color="neutral" bg="secondary" onClick={handelViewDetails}>
          Mas informacion
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default CardLittle;
