import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import cdavinci from "../../../assets/cdavinci.jpg";

const Info = () => {
    return (
        <Box 
        color="accent" 
        textAlign="center" 
        display="flex" 
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginInline={"100px"}

        >
            <Text fontSize={"4xl"} color={"secondary"}>Bienvenidos</Text>
            <Text>
                Este es un espacio creado para conectar a talentosos artesanos, artistas y coleccionistas 
                con compradores que valoran el trabajo hecho a mano y las piezas únicas.
            </Text>
            <Image src={cdavinci} alt="logo cDavinci" marginInline={"100px"} maxWidth={"400px"}/>
            <Text marginBottom={"30px"}>
                Nuestra misión es apoyar a las comunidades artesanales, brindándoles una plataforma
                donde puedan mostrar y vender sus creaciones sin intermediarios, permitiendo así que
                su arte llegue a más personas y contribuya al crecimiento de sus emprendimientos.
            </Text>
            <Text marginBottom={"30px"}>
                Creemos en el comercio justo, la sostenibilidad y la preservación de tradiciones 
                culturales a través del arte. Cada compra en nuestra plataforma es un paso más para 
                fortalecer el trabajo artesanal y fomentar el aprecio por el esfuerzo y la 
                creatividad de los artistas locales.
            </Text>
            <Text marginBottom={"30px"}>
                Únete a nuestra comunidad y sé parte de este movimiento que impulsa el arte, 
                la historia y la dedicación detrás de cada pieza.
            </Text>
        </Box>
    );
};
export default Info;
