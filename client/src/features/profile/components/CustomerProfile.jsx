import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Flex, Text, VStack, Button, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  postCustomer,
  updateCustomer,
} from "../../customers/services/customer";
import { toaster } from "../../../shared/components/toaster";
import { useCustomerContext } from "../store/CustomerContext";

export const CustomerProfile = () => {
  const {
    customer,
    createCustomer: createCustomerStore,
    updateCustomer: updateCustomerStore,
  } = useCustomerContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: customer?.name || "",
      lastname: customer?.lastname || "",
      address: customer?.address || "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        lastname: customer.lastname,
        address: customer.address,
      });
    }
  }, [customer, reset]);

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const onCreate = async (data) => {
    setLoading(true);
    try {
      const newCustomer = await postCustomer(data);
      createCustomerStore(newCustomer);

      toaster.create({
        title: "¡Éxito!",
        description: "El cliente ha sido creado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data ||
        error?.message ||
        "Ocurrió un error desconocido";
      toaster.create({
        title: "Error al crear el cliente",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async (data) => {
    setLoading(true);
    try {
      const updatedCustomer = await updateCustomer(data);
      updateCustomerStore(updatedCustomer);

      toaster.create({
        title: "Cliente actualizado",
        description: "El cliente ha sido actualizado.",
        type: "success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data ||
        error?.message ||
        "Ocurrió un error desconocido";
      toaster.create({
        title: "Error al actualizar el cliente",
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

  const onSubmit = async (data) => {
    if (customer) {
      await onEdit(data);
    } else {
      await onCreate(data);
    }
    setIsEditing(false);
  };

  return (
    <Box bg="primary.50" p={8} borderRadius="lg" boxShadow="lg">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
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

              <Input
                {...register("lastname", {
                  required: "El apellido es obligatorio",
                })}
                placeholder="Apellido"
                mb={2}
              />
              {errors.lastname && (
                <Text color="red.500" mb={2}>
                  {errors.lastname.message}
                </Text>
              )}

              <Input {...register("address")} placeholder="Dirección" mb={2} />

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
                  {customer ? "Guardar Cambios" : "Crear Cliente"}
                </Button>
              </Flex>
            </form>
          ) : (
            <>
              {customer ? (
                <>
                  <Text fontSize="lg" fontWeight="semibold" color="secondary">
                    {customer.name} {customer.lastname}
                  </Text>
                  <Text>{customer.address}</Text>
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

CustomerProfile.propTypes = {
  customer: PropTypes.object,
};
