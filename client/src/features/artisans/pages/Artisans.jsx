import { Box, Grid, Text } from "@chakra-ui/react";
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
    <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Artesanos
      </Text>
      {loading && <Text>Cargando...</Text>}
      {error && <Text color="red.400">Error: {error.message}</Text>}
      {!loading && !error && artisans.length === 0 && (
        <Text>No hay artesanos disponibles.</Text>
      )}
      {artisans && (
        <Box>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {artisans.map((artisan) => (
              <CardArtisan
                key={artisan.id}
                id={artisan.id}
                name={artisan.name}
                aboutMe={artisan.aboutMe}
                imageUrl={artisan.imageUrl}
                locality={artisan.locality}
                especiality={artisan.especiality}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
