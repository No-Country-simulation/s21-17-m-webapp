import { Box, Flex, Text } from "@chakra-ui/react";
import CardArtisan from "../../../shared/components/cardArtisan";
import { useEffect, useState } from "react";
import { getArtisans } from "../services/artisan";

export const Artisans = () => {
  const [artisans, setArtisans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artisansData = await getArtisans();
        setArtisans(artisansData.artisans);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box p={8} borderRadius="lg" boxShadow="lg" >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Artesanos
      </Text>
      {loading && <Text>Cargando...</Text>}
      {error && <Text color="red.400">Error: {error.message}</Text>}
      {!loading && !error && artisans?.length === 0 && (
        <Text>No hay artesanos disponibles.</Text>
      )}
      {artisans && (
        <Flex
          flexWrap="wrap"
          justifyContent={"space-around"}
          alignItems="center"
          gap={6}
          width="100%"
        >
          {artisans.map((artisan) => (
            <Box
              key={artisan.id}
              width={{ base: "100%", md: "45%", lg: "30%" }}
              maxWidth="300px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CardArtisan
                id={artisan.id}
                name={artisan.name}
                aboutMe={artisan.aboutMe}
                imageUrl={artisan.imageUrl}
                locality={artisan.locality}
                especiality={artisan.especiality}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};
