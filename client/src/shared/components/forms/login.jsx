import React, { useState } from "react";
import { Box, Button, Text, Input, Stack, Link, Field, CloseButton  } from "@chakra-ui/react";
import { useAuth } from "../../../app/providers/AuthProvider";
function LoginForm({ onClose }) {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log(formData);
         try {
            const response = await fetch("https://api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Hubo un error, no se pudo iniciar sesion");
            }
            login(data);
            window.location.href = data.user.type === "comon" ? "/" : "/profile";// igual que en registro falta agregar la ruta de perfiles de usuarios comunes
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
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
                {error && <Text color="primary">{error}</Text>}
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
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                caretColor="secondary"
                                borderColor="secondary"
                            />
                        </Field.Root>
                        <Button type="submit"  bg="secondary">Ingresar</Button>
                    </Stack>
                </form>
            </Box>
            <CloseButton margin="2rem" onClick={onClose}/> 
        </Box>
    );
}

export default LoginForm;
