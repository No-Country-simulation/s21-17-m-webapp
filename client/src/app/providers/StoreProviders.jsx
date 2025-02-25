import { PropTypes } from "prop-types";
import { CategoryProvider } from "../../features/products/store/CategoryContext";
import { ProfileProductsProvider } from "../../features/profile/store/ProfileProductsContext";

const StoreProviders = ({ children }) => {
  return (
    <>
      <CategoryProvider>
        <ProfileProductsProvider>{children}</ProfileProductsProvider>
      </CategoryProvider>
    </>
  );
};

export default StoreProviders;

StoreProviders.propTypes = {
  children: PropTypes.node,
};
