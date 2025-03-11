import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { Image, Button, Text, Card, IconButton } from "@chakra-ui/react";
import { useProduct } from "../../features/products/store/ProductContext";
import { useNavigate } from "react-router-dom";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { toaster } from "./toaster";
import { useFavoritesContext } from "../../features/products/store/FavoriteContext";
import { useAuth } from "../../app/providers/AuthProvider";
import { useCartContext } from "../../features/cart/store/CartContext";

function CardLittle({ title, description, stock, imageUrl, price, id }) {
  const { user, userType } = useAuth();
  const navigate = useNavigate();
  const { setProduct } = useProduct();
  const { addFavorite, deleteFavorite, isFavorite } = useFavoritesContext();
  const { addToCart } = useCartContext();

  const [isStockAvailable, setIsStockAvailable] = useState(stock > 0);

  useEffect(() => {
    setIsStockAvailable(stock > 0);
  }, [stock]);

  const handleAddToCart = () => {
    addToCart({ id, title, description, imageUrl, price, stock });
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

  const handleFavorite = () => {
    if (isFavorite(id)) {
      deleteFavorite(id);
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
      addFavorite({ id, title, description, imageUrl, price, stock });
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
  };

  return (
    <Card.Root
      maxW="sm"
      position="relative"
      opacity={isStockAvailable ? 1 : 0.5}
      _disabled={!isStockAvailable}
    >
      {user && userType === "common" && (
        <IconButton
          aria-label="Añadir a favoritos"
          variant="ghost"
          size="lg"
          borderRadius="full"
          position="absolute"
          top="10px"
          right="10px"
          zIndex="1"
          onClick={handleFavorite}
          _hover={{
            bg: isFavorite(id) ? "orange.100" : "green.100",
          }}
          disabled={!isStockAvailable}
        >
          {isFavorite(id) ? (
            <TiHeartFullOutline size="24" color="#FF6A13" />
          ) : (
            <TiHeartOutline size="24" color="#48BB78" />
          )}
        </IconButton>
      )}
      <Image src={imageUrl} alt={title} objectFit="cover" w="full" h="200px" />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $ {price}
        </Text>
        <Text textStyle="sm" color="gray.500" mt="2">
          {description}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        {user && userType === "common" && (
          <Button
            color="neutral"
            bg="primary"
            onClick={handleAddToCart}
            disabled={!isStockAvailable}
          >
            Agregar al carrito
          </Button>
        )}
        <Button color="neutral" bg="secondary" onClick={handelViewDetails}>
          Más información
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default CardLittle;

CardLittle.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  stock: PropTypes.number,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
};
