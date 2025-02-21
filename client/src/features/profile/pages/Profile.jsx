import { AddProduct } from "../components/AddProduct";
import { BannerProfile } from "../components/BannerProfile";
import { CardList } from "../components/CardList";
import { useProfileProductsContext } from "../store/ProfileProductsContext";

export const Profile = () => {
  const user = {
    name: "Segun Adebayo",
    role: "cDavinci",
  };

  const { products } = useProfileProductsContext();

  return (
    <div>
      <BannerProfile user={user} />
      <CardList title="Manualidades publicadas" cards={products} />
      <AddProduct />
    </div>
  );
};
