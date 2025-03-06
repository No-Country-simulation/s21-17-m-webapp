import { useState, useEffect } from "react";
import { Button, Input, Fieldset, Text } from "@chakra-ui/react";
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
import { useProfileProductsContext } from "../store/ProfileProductsContext";
import PropTypes from "prop-types";
import { toaster } from "../../../shared/components/toaster";
import { updateProductStock } from "../../products/services/products";

export const EditProduct = ({ product }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { updateProduct: updateProductStore } = useProfileProductsContext();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setValue("stock", product.stock);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      await updateProductStock(product.idProduct, data.stock);
      await updateProductStore({ ...product, stock: data.stock });

      toaster.create({
        title: "Stock actualizado",
        description: "El stock del producto ha sido actualizado con éxito.",
        status: "success",
        type: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Ocurrió un error desconocido";
      toaster.create({
        title: "Error al actualizar el stock",
        description: errorMessage,
        status: "error",
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant={"ghost"} color={"secondary"} size="sm">
          Editar Stock
        </Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Editar Stock del Producto</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root size="lg">
              {/* Mostrar información del producto como texto */}
              <Field label="Nombre del Producto">
                <Text>{product?.name}</Text>
              </Field>

              <Field label="Descripción del Producto">
                <Text>{product?.description}</Text>
              </Field>

              <Field label="Precio Unitario">
                <Text>{product?.price}</Text>
              </Field>

              {/* Solo el stock es editable */}
              <Field label="Cantidad en Existencia">
                <Input
                  type="number"
                  {...register("stock", {
                    required: "La cantidad es obligatoria",
                    min: {
                      value: 1,
                      message: "La cantidad debe ser al menos 1",
                    },
                  })}
                />
                {errors.stock && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.stock.message}
                  </Text>
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
            _hover={{ bg: "secondary.700" }}
            bg={"secondary"}
            colorPalette={"bg"}
            color={"black"}
            type="submit"
            form="product-form"
            isLoading={isUploading}
            loadingText="Guardando..."
            disabled={isUploading}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

EditProduct.propTypes = {
  product: PropTypes.shape({
    idProduct: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
  }),
};
