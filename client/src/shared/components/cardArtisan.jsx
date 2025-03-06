import { PropTypes } from "prop-types";
import {
  Button,
  Card,
  HStack,
  Image,
  Stack,
  Text,
  Strong,
  Box,
} from "@chakra-ui/react";

function CardArtisan({ name, aboutMe, imageUrl, locality, especiality }) {
  return (
    <Card.Root
      width="320px"
      bg="neutral.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <Card.Body>
        <HStack mb="6" gap="3">
          <Image
            src={imageUrl}
            alt={name}
            borderRadius="full"
            boxSize="50px"
            objectFit="cover"
          />
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {name}
            </Text>
            <Text color="secondary.500" textStyle="sm">
              {locality}
            </Text>
          </Stack>
        </HStack>
        <Box>
          <Strong color="fg">{especiality}</Strong>
          <Text fontSize="sm" color="gray.600" mt="2">
            {aboutMe}
          </Text>
        </Box>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline" size="sm">
          Ver más
        </Button>       
      </Card.Footer>
    </Card.Root>
  );
}

CardArtisan.propTypes = {
  name: PropTypes.string,
  aboutMe: PropTypes.string,
  imageUrl: PropTypes.string,
  locality: PropTypes.string,
  especiality: PropTypes.string,
};
export default CardArtisan;
