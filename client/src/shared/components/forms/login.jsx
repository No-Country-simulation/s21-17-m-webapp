import React, { useState } from "react";
import { Box, Button, Text, Input, Stack, Field, CloseButton  } from "@chakra-ui/react";
import { useAuth } from "../../../app/providers/AuthProvider";
import api from "../../../app/config/api";
import { useNavigate } from "react-router-dom";
function LoginForm({ onClose }) {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
          const response = await api.post("/login", formData);
          
          const data = await response.data;
          const { tokend, ...user } = data;
          login({ user, token: tokend });          
          const redirect = data.user.type === "common" ? `/profile/${data.user.id}` : `/artisans/${data.user.id}`;
            Navigate(redirect);
        } catch (error) {
            const errorMessage =
            (typeof error?.response?.data === "string" && error.response.data) ||
            (typeof error?.message === "string" && error.message) ||
            "Ocurrió un error desconocido";
            setError(errorMessage);
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
                <CloseButton display="flex" justifySelf="end" onClick={onClose} />
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
        </Box>
    );
}

export default LoginForm;
