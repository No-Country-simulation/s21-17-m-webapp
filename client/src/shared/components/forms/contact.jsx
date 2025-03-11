import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  Textarea,
  Stack,
  Link,
  Field,
  CloseButton,
} from "@chakra-ui/react";
import api from "../../../app/config/api";

function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mensaje: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/contact", formData);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
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
    <Box
      bg="neutral.400"
      color="accent"
      textAlign="center"
      display="flex"
      justifyContent="center"
    >
      <Box
        bg="neutral"
        width="400px"
        p="15px"
        shadow="md"
        borderRadius="md"
        marginBlock="25px"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Contáctanos
        </Text>
        <form onSubmit={handleSubmit}>
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
              <Field.Label>Apellido</Field.Label>
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
              <Field.Label>Mensaje</Field.Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                caretColor="secondary"
                borderColor="secondary"
              />
            </Field.Root>
            <Button type="submit" bg="secondary">
              Enviar
            </Button>
          </Stack>
        </form>

        <Link href="#" mt={4} display="block" color="secondary">
          Políticas de la empresa
        </Link>
      </Box>
      <CloseButton margin="2rem" onClick={onClose} />
    </Box>
  );
}

export default ContactForm;
