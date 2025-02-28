import React, { useState } from "react";
import { Box, Text, Button, Stack, FieldRoot, FieldLabel, Input } from "@chakra-ui/react";

function FormCart ( { onConfirmCompra } ){
    const [ formData, setFormData ] = useState ({
        address: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleConfirmCompra = () => {
        onConfirmCompra(formData);
    };

    return (
        <Box>
            <Text>Datos de envio</Text>
            <form>
                <Stack>
                    <FieldRoot>
                        <FieldLabel>Direccion</FieldLabel>
                        <Input                 
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            caretColor="secondary"
                            borderColor="secondary"
                        />
                    </FieldRoot>
                    <Button onClick={handleConfirmCompra}>Confirmar compra</Button>
                </Stack>
            </form>
        </Box>
    );
}
export default FormCart;