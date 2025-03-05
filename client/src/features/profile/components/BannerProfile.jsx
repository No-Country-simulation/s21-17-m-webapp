import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Flex,
  Text,
  VStack,
  Button,
  Input,
  Icon,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaTwitter, FaGlobe } from "react-icons/fa";
import PropTypes from "prop-types";

export const BannerProfile = ({ user }) => {  
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: { name: user?.name, socialLink: "", avatar: user?.avatar },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

  const onSubmit = (data) => {
    console.log("Datos guardados:", data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setAvatarPreview(user?.avatar);
    setIsEditing(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setValue("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const socialLink = watch("socialLink");

  const getSocialIcon = (url) => {
    if (url.includes("instagram.com")) return FaInstagram;
    if (url.includes("facebook.com")) return FaFacebook;
    if (url.includes("twitter.com")) return FaTwitter;
    return FaGlobe;
  };

  return (
    <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="lg">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <VStack spacing={2}>
          <Avatar.Root
            width={128}
            height={128}
            border="2px solid white"
            bg={"secondary"}
          >
            <Avatar.Fallback name={user?.name} fontSize={"4xl"} />
            <Avatar.Image src={avatarPreview} alt="Avatar" />
          </Avatar.Root>
          {isEditing && (
            <Flex position="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                id="avatar"
                position="absolute"
                opacity={0}
                cursor="pointer"
                width="100%"
                height="100%"
              />
              <Button
                as="label"
                htmlFor="avatar"
                colorScheme="blue"
                variant="outline"
                size="sm"
                width="100%"
                mt={2}
                textAlign="center"
              >
                Cambiar Avatar
              </Button>
            </Flex>
          )}
        </VStack>

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

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input {...register("name")} placeholder="Nombre" mb={2} />
              <Flex align="center" gap={2}>
                <Input
                  {...register("socialLink")}
                  placeholder="Red Social (link)"
                  mb={2}
                />
                {socialLink && (
                  <Icon
                    as={getSocialIcon(socialLink)}
                    boxSize={6}
                    color="secondary"
                  />
                )}
              </Flex>
              <Flex mt={2} gap={2}>
                <Button
                  onClick={handleCancel}
                  colorScheme="red"
                  _hover={{ bg: "secondary.700" }}
                  bg={"secondary"}
                  colorPalette={"bg"}
                  color={"black"}
                >
                  Cancelar
                </Button>
                <Button
                  _hover={{ bg: "secondary.700" }}
                  bg={"secondary"}
                  colorPalette={"bg"}
                  color={"black"}
                  type="submit"
                  colorScheme="blue"
                  mr={2}
                >
                  Guardar
                </Button>
              </Flex>
            </form>
          ) : (
            <>
              <Text fontSize="lg" fontWeight="semibold" color="secondary">
                {user?.name}
              </Text>
              {socialLink && (
                <Flex align="center">
                  <Icon
                    as={getSocialIcon(socialLink)}
                    boxSize={6}
                    color="blue.500"
                    mr={2}
                  />
                  <Text>{socialLink}</Text>
                </Flex>
              )}
              <Button
                onClick={() => setIsEditing(true)}
                _hover={{ bg: "secondary.700" }}
                bg={"secondary"}
                colorPalette={"bg"}
                color={"black"}
                mt={2}
              >
                Editar
              </Button>
            </>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

BannerProfile.propTypes = {
  user: PropTypes.object,
};
