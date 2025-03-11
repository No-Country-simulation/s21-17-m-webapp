import { Box, Flex, Text } from "@chakra-ui/react";

function Hero() {
  return (
    <Box
      bgImage="url(https://img.maspormas.com/2019/07/El-Mercado-de-Artesan%C3%ADas-de-la-Ciudadela-la-casa-de-la-cultura-mexicana-696x378.jpg)"
      bgSize="cover"
      bgPosition="center"
      height={["60vh", "70vh", "80vh"]}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={["10", "12", "15"]}
    >
      <Flex direction="column" alignItems="center" width="100%">
        <Text
          fontSize={["5xl", "6xl", "8xl"]}
          fontWeight="bolder"
          color="secondary"
          textShadow="8px 10px 10px rgb(14, 3, 0)"
          marginInline={["20px", "50px", "100px"]}
        >
          cDavinci
        </Text>
        <Text
          fontSize={["2xl", "3xl", "4xl", "5xl"]}
          fontWeight="bolder"
          color="secondary"
          textShadow="5px 8px 8px rgb(14, 3, 0)"
          marginInline={["20px", "50px", "100px"]}
        >
          Artesanías del Artista a tus manos
        </Text>
      </Flex>
    </Box>
  );
}

export default Hero;
