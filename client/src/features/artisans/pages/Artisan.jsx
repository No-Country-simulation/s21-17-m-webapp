import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Avatar,
  Spinner,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtisanById } from "../services/artisan";
import CardProducts from "../components/CardProducts";

export const Artisan = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [artisanDetail, setArtisanDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getArtisan() {
      setLoading(true);
      setError(null);
      try {
        if (!id) return;
        const artisanDetailData = await getArtisanById(id);
        setArtisanDetail(artisanDetailData);
      } catch (error) {
        console.error(error);
        setArtisanDetail(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getArtisan();
  }, [id]);

  if (!id) {
    return (
      <>
        <Flex justifyContent="flex-start" mb="4">
          <Button bg="secondary" size="sm" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Flex>
        <Text>No se encontró el artesano.</Text>
      </>
    );
  }

  return (
    <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="lg">
      <Flex justifyContent="flex-start" mb="4">
        <Button bg="secondary" size="sm" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Flex>

      {loading && <Spinner size="xl" />}
      {error && <Text color="red.500">Error: {error}</Text>}
      {artisanDetail && (
        <Box textAlign="center">
          {artisanDetail.imageUrl ? (
            <Image
              src={artisanDetail.imageUrl}
              alt={artisanDetail.name}
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
              mx="auto"
              mb={4}
            />
          ) : (
            <Avatar
              name={artisanDetail.name}
              size="xl"
              bg="teal.500"
              color="white"
              mx="auto"
              mb={4}
            />
          )}
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {artisanDetail.name}
          </Text>
          <Text fontSize="lg" mb={2}>
            {artisanDetail.aboutMe}
          </Text>
          <Text fontSize="md" mb={2}>
            <strong>Localidad:</strong> {artisanDetail.locality}
          </Text>
          <Text fontSize="md">
            <strong>Especialidad:</strong> {artisanDetail.speciality}
          </Text>
        </Box>
      )}
      {!loading && !error && !artisanDetail && (
        <Text>No se encontró el artesano.</Text>
      )}
      <CardProducts artisanId={id} />
    </Box>
  );
};
