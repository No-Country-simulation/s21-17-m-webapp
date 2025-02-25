import { useState } from "react";
import { Button, Input, Fieldset, Flex, Spinner } from "@chakra-ui/react";
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
import {
  NativeSelectRoot,
  NativeSelectField,
} from "../../../shared/components/native-select";
import { useProfileProductsContext } from "../store/ProfileProductsContext";
import { useCategoryContext } from "../../products/store/CategoryContext";

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { addProduct } = useProfileProductsContext();
  const { categories, loading, error } = useCategoryContext();

  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    if (data.image && data.image[0]) {
      const file = data.image[0];
      const imageBlob = new Blob([file], { type: file.type });

      const productData = {
        ...data,
        image: imageBlob,
      };

      addProduct(productData);
    }

    setImagePreview(null);
    reset();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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
            Agregar Producto
          </Button>
        </Flex>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Agregar un Nuevo Producto</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root size="lg">
              <Field label="Nombre del Producto">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
                  {...register("name", {
                    required: "El nombre del producto es obligatorio",
                  })}
                />
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
              </Field>

              <Field label="Descripción del Producto">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
                  {...register("description", {
                    required: "La descripción del producto es obligatorio",
                  })}
                />
                {errors.description && (
                  <p style={{ color: "red" }}>{errors.description.message}</p>
                )}
              </Field>

              <Field label="Precio Unitario">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "El precio es obligatorio",
                    min: {
                      value: 0.01,
                      message: "El precio debe ser mayor a 0",
                    },
                  })}
                />
                {errors.price && (
                  <p style={{ color: "red" }}>{errors.price.message}</p>
                )}
              </Field>

              <Field label="Cantidad en Existencia">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
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
                  <p style={{ color: "red" }}>{errors.stock.message}</p>
                )}
              </Field>

              <Field label="Categoría">
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  error && (
                    <p style={{ color: "red" }}>
                      Problemas cargando las categorías
                    </p>
                  )
                )}

                {!loading && (
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Selecciona una categoría"
                      {...register("category", {
                        required: "Selecciona una categoría",
                      })}
                    >
                      {categories.map((category) => (
                        <option key={category.idCategory} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                )}
                {errors.category && (
                  <p style={{ color: "red" }}>{errors.category.message}</p>
                )}
              </Field>

              <Field label="Imagen del Producto">
                <Input
                  bg="neutral"
                  caretColor="secondary"
                  borderColor="secondary"
                  type="file"
                  {...register("image", {
                    required: "Selecciona una imagen",
                    validate: {
                      lessThan5MB: (files) =>
                        files[0]?.size < 5 * 1024 * 1024 ||
                        "La imagen debe ser menor a 5MB",
                      acceptedFormats: (files) =>
                        ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Formato de imagen no válido",
                    },
                  })}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p style={{ color: "red" }}>{errors.image.message}</p>
                )}
                {imagePreview && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </Field>
            </Fieldset.Root>
          </form>
        </DialogBody>
        <DialogFooter display="flex" justifyContent="flex-end">
          <DialogCloseTrigger
            asChild
            onClick={() => {
              setImagePreview(null);
              reset();
            }}
          ></DialogCloseTrigger>
          <DialogActionTrigger asChild>
            <Button
              _hover={{ bg: "secondary.700" }}
              bg={"secondary"}
              colorPalette={"bg"}
              color={"black"}
              onClick={() => {
                setImagePreview(null);
                reset();
              }}
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
            form="product-form"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
