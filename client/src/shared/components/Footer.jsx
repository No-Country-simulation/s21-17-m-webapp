import { Box, Flex, Link, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/cdavinci.jpg";

function Footer() {
  return (
    <Box bg="neutral" color="accent" p="4" mt="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
      >
        {/* Logo y nombre de la empresa */}
        <Flex align="center" mb={{ base: "4", md: "0" }}>
          <Image
            src={logo}
            alt="logo cDavinci"
            maxHeight={"40px"}
            marginInline={"30px"}
          />
          <Text fontSize="lg" fontWeight="bold">
            cDavinci
          </Text>
        </Flex>

        {/* Enlaces rápidos */}
        <Flex
          direction="column"
          align={{ base: "center", md: "flex-start" }}
          mb={{ base: "4", md: "0" }}
        >
          <Text fontWeight="bold" mb="2">
            Enlaces Rápidos
          </Text>
          <Link href="/artisans" mb="2">
            Artesanos
          </Link>
          <Link href="/aboutUs" mb="2">
            Sobre Nosotros
          </Link>          
        </Flex>

        {/* Información de contacto */}
        <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
          <Text fontWeight="bold" mb="2">
            Contacto
          </Text>
          <Text mb="2">Email: info@cdavinci.com</Text>
          <Text mb="2">Teléfono: +123 456 789</Text>
          <Text>Dirección: Calle 123, Ciudad, País</Text>
        </Flex>
      </Flex>

      {/* Derechos de autor */}
      <Text textAlign="center" mt="4">
        © {new Date().getFullYear()} cDavinci. Todos los derechos reservados.
      </Text>
    </Box>
  );
}

export default Footer;
