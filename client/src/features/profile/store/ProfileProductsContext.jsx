import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";

const ProfileProductsContext = createContext();

export const ProfileProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProducts = (productsData) => {
    setProducts(productsData);
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, { ...newProduct }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.idProduct === updatedProduct.idProduct
          ? updatedProduct
          : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.idProduct !== productId)
    );
  };

  return (
    <ProfileProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, addProducts }}
    >
      {children}
    </ProfileProductsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfileProductsContext = () =>
  useContext(ProfileProductsContext);

ProfileProductsProvider.propTypes = {
  children: PropTypes.node,
  products: PropTypes.array,
  addProduct: PropTypes.func,
  updateProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
};
