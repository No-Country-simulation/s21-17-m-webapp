import { ProfileProductsProvider } from "../../features/profile/store/ProfileProductsContext";

const StoreProviders = ({ children }) => {
  return (
    <>
      <ProfileProductsProvider>{children}</ProfileProductsProvider>
    </>
  );
};

export default StoreProviders;
