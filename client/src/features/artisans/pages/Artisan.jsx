import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const Artisan = () => {
  const params = useParams();
  const id = params.id;
  
  return (
    <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Artesano {id}
      </Text>
    </Box>
  );
};
