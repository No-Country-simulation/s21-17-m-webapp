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

    const handleConfirmCompra = (data) => {
        onConfirmCompra(data);
    };

    useEffect(() => {
        async function getCustomers() {
            try {
                if (!user) return;
                if (userType !== "common") return;
                const customersData = await getCustomersByUserId(user.id);
                addCustomers(customersData);
            } catch (error) {
                console.error(error);
            }
        }
        getCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Box color="secondary">
            <Text fontSize="xl" mb="2" mt="2">
                Datos de envío
            </Text>
            <form onSubmit={handleSubmit(handleConfirmCompra)}>
                {" "}
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
                                        <option key={customer.idCustomer} value={customer.idCustomer}>
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
                    <Button type="submit" bg="secondary" color="white" >
                        Confirmar compra
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

export default FormCart;
