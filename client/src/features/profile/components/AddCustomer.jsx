import { Button, Input, Fieldset, Flex } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogBackdrop,
  DialogTrigger,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from "../../../shared/components/dialog";
import { useForm } from "react-hook-form";
import { Field } from "../../../shared/components/field";
import { useCustomerContext } from "../store/CustomerContext";
import { toaster } from "../../../shared/components/toaster";
import { postCustomer } from "../services/customer";
import { useAuth } from "../../../app/providers/AuthProvider";

export const AddCustomer = () => {
  const { user } = useAuth();
  const { addCustomer } = useCustomerContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const customerResponse = await postCustomer({
        name: data.name,
        lastname: data.lastname,
        address: data.address,
        userId: user.id,
      });
      await addCustomer(customerResponse);
      reset();
      toaster.create(
        {
          title: "Perfil de cliente agregado",
          description: "El perfil de cliente se ha creado correctamente.",
          type: "success",
          duration: 5000,
        },
        { closable: true }
      );
    } catch (error) {
      console.error("Error al agregar el perfil de cliente:", error);
      toaster.create(
        {
          title: "Error al agregar el perfil de cliente",
          description: "Por favor, inténtalo de nuevo.",
          type: "error",
          duration: 5000,
        },
        { closable: true }
      );
    }
  };

  return (
    <DialogRoot bg="neutral" color="primary">
      <DialogTrigger asChild>
        <Flex justify="center" align="center" py={6} mb={2} bg={"primary.50"}>
          <Button
            _hover={{ bg: "secondary.700" }}
            bg={"secondary"}
            color={"accent"}
            colorScheme="blue"
          >
            Agregar Perfil de Cliente
          </Button>
        </Flex>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Agregar un Nuevo Perfil de Cliente</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form id="customer-form" onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root size="lg">
              <Field label="Nombre">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
              </Field>

              <Field label="Apellido">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
                  {...register("lastname", {
                    required: "El apellido es obligatorio",
                  })}
                />
                {errors.lastname && (
                  <p style={{ color: "red" }}>{errors.lastname.message}</p>
                )}
              </Field>

              <Field label="Dirección">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
                  {...register("address", {
                    required: "La dirección es obligatoria",
                  })}
                />
                {errors.address && (
                  <p style={{ color: "red" }}>{errors.address.message}</p>
                )}
              </Field>
            </Fieldset.Root>
          </form>
        </DialogBody>
        <DialogFooter display="flex" justifyContent="flex-end">
          <DialogCloseTrigger
            asChild
            onClick={() => reset()}
          ></DialogCloseTrigger>
          <DialogActionTrigger asChild>
            <Button
              _hover={{ bg: "secondary.700" }}
              bg={"secondary"}
              colorPalette={"bg"}
              color={"black"}
              onClick={() => reset()}
            >
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button
            _hover={{ bg: "primary.700" }}
            bg={"primary"}
            colorPalette={"bg"}
            color={"black"}
            type="submit"
            form="customer-form"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
