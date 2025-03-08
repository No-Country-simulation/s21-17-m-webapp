import { Button, Input, Fieldset } from "@chakra-ui/react";
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
import { updateCustomer } from "../services/customer";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const EditCustomer = ({ customer }) => {
  const { updateCustomer: updateCustomerStore } = useCustomerContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (customer) {
      setValue("name", customer.name);
      setValue("lastname", customer.lastname);
      setValue("address", customer.address);
    }
  }, [customer, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedCustomer = await updateCustomer({
        name: data.name,
        lastname: data.lastname,
        address: data.address,
        idCustomer: customer.idCustomer,
      });

      if (updatedCustomer.status === 200)
        updateCustomerStore({
          name: data.name,
          lastname: data.lastname,
          address: data.address,
          idCustomer: customer.idCustomer,
        });

      toaster.create(
        {
          title: "Perfil de cliente actualizado",
          description: "El perfil de cliente se ha actualizado correctamente.",
          type: "success",
          duration: 5000,
        },
        { closable: true }
      );
    } catch (error) {
      console.error("Error al actualizar el perfil de cliente:", error);
      toaster.create(
        {
          title: "Error al actualizar el perfil de cliente",
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
        <Button variant={"ghost"} color={"secondary"} size="sm">
          Editar
        </Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Editar Perfil de Cliente</DialogTitle>
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
          <DialogCloseTrigger asChild></DialogCloseTrigger>
          <DialogActionTrigger asChild>
            <Button
              _hover={{ bg: "secondary.700" }}
              bg={"secondary"}
              colorPalette={"bg"}
              color={"black"}
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

EditCustomer.propTypes = {
  customer: PropTypes.shape({
    idCustomer: PropTypes.number,
    name: PropTypes.string,
    lastname: PropTypes.string,
    address: PropTypes.string,
  }),
};
