import { PropTypes } from "prop-types";
import { CategoryProvider } from "../../features/products/store/CategoryContext";
import { ProfileProductsProvider } from "../../features/profile/store/ProfileProductsContext";
import { ProductProvider } from "../../features/products/store/ProductContext";
import { ArtisanProvider } from "../../features/profile/store/ArtisanContext";
import { CustomerProvider } from "../../features/profile/store/CustomerContext";

const StoreProviders = ({ children }) => {
  return (
    <>
      <CategoryProvider>
        <ArtisanProvider>
          <CustomerProvider>
            <ProductProvider>
              <ProfileProductsProvider>{children}</ProfileProductsProvider>
            </ProductProvider>
          </CustomerProvider>
        </ArtisanProvider>
      </CategoryProvider>
    </>
  );
};

export default StoreProviders;

StoreProviders.propTypes = {
  children: PropTypes.node,
};
