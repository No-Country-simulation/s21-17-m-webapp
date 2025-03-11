import React, { useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Stack,
  FieldRoot,
  FieldLabel,
} from "@chakra-ui/react";
import {
  NativeSelectRoot,
  NativeSelectField,
} from "../../../shared/components/native-select";
import { useForm } from "react-hook-form";
import { useCustomerContext } from "../../profile/store/CustomerContext";
import { getCustomersByUserId } from "../../profile/services/customer";
import { useAuth } from "../../../app/providers/AuthProvider";

function FormCart({ onConfirmCompra }) {
  const { user, userType } = useAuth();
  const { customers, addCustomers } = useCustomerContext();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    async function getCustomers() {
      if (!user || userType !== "common") return;
      try {
        const customersData = await getCustomersByUserId(user.id);
        addCustomers(customersData);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    }
    getCustomers();
  }, [user, userType, addCustomers]);

  return (
    <Box bg="neutral.200" p="6" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" color="secondary" mb="4">
        Datos de Envío
      </Text>

      <form onSubmit={handleSubmit(onConfirmCompra)}>
        <Stack spacing={4}>
          <FieldRoot>
            <FieldLabel fontSize="m" mb="2">
              Perfil del Cliente
            </FieldLabel>
            <NativeSelectRoot>
              <NativeSelectField
                placeholder="Selecciona un cliente"
                {...register("customer", { required: "Selecciona un cliente" })}
              >
                {customers && customers.length > 0 ? (
                  customers.map((customer) => (
                    <option
                      key={customer.idCustomer}
                      value={customer.idCustomer}
                    >
                      {customer.name} {customer.lastName} | {customer.address}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay clientes disponibles
                  </option>
                )}
              </NativeSelectField>
            </NativeSelectRoot>
          </FieldRoot>

          <Button
            type="submit"
            bg="secondary"
            color="white"
            _hover={{ bg: "secondary.600" }}
            isDisabled={customers.length === 0}
            size="md"
            maxW="md"
            alignSelf="center"
          >
            Confirmar Compra
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default FormCart;
