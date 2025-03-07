import React from "react";
import { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import CardArtisan from "../../../shared/components/cardArtisan";
import api from "../../../app/config/api";

function ArtisanConteiner() {
  const [artisanData, setArtisanData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/landing/artisans");
        const data = response.data;
        setArtisanData(data.artisans);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError(
          "Nos encontramos con problemas al encontrar nuestros artesanos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Box p="4" gap="10" alignItems="center">
      <Text fontSize="2xl">Nuevos artesanos</Text>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt="20">
          <Spinner size="lg" />
        </Box>
      ) : error ? (
        <Text color="secondary" textAlign="center" mt="4">
          {error}
        </Text>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap="10"
        >
          {artisanData.reverse().slice(0,3).map((artisan) => (
            <CardArtisan
              key={artisan.id}
              name={artisan.name}
              aboutMe={artisan.aboutMe}
              imageUrl={artisan.imageUrl}
              locality={artisan.locality}
              especiality={artisan.especiality}
            />
          ))}
          {
            artisanData.length === 0 && (
              <Text color="secondary" textAlign="center" mt="4">
                No se encontraron artesanos.
              </Text>
            )
          }
        </Box>
      )}
    </Box>
  );
}
export default ArtisanConteiner;
