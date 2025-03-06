import { PropTypes } from "prop-types";
import { CategoryProvider } from "../../features/products/store/CategoryContext";
import { ProfileProductsProvider } from "../../features/profile/store/ProfileProductsContext";
import { ProductProvider } from "../../features/products/store/ProductContext";
import { ArtisanProvider } from "../../features/profile/store/ArtisanContext";

const StoreProviders = ({ children }) => {
  return (
    <>
      <CategoryProvider>
        <ArtisanProvider>
          <ProductProvider>
            <ProfileProductsProvider>{children}</ProfileProductsProvider>
          </ProductProvider>
        </ArtisanProvider>
      </CategoryProvider>
    </>
  );
};

export default StoreProviders;

StoreProviders.propTypes = {
  children: PropTypes.node,
};
