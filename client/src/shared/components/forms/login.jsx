import React, { useState } from "react";
import { Box, Button, Text, Input, Stack, Link, Field, CloseButton  } from "@chakra-ui/react";

function LoginForm({ onClose }) {
    const [formData, setFormData] = useState({
        contraseña: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //yavamos jajaj
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Box bg="neutral.400" color="accent" textAlign="center" display="flex" justifyContent="center">
            <Box bg="neutral" width="400px" p="15px" shadow="md" borderRadius="md" marginBlock="25px">
                <Text fontSize="xl" fontWeight="bold" mb={4}>Ingresar</Text>
                <form onSubmit={handleSubmit}  >
                    <Stack spacing={4}>
                        <Field.Root>
                        <Field.Label>Email</Field.Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                caretColor="secondary"
                                borderColor="secondary"
                            />
                        </Field.Root>
                        <Field.Root>
                        <Field.Label >Contraseña</Field.Label>  
                            <Input
                                id="Contraseña"
                                name="contraseña"
                                type="password"
                                value={formData.contraseña}
                                onChange={handleChange}
                                required
                                caretColor="secondary"
                                borderColor="secondary"
                            />
                        </Field.Root>
                        <Button type="submit"  bg="secondary">Ingresar</Button>
                    </Stack>
                </form>

                <Link href="#" mt={4} display="block" color="secondary">¿Olvidaste tu contraseña?</Link>
            </Box>
            <CloseButton margin="2rem" onClick={onClose}/> 
        </Box>
    );
}

export default LoginForm;
