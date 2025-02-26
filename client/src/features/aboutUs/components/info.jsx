import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import cdavinci from "../../../assets/cdavinci.jpg";

function Info() {
    return (
        <Box color="accent"  textAlign="center" display="flex" flexDir={"column"} justifyContent={"center"} alignItems={"center"} marginInline={"100px"} >
            <Box maxWidth="800px">
                <Text fontSize={"4xl"} color={"secondary"} margin={"30px"}>Bienvenidos</Text>
                <Text>
                    Este es un espacio creado para conectar a talentosos artesanos, artistas y coleccionistas 
                    con compradores que valoran el trabajo hecho a mano y las piezas únicas.
                </Text>
            </Box>
                <Image src={cdavinci} alt="logo cDavinci" maxWidth={"400px"}/>
            <Box maxWidth="800px">
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
            <Box marginTop="40px" textAlign="center" maxWidth="800px">
                <Text fontSize="2xl" color="secondary" marginBottom="20px">Como usuario, podrás:</Text>
                <ul>
                    <li><Text>Ver información detallada sobre los artesanos y sus productos.</Text></li>
                    <li><Text>Comprar productos hechos a mano y únicos.</Text></li>
                    <li><Text>Guardar tus productos favoritos para acceder a ellos fácilmente más tarde.</Text></li>
                    <li><Text>Calificar y dejar comentarios sobre los artesanos y sus creaciones.</Text></li>
                    <li><Text>Contactar con artesanos de diversas regiones, descubriendo su arte único desde cualquier parte del mundo.</Text></li>
                    <li><Text>Encontrar antigüedades y piezas históricas que cuentan una historia única.</Text></li>
                </ul>
            </Box>
            <Box marginTop="40px" marginBottom="30px" textAlign="center" maxWidth="800px">
                <Text fontSize="2xl" color="secondary" marginBottom="20px">Como artesano, podrás:</Text>
                <ul>
                    <li><Text>Cargar y gestionar tus productos en la plataforma.</Text></li>
                    <li><Text>Ver información detallada sobre las ventas de tus productos.</Text></li>
                    <li><Text>Conectar con compradores interesados en tu arte.</Text></li>
                    <li><Text>Administrar tu perfil y tu catálogo de creaciones.</Text></li>
                    <li><Text>Conectar con otros artesanos inscritos en la plataforma, compartiendo ideas y experiencias.</Text></li>
                </ul>
            </Box>
        </Box>
    );
};
export default Info;
