import { React, useState } from "react";
import { Box, IconButton, Flex, Button, Link, Icon, Group } from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { FaHandHoldingHand } from "react-icons/fa6";

function NavBar() {
const [isOpen, setIsOpen] = useState(false);

const handleToggle = () => {
    console.log("Botón clickeado");
    setIsOpen( prevState => !prevState);
};

return (
    <Box bg="neutral" color="accent" p="4">
        {/* Tamaño PC */}
        <Flex direction="row" display={{ base: "none", md: "flex" }} justify="space-between">
            <Flex gap="4" justify="flex-start">
            <Icon fontSize="4xl">
                <FaHandHoldingHand />
            </Icon>
            </Flex>
            <Flex direction="row" gap="6" justify="flex-end">
                <Link to="">Artesanos</Link>
                <Link to="">Sobre Nosotros</Link>
                <Link to="">Contáctanos</Link>
                <Button bg="secondary">Ingresar</Button>
                <Button bg="primary">Registrarse</Button>
            </Flex>
        </Flex>
    <IconButton
        aria-label="Abrir menú"
        align="center"
        textAlign="center"
        display={{ base: "block", md: "none" }}
        onClick={handleToggle}
        bg="secondary"
    >
        <IoMenu fontSize="5xl"/>
    </IconButton>

    {/* Menu desplegable para pantallas pequeñas */}
    {isOpen && (
        <Flex direction="column" gap="2" align="center" >
            <Link p="2" href="#">Artesanos</Link>
            <Link p="2" href="#">Sobre Nosotros</Link>
            <Link p="2" href="#">Contáctanos</Link>
            <Group>
                <Button bg="secondary">Ingresar</Button>
                <Button bg="primary">Registrarse</Button>
            </Group>
        </Flex>
    )}
    </Box>
);
}

export default NavBar;
