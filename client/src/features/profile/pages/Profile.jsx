import { useAuth } from "../../../app/providers/AuthProvider";
import { AddProduct } from "../components/AddProduct";
import { ArtisanProfile } from "../components/ArtisanProfile";
import { CardList } from "../components/CardList";
import { useProfileProductsContext } from "../store/ProfileProductsContext";

export const Profile = () => {
  const { user, userType } = useAuth();
  const { products } = useProfileProductsContext();

  /* const artisan = {
    name: "",
    aboutMe: "",
    imageUrl: "",
    locality: "",
    speciality: "",
  }; */
  const artisan = null;
  return (
    <div>
      {userType === "artisan" && (
        <>
          <ArtisanProfile artisan={artisan} />
          <CardList title="Manualidades publicadas" cards={products} />
          <AddProduct />
        </>
      )}
    </div>
  );
};
