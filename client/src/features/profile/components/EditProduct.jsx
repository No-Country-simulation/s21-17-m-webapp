import { useState, useEffect } from "react";
import { Button, Input, Fieldset, Flex, Spinner, Text } from "@chakra-ui/react";
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
import uploadImageToCloudinary from "../../../shared/services/cloundinary";
import { toaster } from "../../../shared/components/toaster";
import { updateProduct } from "../../products/services/products";
import PropTypes from "prop-types";

export const EditProduct = ({ product }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { updateProduct: updateProductStore } = useProfileProductsContext();
  const {
    categories,
    loading: loadingCategories,
    error: categoriesError,
  } = useCategoryContext();

  const [imagePreview, setImagePreview] = useState(product?.urlImage || null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("category", product.idCategory);
      setImagePreview(product.urlImage);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    setIsUploading(true);
    try {
      if (data.image) {
        if (data.image instanceof FileList && data.image[0]) {
          const urlImage = await uploadImageToCloudinary(
            data.image[0],
            "products",
            data.name
          );
          data.urlImage = urlImage;
        } else {
          data.urlImage = product.urlImage;
        }
      }

      const updatedProduct = await updateProduct({
        idProduct: product.idProduct,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        urlImage: data.urlImage,
        idCategory: data.category,
      });
            
      if (updatedProduct.status === 200 )
        updateProductStore({
          idProduct: product.idProduct,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          urlImage: data.urlImage,
          idCategory: data.category,
        });

      toaster.create({
        title: "Producto actualizado",
        description: "El producto ha sido actualizado con éxito.",
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
        title: "Error al actualizar el producto",
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
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant={"ghost"} color={"secondary"} size="sm">
          Editar Producto
        </Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
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
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.name.message}
                  </Text>
                )}
              </Field>

              <Field label="Descripción del Producto">
                <Input
                  borderColor="secondary"
                  caretColor="secondary"
                  {...register("description", {
                    required: "La descripción del producto es obligatoria",
                  })}
                />
                {errors.description && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.description.message}
                  </Text>
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
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.price.message}
                  </Text>
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
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.stock.message}
                  </Text>
                )}
              </Field>

              <Field label="Categoría">
                {loadingCategories ? (
                  <Spinner size="sm" />
                ) : (
                  categoriesError && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      Problemas cargando las categorías
                    </Text>
                  )
                )}

                {!loadingCategories && (
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Selecciona una categoría"
                      {...register("category", {
                        required: "Selecciona una categoría",
                      })}
                    >
                      {categories.map((category) => (
                        <option
                          key={category.idCategory}
                          value={category.idCategory}
                        >
                          {category.name}
                        </option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                )}
                {errors.category && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.category.message}
                  </Text>
                )}
              </Field>

              <Field label="Imagen del Producto">
                <Input
                  bg="neutral"
                  caretColor="secondary"
                  borderColor="secondary"
                  type="file"
                  {...register("image", {
                    validate: {
                      lessThan5MB: (files) =>
                        !files[0] ||
                        files[0].size < 5 * 1024 * 1024 ||
                        "La imagen debe ser menor a 5MB",
                      acceptedFormats: (files) =>
                        !files[0] ||
                        ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Formato de imagen no válido",
                    },
                  })}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.image.message}
                  </Text>
                )}
                {imagePreview && (
                  <Flex mt={2}>
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </Flex>
                )}
              </Field>
            </Fieldset.Root>
          </form>
        </DialogBody>
        <DialogFooter display="flex" justifyContent="flex-end">
          <DialogCloseTrigger asChild />
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
            form="product-form"
            isLoading={isUploading}
            loadingText="Guardando..."
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
    urlImage: PropTypes.string,
    idCategory: PropTypes.number,
  }),
};
