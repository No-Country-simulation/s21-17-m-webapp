import React from 'react';
import {
    Box, 
    Flex,
    Text,
} from "@chakra-ui/react";

function Hero(){
    return(
        <Box
            bgImage="url(https://img.maspormas.com/2019/07/El-Mercado-de-Artesan%C3%ADas-de-la-Ciudadela-la-casa-de-la-cultura-mexicana-696x378.jpg)"
            bgSize="cover" 
            bgPosition="center" 
            height="80vh" 
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="15"
        >
            <Flex direction="column">
                <Text fontSize="8xl" fontWeight="bolder" color="secondary" textShadow="3px 5px 5px rgba(0, 0, 0, 0.7)">
                    cDavinci
                </Text>
                <Text fontSize="4xl" fontWeight="bolder" color="secondary" textShadow="2px 4px 4px rgba(0, 0, 0, 0.7)">
                    Artesanias del Artista a tus manos
                </Text>
            </Flex>
        </Box>
    );
}
export default Hero;