import React from "react";
import { Image, Button, Text, Card } from "@chakra-ui/react";
import { useProduct } from "../../features/products/store/ProductContext";
import { useNavigate } from "react-router-dom";

function CardLittle({title, description, imageUrl, price, id }) {
    const navigate = useNavigate();
    const { setProduct } = useProduct(); 

    const handleAddToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = {
            id,
            title,
            price
        };

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
            const product = {
              id,
              title,
              description,
              imageUrl,
              price
            };
        
            setProduct(product); 
            navigate(`/product/${id}`); 
          };


    return(
        <Card.Root maxW="sm">
            <Image src={imageUrl} alt={title}/>
            <Card.Body gap="2">
                <Card.Title>{title}</Card.Title>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2"> {price} </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button color="neutral" bg="prymary" onClick={handleAddToCart}>Agregar al carrito</Button>
                <Button color="neutral" bg="secondary" onClick={handelViewDetails}>Mas informacion</Button>
            </Card.Footer>
        </Card.Root>
    );
}
export default CardLittle;