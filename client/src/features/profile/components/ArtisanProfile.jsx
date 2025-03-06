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
  Textarea,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import uploadImageToCloudinary from "../../../shared/services/cloundinary";
import { postArtisan } from "../../artisans/services/artisan";
import { toaster } from "../../../shared/components/toaster";

export const ArtisanProfile = ({ artisan }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: artisan?.name || "",
      aboutMe: artisan?.aboutMe || "",
      imageUrl: artisan?.imageUrl || "",
      locality: artisan?.locality || "",
      speciality: artisan?.speciality || "",
    },
  });

  const [isEditing, setIsEditing] = useState(!artisan);
  const [imagePreview, setImagePreview] = useState(artisan?.imageUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCreate = async (data) => {
    try {
      await postArtisan(data);
      toaster.create({
        title: "¡Éxito!",
        description: "El artesano ha sido creado con éxito.",
        status: "success",
        type: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        (typeof error?.response?.data === "string" && error.response.data) ||
        (typeof error?.message === "string" && error.message) ||
        "Ocurrió un error desconocido";
      toaster.create({
        title: "Error al crear el artesano",
        description: errorMessage,
        status: "error",
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const onEdit = async (data) => {
    // Lógica para editar un artesano existente
    console.log("Editar artesano:", data);
  };

  const onSubmit = async (data) => {
    if (artisan) {
      // Si hay artisan, estamos editando
      await onEdit(data);
    } else {
      // Si no hay artisan, estamos creando
      await onCreate(data);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setImagePreview(artisan?.imageUrl || "");
    setIsEditing(false);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(file, "profiles");
        setImagePreview(imageUrl);
        setValue("imageUrl", imageUrl);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      } finally {
        setIsUploading(false);
      }
    }
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
            <Avatar.Fallback name={artisan?.name} fontSize={"4xl"} />
            <Avatar.Image
              src={imagePreview === "" ? null : imagePreview}
              alt="Avatar"
            />
          </Avatar.Root>
          {isEditing && (
            <Flex position="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="imageUrl"
                position="absolute"
                opacity={0}
                cursor="pointer"
                width="100%"
                height="100%"
                disabled={isUploading}
              />
              <Button
                as="label"
                htmlFor="imageUrl"
                colorScheme="blue"
                variant="outline"
                size="sm"
                width="100%"
                mt={2}
                textAlign="center"
                isLoading={isUploading}
                loadingText="Subiendo..."
              >
                Cambiar Imagen
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
              {"Bienvenido"}
            </Text>
          </Flex>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("name", { required: "El nombre es obligatorio" })}
                placeholder="Nombre"
                mb={2}
              />
              {errors.name && (
                <Text color="red.500" mb={2}>
                  {errors.name.message}
                </Text>
              )}

              <Textarea
                {...register("aboutMe")}
                placeholder="Sobre mí"
                mb={2}
              />

              <Input {...register("locality")} placeholder="Localidad" mb={2} />

              <Input
                {...register("speciality")}
                placeholder="Especialidad"
                mb={2}
              />

              <Flex mt={2} gap={2}>
                <Button
                  onClick={handleCancel}
                  colorScheme="red"
                  _hover={{ bg: "secondary.700" }}
                  bg={"secondary"}
                  color={"black"}
                >
                  Cancelar
                </Button>
                <Button
                  _hover={{ bg: "secondary.700" }}
                  bg={"secondary"}
                  color={"black"}
                  type="submit"
                  colorScheme="blue"
                  mr={2}
                  isLoading={loading}
                >
                  {artisan ? "Guardar Cambios" : "Crear Artesano"}
                </Button>
              </Flex>
            </form>
          ) : (
            <>
              {artisan ? (
                <>
                  <Text fontSize="lg" fontWeight="semibold" color="secondary">
                    {artisan.name}
                  </Text>
                  <Text>{artisan.aboutMe}</Text>
                  <Text>{artisan.locality}</Text>
                  <Text>{artisan.speciality}</Text>
                  <Button
                    onClick={() => setIsEditing(true)}
                    _hover={{ bg: "secondary.700" }}
                    bg={"secondary"}
                    color={"black"}
                    mt={2}
                  >
                    Editar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  _hover={{ bg: "secondary.700" }}
                  bg={"secondary"}
                  color={"black"}
                  mt={2}
                >
                  Crear Perfil
                </Button>
              )}
            </>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

ArtisanProfile.propTypes = {
  artisan: PropTypes.object | null,
};
