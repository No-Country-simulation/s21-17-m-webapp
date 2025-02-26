import React, { useState } from "react";
import { Box, Button, Text, Input, Stack, Link, Field, CloseButton } from "@chakra-ui/react";
import { useAuth } from "../../../app/providers/AuthProvider";
import api from "../../../app/config/api";

function RegisterForm({ onClose }) {
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        role: false,
        password: "",
    });

    const handleCheckboxChange = () => {
        setFormData((prevData) => ({
            ...prevData,
            role: !prevData.role, 
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log(formData);
        
        try {
            const response = await api.post("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.data;

            if (!response.ok) {
                throw new Error(data.message || "Hubo un errr, no se pudo realizar el registro");
            }
            login(data); 

            window.location.href = data.user.type === "comon" ? "/profile" : "/profile";//falta agregar la ruta de perfiles de usuarios comunes
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
                <Text fontSize="xl" fontWeight="bold" mb={4}>Registrarse</Text>
                {error && <Text color="primary">{error}</Text>}
                <form onSubmit={handleSubmit}  >
                    <Stack spacing={4}>
                        <Field.Root>
                        <Field.Label>Nombre</Field.Label>  
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                caretColor="secondary"
                                borderColor="secondary"
                            />
                        </Field.Root>
                        <Field.Root>
                        <Field.Label >Apellido</Field.Label>  
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                caretColor="secondary"
                                borderColor="secondary"
                            />
                        </Field.Root>
                        <Field.Root>
                        <Field.Label >Telefono</Field.Label>  
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                caretColor="secondary"
                                borderColor="secondary"
                            />
                        </Field.Root>
                        <label>
                        ¿Eres Atesano?
                            <input
                                type="checkbox"
                                checked={formData.role}  
                                onChange={handleCheckboxChange}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '4px',
                                    border: '2px solid #ccc',
                                    borderColor: 'rgb(245, 159, 41)',
                                    transition: 'background-color 0.2s, border-color 0.2s',
                                    cursor: 'pointer',
                                    marginLeft: '18px',
                                }} 
                                />
                        </label>
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
                        <Field.Label>Contraseña</Field.Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                caretColor="secondary"
                                borderColor="secondary"
                            />
                        </Field.Root>
                        <Button type="submit"  bg="secondary">Enviar</Button>
                    </Stack>
                </form>

                <Link href="/policy" mt={4} display="block" color="secondary">Políticas de la empresa</Link>
            </Box>
            <CloseButton margin="2rem" onClick={onClose}/> 
        </Box>
    );
}

export default RegisterForm;
