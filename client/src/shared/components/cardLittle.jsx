import React from "react";
import { Image, Button, Text, Card } from "@chakra-ui/react";

function CardLittle({title, description, imageUrl, price, id }) {
    return(
        <Card.Root maxW="sm" overflow="hidden">
            <Image src={imageUrl} alt={title}/>
            <Card.Body gap="2">
                <Card.Title>{title}</Card.Title>
                <Card.Description>{description}</Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2"> {price} </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button color="neutral" bg="prymary">Agregar al carrito</Button>
                <Button color="neutral" bg="secondary">Mas informacion</Button>
            </Card.Footer>
        </Card.Root>
    );
}
export default CardLittle;