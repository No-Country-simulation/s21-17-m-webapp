import { useAuth } from "../../../app/providers/AuthProvider";
import { AddProduct } from "../components/AddProduct";
import { BannerProfile } from "../components/BannerProfile";
import { CardList } from "../components/CardList";
import { useProfileProductsContext } from "../store/ProfileProductsContext";

export const Profile = () => {
  const { user, userType } = useAuth();
  const { products } = useProfileProductsContext();

  return (
    <div>
      <BannerProfile user={user} />
      {userType === "artisan" && (
        <>
          <CardList title="Manualidades publicadas" cards={products} />
          <AddProduct />
        </>
      )}
    </div>
  );
};
