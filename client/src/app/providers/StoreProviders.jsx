import { PropTypes } from "prop-types";
import { CategoryProvider } from "../../features/products/store/CategoryContext";
import { ProfileProductsProvider } from "../../features/profile/store/ProfileProductsContext";
import { ProductProvider } from "../../features/products/store/ProductContext";

const StoreProviders = ({ children }) => {
  return (
    <>
      <CategoryProvider>
        <ProductProvider>
          <ProfileProductsProvider>{children}</ProfileProductsProvider>
        </ProductProvider>
      </CategoryProvider>
    </>
  );
};

export default StoreProviders;

StoreProviders.propTypes = {
  children: PropTypes.node,
};
