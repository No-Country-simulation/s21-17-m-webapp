import { PropTypes } from "prop-types";
import {
  Button,
  Card,
  HStack,
  Stack,
  Text,
  Strong,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CardArtisan({ id, name, aboutMe, imageUrl, locality, especiality }) {
  return (
    <Card.Root
      width="320px"
      bg="neutral.200"
      borderRadius="lg"
      overflow="hidden"
      height={{ base: "auto", md: "280px" }}
    >
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar.Root
            width={50}
            height={50}
            border="2px solid white"
            bg={"secondary"}
          >
            <Avatar.Fallback name={name} fontSize={"xl"} />
            <Avatar.Image
              src={imageUrl === "" ? null : imageUrl}
              alt="Avatar"
            />
          </Avatar.Root>
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
          <Text fontSize="sm" color="gray.600" mt="2" noOfLines={1} >
            {aboutMe}
          </Text>
        </Box>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Link to={`/artisan/${id}`}>
          <Button variant="outline" size="sm" bg="secondary">
            Más información
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}

CardArtisan.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  aboutMe: PropTypes.string,
  imageUrl: PropTypes.string,
  locality: PropTypes.string,
  especiality: PropTypes.string,
};
export default CardArtisan;
