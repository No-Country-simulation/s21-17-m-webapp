import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const BannerProfile = ({ user }) => {
  return (
    <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="lg">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Avatar.Root
          width={128}
          height={128}
          border="2px solid white"
          bg={"secondary"}
        >
          <Avatar.Fallback name={user?.name} fontSize={"4xl"} />
          <Avatar.Image src={user?.avatar} alt="Avatar" />
        </Avatar.Root>

        <VStack
          align="flex-start"
          ml={{ base: 0, md: 6 }}
          mt={{ base: 4, md: 0 }}
          spacing={2}
        >
          <Flex align="center">
            <Text fontSize="3xl" fontWeight="bold" mr={2} color="primary">
              Bienvenido
            </Text>
          </Flex>
          <Flex align="center">
            <Text fontSize="lg" fontWeight="semibold" color="secondary">
              {user?.name}
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

BannerProfile.propTypes = {
  user: PropTypes.object,
};
